using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace ArcaneSpire.Core
{
    /// <summary>Minimalny klient GitHuba: najnowszy commit gałęzi + pobieranie ZIP-a.</summary>
    public static class GitHub
    {
        private static readonly HttpClient Http = CreateClient();

        private static HttpClient CreateClient()
        {
            try
            {
                ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
            }
            catch { }
            var handler = new HttpClientHandler
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
                AllowAutoRedirect = true
            };
            var client = new HttpClient(handler);
            client.Timeout = TimeSpan.FromMinutes(10);
            client.DefaultRequestHeaders.UserAgent.ParseAdd("ArcaneSpire/1.1 (+https://github.com/Agama12345/gta)");
            client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github+json");
            return client;
        }

        /// <summary>SHA ostatniego commita na gałęzi (null gdy się nie uda).</summary>
        public static async Task<string> GetLatestShaAsync(string repo, string branch)
        {
            if (string.IsNullOrWhiteSpace(repo)) return null;
            if (string.IsNullOrWhiteSpace(branch)) branch = "main";
            var url = "https://api.github.com/repos/" + repo.Trim('/') +
                      "/commits?sha=" + Uri.EscapeDataString(branch) + "&per_page=1";
            try
            {
                using (var response = await Http.GetAsync(url).ConfigureAwait(false))
                {
                    if (!response.IsSuccessStatusCode)
                    {
                        AppPaths.Log("GitHub API " + repo + "@" + branch + " -> " + (int)response.StatusCode);
                        return null;
                    }
                    var text = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var list = Json.LoadArrayFromText(text);
                    if (list == null || list.Count == 0) return null;
                    var dict = Json.AsDict(list[0]);
                    return Json.Str(dict, "sha");
                }
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "GetLatestSha " + repo);
                return null;
            }
        }

        public static string ZipUrl(string repo, string sha)
        {
            if (!string.IsNullOrWhiteSpace(sha))
                return "https://codeload.github.com/" + repo.Trim('/') + "/zip/" + sha;
            return null;
        }

        /// <summary>Pobiera plik z raportowaniem postępu (0..1) i prędkością.</summary>
        public static async Task DownloadAsync(string url, string destination, Action<long, long, double> progress,
            CancellationToken token)
        {
            var folder = Path.GetDirectoryName(destination);
            if (!string.IsNullOrEmpty(folder) && !Directory.Exists(folder)) Directory.CreateDirectory(folder);

            using (var response = await Http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, token).ConfigureAwait(false))
            {
                if (!response.IsSuccessStatusCode)
                    throw new InvalidOperationException("Serwer zwrócił " + (int)response.StatusCode + " dla " + url);

                long total = 0;
                var length = response.Content.Headers.ContentLength;
                if (length.HasValue) total = length.Value;

                using (var input = await response.Content.ReadAsStreamAsync().ConfigureAwait(false))
                using (var output = new FileStream(destination, FileMode.Create, FileAccess.Write, FileShare.None, 131072, true))
                {
                    var buffer = new byte[131072];
                    long received = 0;
                    var stopwatch = System.Diagnostics.Stopwatch.StartNew();
                    long lastReport = 0;
                    double lastSpeed = 0;

                    while (true)
                    {
                        token.ThrowIfCancellationRequested();
                        var read = await input.ReadAsync(buffer, 0, buffer.Length, token).ConfigureAwait(false);
                        if (read <= 0) break;
                        await output.WriteAsync(buffer, 0, read, token).ConfigureAwait(false);
                        received += read;

                        if (stopwatch.ElapsedMilliseconds - lastReport > 120)
                        {
                            if (stopwatch.Elapsed.TotalSeconds > 0.3)
                                lastSpeed = received / stopwatch.Elapsed.TotalSeconds;
                            lastReport = stopwatch.ElapsedMilliseconds;
                            if (progress != null) progress(received, total, lastSpeed);
                        }
                    }
                    if (progress != null) progress(received, total > 0 ? total : received, lastSpeed);
                }
            }
        }
    }
}
