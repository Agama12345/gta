using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ArcaneSpire.Core
{
    /// <summary>
    /// Lokalny serwer HTTP na 127.0.0.1 (TcpListener — bez praw administratora).
    /// Serwuje wyłącznie katalog www wskazanej gry, blokuje wyjście poza niego (..).
    /// </summary>
    public class LocalServer
    {
        private static readonly Dictionary<string, LocalServer> Servers = new Dictionary<string, LocalServer>();
        private static readonly object Sync = new object();

        private readonly string _root;
        private readonly TcpListener _listener;
        private readonly CancellationTokenSource _cts = new CancellationTokenSource();

        public int Port { get; private set; }

        private LocalServer(string root)
        {
            _root = Path.GetFullPath(root).TrimEnd(Path.DirectorySeparatorChar);
            _listener = new TcpListener(IPAddress.Loopback, 0);
            _listener.Start();
            Port = ((IPEndPoint)_listener.LocalEndpoint).Port;
            var ignored = Task.Run(() => AcceptLoopAsync());
        }

        public static LocalServer EnsureFor(string gameId, string wwwRoot)
        {
            lock (Sync)
            {
                LocalServer server;
                if (Servers.TryGetValue(gameId, out server)) return server;
                server = new LocalServer(wwwRoot);
                Servers[gameId] = server;
                AppPaths.Log("Serwer localhost dla " + gameId + " na porcie " + server.Port);
                return server;
            }
        }

        public static void StopAll()
        {
            lock (Sync)
            {
                foreach (var server in Servers.Values)
                {
                    try { server._cts.Cancel(); server._listener.Stop(); } catch { }
                }
                Servers.Clear();
            }
        }

        private async Task AcceptLoopAsync()
        {
            while (!_cts.IsCancellationRequested)
            {
                TcpClient client;
                try { client = await _listener.AcceptTcpClientAsync().ConfigureAwait(false); }
                catch { break; }
                Task.Run(() => HandleClient(client));
            }
        }

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
            { ".webp", "image/webp" },
            { ".svg", "image/svg+xml" },
            { ".ico", "image/x-icon" },
            { ".woff", "font/woff" },
            { ".woff2", "font/woff2" },
            { ".ttf", "font/ttf" },
            { ".mp3", "audio/mpeg" },
            { ".ogg", "audio/ogg" },
            { ".wav", "audio/wav" },
            { ".mp4", "video/mp4" },
            { ".wasm", "application/wasm" },
            { ".txt", "text/plain; charset=utf-8" },
            { ".map", "application/json; charset=utf-8" }
        };

        private void HandleClient(TcpClient client)
        {
            try
            {
                using (client)
                {
                    client.ReceiveTimeout = 8000;
                    client.SendTimeout = 30000;
                    var stream = client.GetStream();

                    var requestLine = ReadLine(stream);
                    if (string.IsNullOrEmpty(requestLine)) return;
                    var parts = requestLine.Split(' ');
                    if (parts.Length < 2) return;

                    // nagłówki (do końca)
                    string header;
                    var guard = 0;
                    do
                    {
                        header = ReadLine(stream);
                        guard++;
                    } while (!string.IsNullOrEmpty(header) && guard < 100);

                    var rawPath = parts[1];
                    var queryIndex = rawPath.IndexOf('?');
                    if (queryIndex >= 0) rawPath = rawPath.Substring(0, queryIndex);
                    var path = Uri.UnescapeDataString(rawPath).Replace('/', Path.DirectorySeparatorChar).TrimStart(Path.DirectorySeparatorChar);
                    if (string.IsNullOrEmpty(path)) path = "index.html";

                    var candidate = Path.GetFullPath(Path.Combine(_root, path));
                    if (!candidate.StartsWith(_root, StringComparison.OrdinalIgnoreCase))
                    {
                        WriteResponse(stream, 403, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes("403"));
                        return;
                    }
                    if (Directory.Exists(candidate))
                    {
                        candidate = Path.Combine(candidate, "index.html");
                    }
                    if (!File.Exists(candidate))
                    {
                        // SPA: nieznana ścieżka -> index.html
                        candidate = Path.Combine(_root, "index.html");
                        if (!File.Exists(candidate))
                        {
                            WriteResponse(stream, 404, "text/plain; charset=utf-8", Encoding.UTF8.GetBytes("404"));
                            return;
                        }
                    }

                    var bytes = File.ReadAllBytes(candidate);
                    var ext = Path.GetExtension(candidate);
                    string contentType;
                    if (!Mime.TryGetValue(ext, out contentType)) contentType = "application/octet-stream";
                    WriteResponse(stream, 200, contentType, bytes);
                }
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "LocalServer.HandleClient");
            }
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
            var reason = status == 200 ? "OK" : status == 403 ? "Forbidden" : "Not Found";
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
    }
}
