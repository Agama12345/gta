using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace RunyPrzeznaczenia
{
    /// <summary>
    /// Native PC window for „Runy Przeznaczenia”.
    ///
    /// The whole game is embedded in the exe. On start it is extracted once to
    /// %LOCALAPPDATA%\RunyPrzeznaczenia\www and rendered by the Edge WebView2 engine
    /// inside a normal Windows window (own title, own icon, no browser UI, no address bar).
    /// If the WebView2 runtime is missing, it falls back to a local server + the
    /// installed Edge/Chrome in app mode, so the game still runs.
    /// </summary>
    internal static class Program
    {
        private const string AppName = "Runy Przeznaczenia";
        private const string HostName = "runy.local";

        private static readonly System.Collections.Generic.Dictionary<string, byte[]> Files =
            new System.Collections.Generic.Dictionary<string, byte[]>(StringComparer.OrdinalIgnoreCase);

        [STAThread]
        private static void Main(string[] args)
        {
            var selfTest = false;
            if (args != null)
            {
                foreach (var arg in args)
                {
                    if (string.Equals(arg, "--selftest", StringComparison.OrdinalIgnoreCase)) selfTest = true;
                }
            }

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            string wwwDir;
            string extractInfo;
            try
            {
                LoadResources();
                wwwDir = ExtractGame(out extractInfo);
                Log("Zasoby: " + Files.Count + " plików → " + wwwDir + " (" + extractInfo + ")");
            }
            catch (Exception ex)
            {
                ShowError("Nie udało się przygotować plików gry:\n" + ex.Message);
                return;
            }

            var runtime = SafeRuntimeVersion();

            if (selfTest)
            {
                var report = new StringBuilder();
                report.AppendLine(AppName + " " + Application.ProductVersion);
                report.AppendLine("Plik: " + Application.ExecutablePath);
                report.AppendLine("Zasoby w exe: " + Files.Count);
                report.AppendLine("Katalog gry: " + wwwDir);
                report.AppendLine("Pliki: " + extractInfo);
                report.AppendLine("WebView2: " + (runtime ?? "BRAK — gra otworzy się w Edge/Chrome (tryb okna)"));
                report.AppendLine("index.html: " + (File.Exists(Path.Combine(wwwDir, "index.html")) ? "jest" : "BRAK"));
                report.AppendLine(runtime != null ? "\nŚrodowisko natywne gotowe." : "\nTryb awaryjny: przeglądarka.");
                MessageBox.Show(report.ToString(), AppName + " — autotest", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            if (runtime != null)
            {
                try
                {
                    RunNative(wwwDir, runtime);
                    return;
                }
                catch (Exception ex)
                {
                    Log("WebView2 nie wystartował: " + ex);
                }
            }

            // ---- tryb awaryjny: lokalny serwer + przeglądarka w oknie aplikacji
            RunBrowserFallback(wwwDir);
        }

        // ------------------------------------------------------------ natywne okno
        private static void RunNative(string wwwDir, string runtime)
        {
            var userData = Path.Combine(AppPaths(), "webview");
            Directory.CreateDirectory(userData);

            var form = new Form
            {
                Text = AppName,
                ClientSize = new Size(1500, 900),
                MinimumSize = new Size(960, 600),
                StartPosition = FormStartPosition.CenterScreen,
                BackColor = Color.FromArgb(12, 14, 18),
                ForeColor = Color.FromArgb(230, 234, 240),
                Icon = LoadWindowIcon(),
                DoubleBuffered = true
            };

            var splash = new Label
            {
                Text = "Runy Przeznaczenia\n\nwczytywanie świata…",
                Dock = DockStyle.Fill,
                TextAlign = ContentAlignment.MiddleCenter,
                Font = new Font("Segoe UI", 14f),
                ForeColor = Color.FromArgb(200, 190, 215)
            };
            form.Controls.Add(splash);

            var web = new WebView2 { Dock = DockStyle.Fill, Visible = false };
            form.Controls.Add(web);
            web.BringToFront();

            form.Shown += async (s, e) =>
            {
                try
                {
                    var env = await CoreWebView2Environment.CreateAsync(null, userData, null);
                    await web.EnsureCoreWebView2Async(env);

                    var settings = web.CoreWebView2.Settings;
                    settings.AreDefaultContextMenusEnabled = false;
                    settings.AreDevToolsEnabled = false;
                    settings.IsStatusBarEnabled = false;
                    settings.IsZoomControlEnabled = false;

                    web.CoreWebView2.SetVirtualHostNameToFolderMapping(
                        HostName, wwwDir, CoreWebView2HostResourceAccessKind.Allow);
                    web.CoreWebView2.Navigate("https://" + HostName + "/index.html");

                    web.CoreWebView2.NavigationCompleted += (s2, e2) =>
                    {
                        splash.Visible = false;
                        web.Visible = true;
                        if (!e2.IsSuccess)
                        {
                            MessageBox.Show(form,
                                "Nie udało się wczytać gry.\n" + (e2.WebErrorStatus.ToString()) +
                                "\n\nPliki: " + wwwDir,
                                AppName, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                        }
                    };
                }
                catch (Exception ex)
                {
                    Log("WebView2: " + ex);
                    form.Hide();
                    RunBrowserFallback(wwwDir);
                    form.Close();
                }
            };

            form.FormClosed += (s, e) => Log("Okno zamknięte");
            Application.Run(form);
        }

        private static Icon LoadWindowIcon()
        {
            try { return Icon.ExtractAssociatedIcon(Application.ExecutablePath); }
            catch { return null; }
        }

        private static string SafeRuntimeVersion()
        {
            try
            {
                var version = CoreWebView2Environment.GetAvailableBrowserVersionString();
                return string.IsNullOrWhiteSpace(version) ? null : version;
            }
            catch (Exception ex)
            {
                Log("Brak WebView2: " + ex.Message);
                return null;
            }
        }

        // ------------------------------------------------------- tryb awaryjny
        private static void RunBrowserFallback(string wwwDir)
        {
            TcpListener listener;
            int port;
            try
            {
                listener = new TcpListener(IPAddress.Loopback, 0);
                listener.Start();
                port = ((IPEndPoint)listener.LocalEndpoint).Port;
            }
            catch (Exception ex)
            {
                ShowError("Nie udało się uruchomić gry:\n" + ex.Message);
                return;
            }

            var thread = new Thread(() => AcceptLoop(listener));
            thread.IsBackground = true;
            thread.Start();

            var url = "http://127.0.0.1:" + port + "/index.html";
            Log("Tryb awaryjny (przeglądarka): " + url);

            var browser = FindBrowser();
            Process process = null;
            if (browser != null)
            {
                try
                {
                    var profile = Path.Combine(AppPaths(), "browser");
                    Directory.CreateDirectory(profile);
                    process = Process.Start(new ProcessStartInfo(browser,
                        "--app=" + url + " --window-size=1500,940 --user-data-dir=\"" + profile + "\" --no-first-run")
                    { UseShellExecute = false });
                }
                catch (Exception ex) { Log("Przeglądarka: " + ex.Message); }
            }

            if (process == null)
            {
                try { Process.Start(url); } catch { }
                MessageBox.Show(
                    "Ta wersja Windows nie ma środowiska WebView2, więc gra otworzyła się w przeglądarce.\n\n" +
                    "Adres: " + url + "\n\nZamknij to okno, aby zakończyć.",
                    AppName, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                try { process.WaitForExit(); } catch { }
            }

            try { listener.Stop(); } catch { }
        }

        private static void AcceptLoop(TcpListener listener)
        {
            while (true)
            {
                TcpClient client;
                try { client = listener.AcceptTcpClient(); }
                catch { return; }
                ThreadPool.QueueUserWorkItem(_ => Handle(client));
            }
        }

        private static readonly System.Collections.Generic.Dictionary<string, string> Mime =
            new System.Collections.Generic.Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { ".html", "text/html; charset=utf-8" },
                { ".js", "application/javascript; charset=utf-8" },
                { ".css", "text/css; charset=utf-8" },
                { ".json", "application/json; charset=utf-8" },
                { ".png", "image/png" },
                { ".jpg", "image/jpeg" },
                { ".svg", "image/svg+xml" },
                { ".ico", "image/x-icon" },
                { ".woff", "font/woff" },
                { ".woff2", "font/woff2" },
                { ".ttf", "font/ttf" },
                { ".mp3", "audio/mpeg" },
                { ".ogg", "audio/ogg" },
                { ".wav", "audio/wav" }
            };

        private static void Handle(TcpClient client)
        {
            try
            {
                using (client)
                {
                    client.ReceiveTimeout = 8000;
                    var stream = client.GetStream();
                    var requestLine = ReadLine(stream);
                    if (string.IsNullOrEmpty(requestLine)) return;
                    var parts = requestLine.Split(' ');
                    if (parts.Length < 2) return;
                    string header;
                    var guard = 0;
                    do { header = ReadLine(stream); guard++; } while (!string.IsNullOrEmpty(header) && guard < 100);

                    var raw = parts[1];
                    var q = raw.IndexOf('?');
                    if (q >= 0) raw = raw.Substring(0, q);
                    var path = Uri.UnescapeDataString(raw).TrimStart('/');
                    if (string.IsNullOrEmpty(path)) path = "index.html";

                    byte[] body;
                    if (!Files.TryGetValue(path, out body))
                    {
                        Files.TryGetValue("index.html", out body);
                        path = "index.html";
                    }
                    if (body == null)
                    {
                        WriteResponse(stream, 404, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes("404"));
                        return;
                    }
                    string type;
                    if (!Mime.TryGetValue(Path.GetExtension(path), out type)) type = "application/octet-stream";
                    WriteResponse(stream, 200, type, body);
                }
            }
            catch { }
        }

        private static string ReadLine(Stream stream)
        {
            var builder = new StringBuilder();
            while (true)
            {
                var value = stream.ReadByte();
                if (value < 0) return builder.Length > 0 ? builder.ToString() : null;
                if (value == '\n') break;
                if (value == '\r') continue;
                builder.Append((char)value);
                if (builder.Length > 8192) break;
            }
            return builder.ToString();
        }

        private static void WriteResponse(Stream stream, int status, string contentType, byte[] body)
        {
            var head = "HTTP/1.1 " + status + " " + (status == 200 ? "OK" : "Not Found") + "\r\n" +
                       "Content-Type: " + contentType + "\r\n" +
                       "Content-Length: " + body.Length + "\r\n" +
                       "Cache-Control: no-cache\r\nConnection: close\r\n\r\n";
            var bytes = Encoding.ASCII.GetBytes(head);
            stream.Write(bytes, 0, bytes.Length);
            stream.Write(body, 0, body.Length);
            stream.Flush();
        }

        // --------------------------------------------------------- zasoby gry
        private static void LoadResources()
        {
            var assembly = Assembly.GetExecutingAssembly();
            foreach (var name in assembly.GetManifestResourceNames())
            {
                if (!name.StartsWith("game/", StringComparison.OrdinalIgnoreCase)) continue;
                using (var stream = assembly.GetManifestResourceStream(name))
                {
                    if (stream == null) continue;
                    var buffer = new byte[stream.Length];
                    var read = 0;
                    while (read < buffer.Length)
                    {
                        var chunk = stream.Read(buffer, read, buffer.Length - read);
                        if (chunk <= 0) break;
                        read += chunk;
                    }
                    Files[name.Substring(5).Replace('\\', '/')] = buffer;
                }
            }
        }

        /// <summary>Wypakowuje grę raz na wersję do %LOCALAPPDATA% — potem tylko sprawdza plik-znacznik.</summary>
        private static string ExtractGame(out string info)
        {
            var root = AppPaths();
            var stamp = Stamp();
            var target = Path.Combine(root, "www");
            var marker = Path.Combine(root, "www.version");
            info = "wzorzec";

            var upToDate = false;
            try
            {
                upToDate = File.Exists(marker) &&
                           string.Equals(File.ReadAllText(marker).Trim(), stamp, StringComparison.Ordinal) &&
                           File.Exists(Path.Combine(target, "index.html"));
            }
            catch { }

            if (upToDate)
            {
                info = "aktualne (" + stamp + ")";
                return target;
            }

            try
            {
                if (Directory.Exists(target)) Directory.Delete(target, true);
            }
            catch { }
            Directory.CreateDirectory(target);

            foreach (var pair in Files)
            {
                var path = Path.Combine(target, pair.Key.Replace('/', Path.DirectorySeparatorChar));
                var dir = Path.GetDirectoryName(path);
                if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.WriteAllBytes(path, pair.Value);
            }
            try { File.WriteAllText(marker, stamp); } catch { }
            info = "wypakowano " + Files.Count + " plików (" + stamp + ")";
            return target;
        }

        private static string Stamp()
        {
            byte[] version;
            if (Files.TryGetValue("version.json", out version))
            {
                try
                {
                    var text = Encoding.UTF8.GetString(version);
                    var idx = text.IndexOf("\"commit\"", StringComparison.Ordinal);
                    if (idx >= 0)
                    {
                        var start = text.IndexOf('"', text.IndexOf(':', idx) + 1) + 1;
                        var end = text.IndexOf('"', start);
                        if (start > 0 && end > start) return text.Substring(start, Math.Min(end - start, 40));
                    }
                }
                catch { }
            }
            return Application.ProductVersion;
        }

        private static string AppPaths()
        {
            var dir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "RunyPrzeznaczenia");
            Directory.CreateDirectory(dir);
            return dir;
        }

        private static void ShowError(string message)
        {
            Log(message);
            MessageBox.Show(message, AppName, MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private static void Log(string message)
        {
            try
            {
                File.AppendAllText(Path.Combine(AppPaths(), "game.log"),
                    "[" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "] " + message + Environment.NewLine);
            }
            catch { }
        }

        private static string FindBrowser()
        {
            var roots = new[]
            {
                Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
                Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
            };
            foreach (var root in roots)
            {
                if (string.IsNullOrEmpty(root)) continue;
                foreach (var relative in new[] { @"Microsoft\Edge\Application\msedge.exe", @"Google\Chrome\Application\chrome.exe" })
                {
                    try
                    {
                        var candidate = Path.Combine(root, relative);
                        if (File.Exists(candidate)) return candidate;
                    }
                    catch { }
                }
            }
            return null;
        }
    }
}
