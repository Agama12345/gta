using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace ArcaneSpire.Core
{
    public class UpdateInfo
    {
        public bool Available;
        public string Url = "";
        public string Sha = "";
        public long Size;
        public string Notes = "";
    }

    /// <summary>Aktualizacja samego launchera: pobiera nowy .exe z wydania GitHub i podmienia go przy wyjściu.</summary>
    public static class SelfUpdate
    {
        private const string Owner = "Agama12345";
        private const string Repo = "gta";

        public static string InstalledExePath
        {
            get { return Path.Combine(AppPaths.DataDir, "app", "ArcaneSpire.exe"); }
        }

        public static bool IsInstalled
        {
            get
            {
                try
                {
                    return string.Equals(Path.GetFullPath(System.Windows.Forms.Application.ExecutablePath),
                        Path.GetFullPath(InstalledExePath), StringComparison.OrdinalIgnoreCase);
                }
                catch { return false; }
            }
        }

        /// <summary>Sprawdza wydanie launcher-latest i porównuje znacznik build.</summary>
        public static async Task<UpdateInfo> CheckAsync()
        {
            var info = new UpdateInfo();
            var url = "https://api.github.com/repos/" + Owner + "/" + Repo + "/releases/tags/" + BuildInfo.Channel;
            try
            {
                using (var client = new System.Net.Http.HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(25);
                    client.DefaultRequestHeaders.UserAgent.ParseAdd("ArcaneSpire/" + BuildInfo.Sha);
                    client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github+json");
                    var json = await client.GetStringAsync(url).ConfigureAwait(false);
                    var release = Json.LoadObjectFromText(json);
                    if (release == null) return info;

                    var body = Json.Str(release, "body");
                    var marker = ParseMarker(body);
                    if (!string.IsNullOrEmpty(marker) && string.Equals(marker, BuildInfo.Sha, StringComparison.OrdinalIgnoreCase))
                        return info; // już najnowszy

                    var assets = Json.AsList(release.ContainsKey("assets") ? release["assets"] : null);
                    if (assets == null) return info;
                    foreach (var asset in assets)
                    {
                        var dict = Json.AsDict(asset);
                        if (dict == null) continue;
                        var name = Json.Str(dict, "name");
                        if (name == null || !name.EndsWith(".exe", StringComparison.OrdinalIgnoreCase)) continue;
                        info.Available = true;
                        info.Url = Json.Str(dict, "browser_download_url");
                        info.Size = Json.Long(dict, "size");
                        info.Sha = marker ?? Json.Str(dict, "updated_at");
                        info.Notes = body ?? "";
                        return info;
                    }
                }
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "SelfUpdate.Check");
            }
            return info;
        }

        private static string ParseMarker(string body)
        {
            if (string.IsNullOrWhiteSpace(body)) return null;
            foreach (var line in body.Split('\n'))
            {
                var text = line.Trim();
                if (text.StartsWith("build=", StringComparison.OrdinalIgnoreCase))
                    return text.Substring(6).Trim();
            }
            return null;
        }

        /// <summary>Pobiera nowy plik exe obok obecnego (zapis .new) i planuje podmianę.</summary>
        public static async Task<string> DownloadAsync(UpdateInfo info, Action<double> progress)
        {
            if (info == null || !info.Available || string.IsNullOrWhiteSpace(info.Url))
                throw new InvalidOperationException("Brak informacji o aktualizacji.");

            var target = System.Windows.Forms.Application.ExecutablePath;
            var temp = target + ".new";
            try { if (File.Exists(temp)) File.Delete(temp); } catch { }

            await GitHub.DownloadAsync(info.Url, temp, (received, total, speed) =>
            {
                if (progress != null && total > 0) progress((double)received / total);
            }, CancellationToken.None).ConfigureAwait(false);

            AppPaths.Log("Pobrano aktualizację launchera: " + temp + " (" + AppPaths.FormatBytes(new FileInfo(temp).Length) + ")");
            return temp;
        }

        /// <summary>Tworzy skrypt cmd, który po zamknięciu launchera podmieni plik i uruchomi nowy.</summary>
        public static bool ScheduleApply(string newExePath)
        {
            try
            {
                var target = System.Windows.Forms.Application.ExecutablePath;
                var script = Path.Combine(Path.GetTempPath(), "arcanespire-update.cmd");
                var content =
                    "@echo off\r\n" +
                    "timeout /t 2 /nobreak >nul\r\n" +
                    ":retry\r\n" +
                    "move /y \"" + newExePath + "\" \"" + target + "\" >nul 2>&1\r\n" +
                    "if errorlevel 1 (\r\n" +
                    "  timeout /t 1 /nobreak >nul\r\n" +
                    "  goto retry\r\n" +
                    ")\r\n" +
                    "start \"\" \"" + target + "\"\r\n" +
                    "del \"%~f0\"\r\n";
                File.WriteAllText(script, content, System.Text.Encoding.Default);
                Process.Start(new ProcessStartInfo("cmd.exe", "/c \"" + script + "\"")
                {
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WindowStyle = ProcessWindowStyle.Hidden
                });
                return true;
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "SelfUpdate.ScheduleApply");
                return false;
            }
        }

        /// <summary>Kopiuje działający exe do %LOCALAPPDATA%, robi skróty.</summary>
        public static bool InstallToSystem(out string message)
        {
            try
            {
                var source = System.Windows.Forms.Application.ExecutablePath;
                var dir = Path.Combine(AppPaths.DataDir, "app");
                Directory.CreateDirectory(dir);
                var target = Path.Combine(dir, "ArcaneSpire.exe");
                if (!string.Equals(Path.GetFullPath(source), Path.GetFullPath(target), StringComparison.OrdinalIgnoreCase))
                {
                    File.Copy(source, target, true);
                }
                CreateShortcut(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory),
                    "Arcane Spire.lnk"), target);
                CreateShortcut(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs),
                    "Arcane Spire.lnk"), target);
                message = "Launcher zainstalowany w " + target;
                AppPaths.Log(message);
                return true;
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "SelfUpdate.InstallToSystem");
                message = "Nie udało się zainstalować: " + ex.Message;
                return false;
            }
        }

        public static void CreateShortcut(string linkPath, string targetExe)
        {
            try
            {
                var shellType = Type.GetTypeFromProgID("WScript.Shell");
                if (shellType == null) return;
                dynamic shell = Activator.CreateInstance(shellType);
                dynamic link = shell.CreateShortcut(linkPath);
                link.TargetPath = targetExe;
                link.WorkingDirectory = Path.GetDirectoryName(targetExe);
                link.IconLocation = targetExe + ",0";
                link.Description = "Arcane Spire — biblioteka gier";
                link.Save();
            }
            catch (Exception ex) { AppPaths.Log(ex, "CreateShortcut"); }
        }

        // ------------------------------------------------- autostart z Windows
        private const string RunKey = @"Software\Microsoft\Windows\CurrentVersion\Run";

        public static void SetStartWithWindows(bool enabled)
        {
            try
            {
                using (var key = Microsoft.Win32.Registry.CurrentUser.OpenSubKey(RunKey, true))
                {
                    if (key == null) return;
                    if (enabled) key.SetValue("ArcaneSpire", "\"" + System.Windows.Forms.Application.ExecutablePath + "\"");
                    else key.DeleteValue("ArcaneSpire", false);
                }
            }
            catch (Exception ex) { AppPaths.Log(ex, "SetStartWithWindows"); }
        }

        public static bool IsStartWithWindows()
        {
            try
            {
                using (var key = Microsoft.Win32.Registry.CurrentUser.OpenSubKey(RunKey, false))
                {
                    if (key == null) return false;
                    return key.GetValue("ArcaneSpire") != null;
                }
            }
            catch { return false; }
        }
    }
}
