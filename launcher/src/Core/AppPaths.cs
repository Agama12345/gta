using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace ArcaneSpire.Core
{
    /// <summary>Ścieżki, log i proste operacje na plikach.</summary>
    public static class AppPaths
    {
        public static readonly string DataDir = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ArcaneSpire");
        public static readonly string GamesDir = Path.Combine(DataDir, "games");
        public static readonly string CacheDir = Path.Combine(DataDir, "cache");
        public static readonly string BrowserDir = Path.Combine(DataDir, "browser");

        public static string LogFile { get { return Path.Combine(DataDir, "launcher.log"); } }
        public static string CatalogFile { get { return Path.Combine(DataDir, "catalog.json"); } }
        public static string AccountsFile { get { return Path.Combine(DataDir, "accounts.json"); } }
        public static string SettingsFile { get { return Path.Combine(DataDir, "settings.json"); } }
        public static string SessionFile { get { return Path.Combine(DataDir, "session.json"); } }

        public static string AppDir
        {
            get
            {
                try { return Path.GetDirectoryName(Application.ExecutablePath); }
                catch { return Environment.CurrentDirectory; }
            }
        }

        public static void EnsureDirectories()
        {
            foreach (var dir in new[] { DataDir, GamesDir, CacheDir, BrowserDir })
            {
                try { if (!Directory.Exists(dir)) Directory.CreateDirectory(dir); }
                catch { }
            }
        }

        public static string GameDir(string gameId)
        {
            return Path.Combine(GamesDir, gameId);
        }

        public static string GameWww(string gameId)
        {
            return Path.Combine(GamesDir, gameId, "www");
        }

        public static string GameStateFile(string gameId)
        {
            return Path.Combine(GamesDir, gameId, "state.json");
        }

        private static readonly object LogLock = new object();

        public static void Trace(string message)
        {
            try
            {
                if (!Directory.Exists(DataDir)) Directory.CreateDirectory(DataDir);
                File.AppendAllText(Path.Combine(DataDir, "start.log"),
                    "[" + DateTime.Now.ToString("HH:mm:ss.fff") + "] " + message + Environment.NewLine,
                    Encoding.UTF8);
            }
            catch { }
        }

        public static void Log(string message)
        {
            try
            {
                lock (LogLock)
                {
                    Directory.CreateDirectory(DataDir);
                    File.AppendAllText(LogFile,
                        "[" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "] " + message + Environment.NewLine,
                        Encoding.UTF8);
                }
            }
            catch { }
        }

        public static void Log(Exception ex, string context)
        {
            Log("BŁĄD [" + context + "]: " + ex.GetType().Name + ": " + ex.Message);
            try
            {
                if (ex.StackTrace != null) Log(ex.StackTrace);
            }
            catch { }
        }

        public static void OpenInExplorer(string path)
        {
            try
            {
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                System.Diagnostics.Process.Start("explorer.exe", "\"" + path + "\"");
            }
            catch (Exception ex) { Log(ex, "OpenInExplorer"); }
        }

        public static string FormatBytes(long bytes)
        {
            if (bytes < 1024) return bytes.ToString(CultureInfo.InvariantCulture) + " B";
            if (bytes < 1024 * 1024) return (bytes / 1024.0).ToString("0.0", CultureInfo.InvariantCulture) + " kB";
            if (bytes < 1024L * 1024 * 1024) return (bytes / (1024.0 * 1024)).ToString("0.0", CultureInfo.InvariantCulture) + " MB";
            return (bytes / (1024.0 * 1024 * 1024)).ToString("0.00", CultureInfo.InvariantCulture) + " GB";
        }

        public static string FormatDuration(TimeSpan span)
        {
            if (span.TotalHours >= 1) return ((int)span.TotalHours) + " godz " + span.Minutes + " min";
            if (span.TotalMinutes >= 1) return ((int)span.TotalMinutes) + " min " + span.Seconds + " s";
            return Math.Max(1, span.Seconds) + " s";
        }

        public static long DirSize(string dir)
        {
            long sum = 0;
            try
            {
                foreach (var file in Directory.GetFiles(dir, "*", SearchOption.AllDirectories))
                {
                    try { sum += new FileInfo(file).Length; } catch { }
                }
            }
            catch { }
            return sum;
        }

        public static void TryDelete(string dir)
        {
            try { if (Directory.Exists(dir)) Directory.Delete(dir, true); }
            catch (Exception ex) { Log(ex, "TryDelete " + dir); }
        }

        public static List<string> ReadLines(string path)
        {
            var result = new List<string>();
            try
            {
                if (File.Exists(path)) result.AddRange(File.ReadAllLines(path, Encoding.UTF8));
            }
            catch { }
            return result;
        }
    }
}
