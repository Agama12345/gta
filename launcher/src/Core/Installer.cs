using System;
using System.IO;
using System.IO.Compression;
using System.Threading;
using System.Threading.Tasks;

namespace ArcaneSpire.Core
{
    /// <summary>Instalacja i aktualizacja gier z GitHuba — jak w Steamie: pobierz, rozpakuj, podmien.</summary>
    public static class Installer
    {
        /// <summary>Pobiera paczkę i instaluje ją w games/&lt;id&gt;/www.</summary>
        public static async Task InstallWebGameAsync(GameInfo game, string sha, DownloadJob job,
            Action<string> status, CancellationToken token)
        {
            if (game == null) throw new ArgumentNullException("game");
            if (string.IsNullOrWhiteSpace(game.Repo)) throw new InvalidOperationException("Gra nie ma repozytorium GitHub.");

            var zipPath = Path.Combine(AppPaths.CacheDir, game.Id + "-" + (sha ?? "head") + ".zip");
            var url = GitHub.ZipUrl(game.Repo, sha);
            if (url == null) throw new InvalidOperationException("Nie udało się ustalić adresu paczki.");

            if (status != null) status("Pobieranie paczki…");
            AppPaths.Log("Instalacja " + game.Id + " z " + url);

            await GitHub.DownloadAsync(url, zipPath, (received, total, speed) =>
            {
                if (job != null)
                {
                    job.Received = received;
                    job.Total = total;
                    job.BytesPerSecond = speed;
                    job.Progress = total > 0 ? (double)received / total : 0;
                    job.Status = "Pobieranie";
                }
            }, token).ConfigureAwait(false);

            if (status != null) status("Rozpakowywanie…");
            if (job != null) job.Status = "Rozpakowywanie";

            var gameDir = AppPaths.GameDir(game.Id);
            var staging = Path.Combine(gameDir, "www.new");
            var target = AppPaths.GameWww(game.Id);

            AppPaths.TryDelete(staging);
            Directory.CreateDirectory(staging);
            var files = ExtractSubfolder(zipPath, game.SubPath, staging);
            if (files == 0)
            {
                AppPaths.TryDelete(staging);
                try { File.Delete(zipPath); } catch { }
                throw new InvalidOperationException("W paczce nie ma katalogu \"" + game.SubPath + "\".");
            }

            if (status != null) status("Podmienianie plików…");
            var backup = Path.Combine(gameDir, "www.old");
            AppPaths.TryDelete(backup);
            try
            {
                if (Directory.Exists(target)) Directory.Move(target, backup);
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Installer backup");
                AppPaths.TryDelete(target);
            }
            Directory.Move(staging, target);
            AppPaths.TryDelete(backup);

            var state = new GameState
            {
                Sha = sha ?? "",
                Updated = DateTime.Now.ToString("o"),
                Installed = DateTime.Now.ToString("o"),
                Size = AppPaths.DirSize(target),
                Version = ReadVersion(target)
            };
            Store.SaveState(game.Id, state);

            try { File.Delete(zipPath); } catch { }

            if (job != null)
            {
                job.Progress = 1;
                job.Status = "Gotowe";
                job.Finished = true;
            }
            AppPaths.Log("Zainstalowano " + game.Id + " (" + files + " plików, " + AppPaths.FormatBytes(state.Size) + ")");
        }

        public static async Task InstallFileGameAsync(GameInfo game, DownloadJob job, Action<string> status,
            CancellationToken token)
        {
            if (string.IsNullOrWhiteSpace(game.Url)) throw new InvalidOperationException("Gra nie ma linku do pobrania.");
            var dir = AppPaths.GameDir(game.Id);
            Directory.CreateDirectory(dir);
            var name = game.Id + "-download" + GuessExtension(game.Url);
            var dest = Path.Combine(dir, name);

            if (status != null) status("Pobieranie pliku gry…");
            await GitHub.DownloadAsync(game.Url, dest, (received, total, speed) =>
            {
                if (job != null)
                {
                    job.Received = received;
                    job.Total = total;
                    job.BytesPerSecond = speed;
                    job.Progress = total > 0 ? (double)received / total : 0;
                    job.Status = "Pobieranie";
                }
            }, token).ConfigureAwait(false);

            Store.SaveState(game.Id, new GameState
            {
                Updated = DateTime.Now.ToString("o"),
                Installed = DateTime.Now.ToString("o"),
                Size = new FileInfo(dest).Length,
                Version = "1.0"
            });
            // zapisujemy ścieżkę pliku w osobnym pliku, bo GameState trzyma tylko znacznik czasu
            Json.SaveFile(Path.Combine(AppPaths.GameDir(game.Id), "file.json"),
                new System.Collections.Generic.Dictionary<string, object> { { "path", dest } });

            if (job != null)
            {
                job.Progress = 1;
                job.Status = "Gotowe";
                job.Finished = true;
            }
        }

        public static string GetInstalledFile(string gameId)
        {
            var dict = Json.LoadObject(Path.Combine(AppPaths.GameDir(gameId), "file.json"));
            var path = Json.Str(dict, "path");
            return !string.IsNullOrWhiteSpace(path) && File.Exists(path) ? path : null;
        }

        private static string GuessExtension(string url)
        {
            try
            {
                var path = new Uri(url).AbsolutePath;
                var ext = Path.GetExtension(path);
                if (!string.IsNullOrWhiteSpace(ext) && ext.Length <= 5) return ext;
            }
            catch { }
            return ".zip";
        }

        private static string ReadVersion(string wwwDir)
        {
            try
            {
                var file = Path.Combine(wwwDir, "version.json");
                if (!File.Exists(file)) return "";
                var dict = Json.LoadObject(file);
                return Json.Str(dict, "version");
            }
            catch { return ""; }
        }

        /// <summary>Rozpakowuje tylko zawartość podanego podkatalogu. Zwraca liczbę plików.</summary>
        public static int ExtractSubfolder(string zipPath, string subPath, string destination)
        {
            var needle = "/" + (subPath ?? "").Trim('/') + "/";
            if (needle == "//") needle = "/";
            var count = 0;
            using (var archive = ZipFile.OpenRead(zipPath))
            {
                foreach (var entry in archive.Entries)
                {
                    if (string.IsNullOrEmpty(entry.Name)) continue; // katalog
                    var full = entry.FullName.Replace('\\', '/');
                    var index = full.IndexOf(needle, StringComparison.OrdinalIgnoreCase);
                    if (index < 0) continue;
                    var relative = full.Substring(index + needle.Length);
                    if (string.IsNullOrWhiteSpace(relative)) continue;
                    var safe = relative.Replace('/', Path.DirectorySeparatorChar);
                    var target = Path.Combine(destination, safe);
                    var parent = Path.GetDirectoryName(target);
                    if (!string.IsNullOrEmpty(parent) && !Directory.Exists(parent)) Directory.CreateDirectory(parent);
                    entry.ExtractToFile(target, true);
                    count++;
                }
            }
            return count;
        }
    }
}
