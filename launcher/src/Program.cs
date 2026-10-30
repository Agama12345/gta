using System;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire
{
    internal static class Program
    {
        private static Mutex _mutex;

        [STAThread]
        private static void Main(string[] args)
        {
            try
            {
                ServicePointManagerTls();
            }
            catch { }

            // jedno uruchomienie naraz
            bool created;
            _mutex = new Mutex(true, "ArcaneSpire.SingleInstance", out created);
            if (!created)
            {
                MessageBox.Show("Arcane Spire już działa — sprawdź pasek zadań.", "Arcane Spire",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            AppDomain.CurrentDomain.UnhandledException += (s, e) =>
            {
                var ex = e.ExceptionObject as Exception;
                AppPaths.Log(ex != null ? ex : new Exception("Nieznany błąd"), "AppDomain");
                MessageBox.Show("Launcher napotkał błąd:\n" + (ex != null ? ex.Message : "nieznany") +
                                "\n\nLog: " + AppPaths.LogFile, "Arcane Spire",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            };

            Application.ThreadException += (s, e) =>
            {
                AppPaths.Log(e.Exception, "ThreadException");
                MessageBox.Show("Launcher napotkał błąd:\n" + e.Exception.Message +
                                "\n\nLog: " + AppPaths.LogFile, "Arcane Spire",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            };

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            try
            {
                Application.Run(new UI.MainForm());
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Main");
                MessageBox.Show("Nie udało się uruchomić launchera:\n" + ex.Message +
                                "\n\nLog: " + AppPaths.LogFile, "Arcane Spire",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                try { LocalServer.StopAll(); } catch { }
                if (_mutex != null)
                {
                    try { _mutex.ReleaseMutex(); } catch { }
                    _mutex.Dispose();
                }
            }
        }

        private static void ServicePointManagerTls()
        {
            System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
        }
    }
}
