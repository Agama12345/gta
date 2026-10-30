using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace RunyPrzeznaczenia
{
    /// <summary>
    /// Samodzielny plik exe z grą „Runy Przeznaczenia”.
    ///
    /// Gra jest wbudowana w plik jako zasoby. Po uruchomieniu:
    ///   1. serwer HTTP startuje na 127.0.0.1 (losowy, wolny port),
    ///   2. gra otwiera się w Edge/Chrome w trybie aplikacji (albo w domyślnej przeglądarce),
    ///   3. plik kończy działanie, gdy zamkniesz okno gry.
    ///
    /// Parametry:
    ///   --selftest   sprawdzenie zasobów i serwera, bez otwierania okna gry
    ///   --port=NNNN  wymuszenie portu
    /// </summary>
    internal static class Program
    {
        private static readonly Dictionary<string, byte[]> Files =
            new Dictionary<string, byte[]>(StringComparer.OrdinalIgnoreCase);

        private static readonly Dictionary<string, string> Mime = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".html", "text/html; charset=utf-8" },
            { ".htm", "text/html; charset=utf-8" },
            { ".js", "application/javascript; charset=utf-8" },
            { ".mjs", "application/javascript; charset=utf-8" },
            { ".css", "text/css; charset=utf-8" },
            { ".json", "application/json; charset=utf-8" },
            { ".png", "image/png" },
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".gif", "image/gif" },
            { ".svg", "image/svg+xml" },
            { ".ico", "image/x-icon" },
            { ".woff", "font/woff" },
            { ".woff2", "font/woff2" },
            { ".ttf", "font/ttf" },
            { ".mp3", "audio/mpeg" },
            { ".ogg", "audio/ogg" },
            { ".wav", "audio/wav" },
            { ".webp", "image/webp" },
            { ".map", "application/json; charset=utf-8" },
            { ".txt", "text/plain; charset=utf-8" }
        };

        [STAThread]
        private static void Main(string[] args)
        {
            var selfTest = false;
            var forcedPort = 0;
            if (args != null)
            {
                foreach (var arg in args)
                {
                    if (string.Equals(arg, "--selftest", StringComparison.OrdinalIgnoreCase)) selfTest = true;
                    if (arg.StartsWith("--port=", StringComparison.OrdinalIgnoreCase))
                    {
                        int.TryParse(arg.Substring(7), out forcedPort);
                    }
                }
            }

            try
            {
                LoadResources();
                Log("Zasobów w exe: " + Files.Count + " (" + TotalSize() + " B)");
            }
            catch (Exception ex)
            {
                ShowError("Nie udało się wczytać zasobów gry:\n" + ex.Message);
                return;
            }

            if (!Files.ContainsKey("index.html"))
            {
                ShowError("W pliku exe brakuje index.html — build jest niepoprawny.");
                return;
            }

            TcpListener listener;
            int port;
            try
            {
                listener = new TcpListener(IPAddress.Loopback, forcedPort > 0 ? forcedPort : 0);
                listener.Start();
                port = ((IPEndPoint)listener.LocalEndpoint).Port;
            }
            catch (Exception ex)
            {
                ShowError("Nie udało się uruchomić lokalnego serwera:\n" + ex.Message);
                return;
            }

            var stopping = false;
            var thread = new Thread(() => AcceptLoop(listener, () => stopping));
            thread.IsBackground = true;
            thread.Start();

            var url = "http://127.0.0.1:" + port + "/index.html";
            Log("Serwer gry: " + url);

            if (selfTest)
            {
                var report = SelfTest(url, listener);
                MessageBox.Show(report, "Runy Przeznaczenia — autotest", MessageBoxButtons.OK, MessageBoxIcon.Information);
                stopping = true;
                try { listener.Stop(); } catch { }
                return;
            }

            var browser = FindBrowser();
            Process gameProcess = null;
            if (browser != null)
            {
                try
                {
                    var profile = Path.Combine(
                        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                        "RunyPrzeznaczenia", "browser");
                    Directory.CreateDirectory(profile);
                    var arguments = "--app=" + url +
                                    " --window-size=1500,940" +
                                    " --user-data-dir=\"" + profile + "\"" +
                                    " --no-first-run --no-default-browser-check" +
                                    " --disable-features=Translate,msEdgeTranslate";
                    gameProcess = Process.Start(new ProcessStartInfo(browser, arguments) { UseShellExecute = false });
                    Log("Uruchomiono " + browser);
                }
                catch (Exception ex)
                {
                    Log("Nie udało się uruchomić przeglądarki: " + ex.Message);
                }
            }

            if (gameProcess == null)
            {
                try { Process.Start(url); }
                catch (Exception ex) { Log("Process.Start: " + ex.Message); }
                MessageBox.Show(
                    "Gra otworzyła się w przeglądarce.\n\nAdres: " + url +
                    "\n\nZamknij to okno, aby zakończyć serwer gry.",
                    "Runy Przeznaczenia", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                try
                {
                    gameProcess.WaitForExit();
                    Log("Okno gry zamknięte — kończę.");
                }
                catch { }
            }

            stopping = true;
            try { listener.Stop(); } catch { }
            Thread.Sleep(150);
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
                    var path = name.Substring(5).Replace('\\', '/');
                    Files[path] = buffer;
                }
            }
        }

        private static long TotalSize()
        {
            long sum = 0;
            foreach (var value in Files.Values) sum += value.Length;
            return sum;
        }

        private static void AcceptLoop(TcpListener listener, Func<bool> stopping)
        {
            while (!stopping())
            {
                TcpClient client;
                try { client = listener.AcceptTcpClient(); }
                catch { return; }
                ThreadPool.QueueUserWorkItem(_ => Handle(client));
            }
        }

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
                        if (!Files.TryGetValue("index.html", out body))
                        {
                            WriteResponse(stream, 404, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes("404"));
                            return;
                        }
                        path = "index.html";
                    }

                    var ext = Path.GetExtension(path);
                    string type;
                    if (!Mime.TryGetValue(ext, out type)) type = "application/octet-stream";
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
            var reason = status == 200 ? "OK" : "Not Found";
            var head = "HTTP/1.1 " + status + " " + reason + "\r\n" +
                       "Content-Type: " + contentType + "\r\n" +
                       "Content-Length: " + body.Length + "\r\n" +
                       "Cache-Control: no-cache\r\n" +
                       "Connection: close\r\n\r\n";
            var headBytes = Encoding.ASCII.GetBytes(head);
            stream.Write(headBytes, 0, headBytes.Length);
            stream.Write(body, 0, body.Length);
            stream.Flush();
        }

        // ---------------------------------------------------------- diagnostyka
        private static string SelfTest(string url, TcpListener listener)
        {
            var report = new StringBuilder();
            report.AppendLine("Runy Przeznaczenia " + Application.ProductVersion);
            report.AppendLine("Plik: " + Application.ExecutablePath);
            report.AppendLine("Zasoby w exe: " + Files.Count + " plików, " + TotalSize() + " B");
            report.AppendLine("index.html: " + (Files.ContainsKey("index.html") ? "jest" : "BRAK"));

            var ok = true;
            try
            {
                using (var client = new WebClient())
                {
                    var html = client.DownloadString(url);
                    report.AppendLine("Serwer HTTP: " + url + " → " + html.Length + " znaków");
                    ok = html.Length > 200;
                }
            }
            catch (Exception ex)
            {
                report.AppendLine("Serwer HTTP: BŁĄD " + ex.Message);
                ok = false;
            }

            var browser = FindBrowser();
            report.AppendLine("Przeglądarka: " + (browser ?? "brak Edge/Chrome (otworzy się domyślna)"));
            report.AppendLine(ok ? "\nWynik: wszystko działa." : "\nWynik: są problemy — szczegóły powyżej.");
            return report.ToString();
        }

        private static void ShowError(string message)
        {
            Log(message);
            MessageBox.Show(message, "Runy Przeznaczenia", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private static void Log(string message)
        {
            try
            {
                var dir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "RunyPrzeznaczenia");
                Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "game.log"),
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
                foreach (var relative in new[]
                {
                    @"Microsoft\Edge\Application\msedge.exe",
                    @"Google\Chrome\Application\chrome.exe"
                })
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
