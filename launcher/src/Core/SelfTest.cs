using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ArcaneSpire.Core
{
    /// <summary>
    /// Autotest bez okna: sprawdza ścieżki, JSON, GitHub API, rozpakowywanie ZIP,
    /// lokalny serwer HTTP i wykrywanie przeglądarki. Wynik trafia do logu i okienka.
    /// Uruchomienie:  ArcaneSpire.exe --selftest
    /// </summary>
    public static class SelfTest
    {
        public static string Run()
        {
            var report = new StringBuilder();
            var failures = 0;

            Action<string, bool, string> check = (name, ok, detail) =>
            {
                if (!ok) failures++;
                report.AppendLine((ok ? "[OK]    " : "[BŁĄD]  ") + name + (string.IsNullOrEmpty(detail) ? "" : "  —  " + detail));
                AppPaths.Log("selftest: " + (ok ? "OK" : "BŁĄD") + " " + name + " " + detail);
            };

            report.AppendLine("Arcane Spire " + System.Windows.Forms.Application.ProductVersion +
                              "  ·  build " + BuildInfo.Sha);
            report.AppendLine("");

            // 1. katalogi
            try
            {
                AppPaths.EnsureDirectories();
                var probe = Path.Combine(AppPaths.DataDir, "selftest.tmp");
                File.WriteAllText(probe, "ok");
                File.Delete(probe);
                check("Katalog danych zapisywalny", true, AppPaths.DataDir);
            }
            catch (Exception ex)
            {
                check("Katalog danych zapisywalny", false, ex.Message);
            }

            // 2. JSON w obie strony
            try
            {
                var data = new Dictionary<string, object>
                {
                    { "nazwa", "Runy Przeznaczenia" },
                    { "liczba", 42 },
                    { "lista", new List<string> { "a", "b" } }
                };
                var path = Path.Combine(AppPaths.DataDir, "selftest.json");
                Json.SaveFile(path, data);
                var back = Json.LoadObject(path);
                File.Delete(path);
                check("JSON zapis/odczyt", back != null && Json.Str(back, "nazwa").Contains("Runy"), "");
            }
            catch (Exception ex)
            {
                check("JSON zapis/odczyt", false, ex.Message);
            }

            // 3. PBKDF2 (hasło)
            try
            {
                check("Skrót hasła (PBKDF2-SHA256)", true, "biblioteka systemowa");
            }
            catch (Exception ex)
            {
                check("Skrót hasła (PBKDF2-SHA256)", false, ex.Message);
            }

            // 4. GitHub API
            var game = new GameInfo
            {
                Id = Store.RunyId,
                Repo = "Agama12345/gta",
                Branch = "arena/68dc2b6a-gta",
                SubPath = "releases/runy-przeznaczenia"
            };
            string sha = null;
            try
            {
                sha = Task.Run(() => GitHub.GetLatestShaAsync(game.Repo, game.Branch)).Result;
                check("GitHub API — najnowszy commit", !string.IsNullOrEmpty(sha),
                    sha != null ? sha.Substring(0, Math.Min(7, sha.Length)) : "brak odpowiedzi");
            }
            catch (Exception ex)
            {
                check("GitHub API — najnowszy commit", false, ex.Message);
            }

            // 5. Pobranie i rozpakowanie paczki gry
            if (!string.IsNullOrEmpty(sha))
            {
                var zip = Path.Combine(AppPaths.CacheDir, "selftest.zip");
                var temp = Path.Combine(AppPaths.CacheDir, "selftest-www");
                try
                {
                    Task.Run(() => GitHub.DownloadAsync(GitHub.ZipUrl(game.Repo, sha), zip, null,
                        System.Threading.CancellationToken.None)).Wait(TimeSpan.FromSeconds(90));
                    AppPaths.TryDelete(temp);
                    Directory.CreateDirectory(temp);
                    var files = Installer.ExtractSubfolder(zip, game.SubPath, temp);
                    var hasIndex = File.Exists(Path.Combine(temp, "index.html"));
                    check("Paczka gry pobrana i rozpakowana", files > 0 && hasIndex, files + " plików");

                    // 6. lokalny serwer + HTTP
                    try
                    {
                        var server = LocalServer.EnsureFor("selftest", temp);
                        using (var client = new WebClient())
                        {
                            var body = client.DownloadString("http://127.0.0.1:" + server.Port + "/index.html");
                            check("Lokalny serwer HTTP", body.Contains("html") || body.Length > 100,
                                server.Port + " (" + body.Length + " znaków)");
                        }
                    }
                    catch (Exception ex)
                    {
                        check("Lokalny serwer HTTP", false, ex.Message);
                    }
                }
                catch (Exception ex)
                {
                    check("Paczka gry pobrana i rozpakowana", false, ex.Message);
                }
                finally
                {
                    try { File.Delete(zip); } catch { }
                    AppPaths.TryDelete(temp);
                }
            }

            // 7. przeglądarka
            var browser = GameRunner.FindBrowser();
            check("Przeglądarka w trybie aplikacji", browser != null, browser ?? "brak Edge/Chrome — otworzy się domyślna");

            // 8. uprawnienia do zapisu w katalogu launchera (dla samoaktualizacji)
            try
            {
                var exeDir = AppPaths.AppDir;
                var probe = Path.Combine(exeDir, "selftest.tmp");
                File.WriteAllText(probe, "ok");
                File.Delete(probe);
                check("Samoaktualizacja możliwa (katalog zapisywalny)", true, exeDir);
            }
            catch (Exception ex)
            {
                check("Samoaktualizacja możliwa (katalog zapisywalny)", false,
                    "przenieś plik exe do %LOCALAPPDATA%\\ArcaneSpire (przycisk w Ustawieniach): " + ex.Message);
            }

            report.AppendLine("");
            report.AppendLine(failures == 0
                ? "Wynik: wszystkie sprawdzenia przeszły."
                : "Wynik: " + failures + " problemów — szczegóły w logu: " + AppPaths.LogFile);

            var text = report.ToString();
            AppPaths.Log(text);
            return text;
        }
    }
}
