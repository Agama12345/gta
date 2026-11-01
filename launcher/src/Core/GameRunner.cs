using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace ArcaneSpire.Core
{
    /// <summary>Uruchamianie gier: web w oknie aplikacji (Edge/Chrome --app), pliki natywnie.</summary>
    public static class GameRunner
    {
        public static Process Launch(GameInfo game, out string message)
        {
            if (game == null) throw new ArgumentNullException("game");

            if (game.Kind == "web")
            {
                var www = AppPaths.GameWww(game.Id);
                if (!File.Exists(Path.Combine(www, "index.html")))
                {
                    message = "Gra nie jest zainstalowana.";
                    return null;
                }
                var server = LocalServer.EnsureFor(game.Id, www);
                var url = "http://127.0.0.1:" + server.Port + "/index.html";
                var browser = FindBrowser();
                if (browser != null)
                {
                    var profile = Path.Combine(AppPaths.BrowserDir, game.Id);
                    Directory.CreateDirectory(profile);
                    var args = "--app=" + url +
                               " --window-size=1500,940" +
                               " --user-data-dir=\"" + profile + "\"" +
                               " --no-first-run --no-default-browser-check" +
                               " --disable-features=Translate,msEdgeTranslate";
                    var process = Process.Start(new ProcessStartInfo(browser, args) { UseShellExecute = false });
                    message = "Uruchomiono w oknie aplikacji (port " + server.Port + ").";
                    return process;
                }
                Process.Start(url);
                message = "Brak Edge/Chrome — otwarto w domyślnej przeglądarce.";
                return null;
            }

            if (game.Kind == "file")
            {
                var file = Installer.GetInstalledFile(game.Id);
                if (file == null)
                {
                    message = "Plik gry nie został jeszcze pobrany.";
                    return null;
                }
                var process = Process.Start(new ProcessStartInfo(file) { UseShellExecute = true });
                message = "Uruchomiono plik gry.";
                return process;
            }

            // gra zewnętrzna (link)
            if (string.IsNullOrWhiteSpace(game.Url))
            {
                message = "Ta gra nie ma jeszcze podanego adresu (Biblioteka → Właściwości).";
                return null;
            }
            var edge = FindBrowser();
            if (edge != null)
            {
                var profile = Path.Combine(AppPaths.BrowserDir, game.Id);
                Directory.CreateDirectory(profile);
                var process = Process.Start(new ProcessStartInfo(edge,
                    "--app=" + game.Url + " --window-size=1500,940 --user-data-dir=\"" + profile + "\" --no-first-run")
                { UseShellExecute = false });
                message = "Otwarto " + game.Url + " w oknie aplikacji.";
                return process;
            }
            Process.Start(game.Url);
            message = "Otwarto " + game.Url + " w przeglądarce.";
            return null;
        }

        /// <summary>Edge albo Chrome — do trybu --app.</summary>
        public static string FindBrowser()
        {
            var candidates = new List<string>();
            foreach (var root in new[]
            {
                Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
                Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
            })
            {
                if (string.IsNullOrEmpty(root)) continue;
                candidates.Add(Path.Combine(root, @"Microsoft\Edge\Application\msedge.exe"));
                candidates.Add(Path.Combine(root, @"Google\Chrome\Application\chrome.exe"));
            }
            foreach (var candidate in candidates)
            {
                try { if (File.Exists(candidate)) return candidate; }
                catch { }
            }
            return null;
        }

        public static void StopServerFor(string gameId)
        {
            // serwery żyją do końca działania launchera — nic nie robimy
        }
    }
}
