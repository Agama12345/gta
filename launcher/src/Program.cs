using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire
{
    internal static class Program
    {
        private static Mutex _mutex;
        private static readonly StringBuilder Trace = new StringBuilder();

        [STAThread]
        private static void Main(string[] args)
        {
            // 0. znacznik startu — zapisywany natychmiast, jeszcze przed czymkolwiek innym.
            //    Jeśli go nie ma, Windows w ogóle nie uruchomił pliku.
            Step("Program.Main: start (argv: " + (args == null ? "" : string.Join(" ", args)) + ")");
            Step("exe: " + SafeExecutablePath());
            Step("system: " + Environment.OSVersion + " / CLR " + Environment.Version + " / " +
                 (Environment.Is64BitProcess ? "64-bit" : "32-bit"));
            Step("katalog danych: " + AppPaths.DataDir);

            var safeMode = false;
            var selfTest = false;
            if (args != null)
            {
                foreach (var arg in args)
                {
                    if (string.Equals(arg, "--safe", StringComparison.OrdinalIgnoreCase)) safeMode = true;
                    if (string.Equals(arg, "--selftest", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(arg, "-selftest", StringComparison.OrdinalIgnoreCase)) selfTest = true;
                }
            }
            SafeMode = safeMode;
            Step("tryb awaryjny: " + (safeMode ? "TAK" : "nie"));

            try
            {
                System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
            }
            catch { }

            // 1. najpierw autotest — działa bez okna i bez sieci, jeśli trzeba
            if (selfTest)
            {
                string report;
                try { report = SelfTest.Run(); }
                catch (Exception ex) { report = "Autotest nie udał się: " + ex; }
                Step("autotest zakończony");
                TryShowMessage(report, "Arcane Spire — autotest", MessageBoxIcon.Information);
                return;
            }

            // 2. jedno uruchomienie naraz (w try, bo Mutex potrafi rzucić wyjątkiem)
            try
            {
                bool created;
                _mutex = new Mutex(true, "ArcaneSpire.SingleInstance", out created);
                if (!created)
                {
                    Step("inna instancja już działa");
                    TryShowMessage("Arcane Spire już działa — sprawdź pasek zadań (może być schowany za innym oknem).",
                        "Arcane Spire", MessageBoxIcon.Information);
                    return;
                }
            }
            catch (Exception ex)
            {
                Step("Mutex: " + ex.Message + " (kontynuuję)");
            }

            // 3. globalne łapanie błędów + log każdego wyjątku
            AppDomain.CurrentDomain.UnhandledException += (s, e) =>
            {
                var ex = e.ExceptionObject as Exception;
                Step("KRYTYCZNY: " + Describe(ex));
                AppPaths.Log(ex ?? new Exception("nieznany"), "AppDomain");
                TryShowMessage("Launcher napotkał błąd krytyczny:\n\n" + Describe(ex) +
                               "\n\nLog: " + LogPath(), "Arcane Spire", MessageBoxIcon.Error);
            };
            Application.ThreadException += (s, e) =>
            {
                Step("WYJĄTEK UI: " + Describe(e.Exception));
                AppPaths.Log(e.Exception, "ThreadException");
                TryShowMessage("Launcher napotkał błąd:\n\n" + Describe(e.Exception) +
                               "\n\nLog: " + LogPath(), "Arcane Spire", MessageBoxIcon.Error);
            };
            AppDomain.CurrentDomain.FirstChanceException += (s, e) =>
            {
                // pierwsze 40 wyjątków — pełna ścieżka do miejsca problemu
                if (ExceptionCount < 40)
                {
                    ExceptionCount++;
                    AppPaths.Log(e.Exception, "FirstChance");
                }
            };

            Step("AppDomain gotowy");

            try
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Step("styl wizualny włączony");

                var form = new UI.MainForm();
                Step("okno główne utworzone");
                Application.Run(form);
                Step("pętla komunikatów zakończona");
            }
            catch (Exception ex)
            {
                Step("BŁĄD STARTU: " + Describe(ex));
                AppPaths.Log(ex, "Main");
                TryShowMessage(
                    "Nie udało się uruchomić launchera.\n\n" + Describe(ex) +
                    "\n\nCo możesz zrobić:\n" +
                    "1. Uruchom plik z parametrem --safe (tryb awaryjny bez internetu).\n" +
                    "2. Uruchom diagnostyka.cmd i wyślij plik diagnostyka.txt.\n" +
                    "3. Log: " + LogPath(),
                    "Arcane Spire — błąd startu", MessageBoxIcon.Error);
            }
            finally
            {
                try { LocalServer.StopAll(); } catch { }
                if (_mutex != null)
                {
                    try { _mutex.ReleaseMutex(); } catch { }
                    try { _mutex.Dispose(); } catch { }
                }
                Step("Program.Main: koniec");
            }
        }

        public static bool SafeMode;

        private static int ExceptionCount;

        /// <summary>Zapisuje krok startu do pliku start.log (natychmiast, bez buforowania).</summary>
        public static void Step(string message)
        {
            var line = "[" + DateTime.Now.ToString("HH:mm:ss.fff") + "] " + message;
            try { Trace.AppendLine(line); } catch { }
            try
            {
                var dir = AppPaths.DataDir;
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "start.log"), line + Environment.NewLine, Encoding.UTF8);
            }
            catch { }
            try { AppPaths.Log(message); } catch { }
        }

        public static string LogPath()
        {
            try { return AppPaths.LogFile; }
            catch { return "(%LOCALAPPDATA%\\ArcaneSpire\\launcher.log)"; }
        }

        private static string SafeExecutablePath()
        {
            try { return Application.ExecutablePath; }
            catch { return "?"; }
        }

        public static string Describe(Exception ex)
        {
            if (ex == null) return "nieznany błąd";
            var text = ex.GetType().Name + ": " + ex.Message;
            if (ex.InnerException != null) text += "\n→ " + ex.InnerException.GetType().Name + ": " + ex.InnerException.Message;
            if (!string.IsNullOrEmpty(ex.StackTrace))
            {
                var lines = ex.StackTrace.Split('\n');
                text += "\n" + (lines.Length > 0 ? lines[0].Trim() : "");
                if (lines.Length > 1) text += "\n" + lines[1].Trim();
            }
            return text;
        }

        private static void TryShowMessage(string text, string caption, MessageBoxIcon icon)
        {
            try
            {
                MessageBox.Show(text, caption, MessageBoxButtons.OK, icon);
            }
            catch
            {
                // brak pulpitu (np. uruchomienie z usługi) — zostaje log
            }
        }
    }
}
