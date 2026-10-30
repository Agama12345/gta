using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ArcaneSpire.Core
{
    /// <summary>Katalog gier, konta, ustawienia i stan instalacji (wszystko lokalnie w JSON).</summary>
    public static class Store
    {
        public const string RunyId = "runy-przeznaczenia";
        public const string OreRushId = "orerush";

        public static readonly List<GameInfo> Catalog = new List<GameInfo>();
        public static readonly List<Account> Accounts = new List<Account>();
        public static Settings Settings = new Settings();
        public static Account Current;

        // ------------------------------------------------------------ katalog
        private static GameInfo BuildRuny()
        {
            return new GameInfo
            {
                Id = RunyId,
                Name = "Runy Przeznaczenia",
                Tagline = "Mroczne fantasy · otwarty świat · RPG akcji",
                Description =
                    "Wilcza Dolina umiera powoli. Mgła podnosi się od północy, a pod Mglistymi Wrotami " +
                    "coś nosi twarz strażnika, który zamknął je trzydzieści lat temu. Odnajdź trzy okruchy " +
                    "Ostrza Świtu i wykuj je na nowo — zanim będzie za późno.\n\n" +
                    "Świat 1560 × 1560 metra, piętnaście krain, góry, lasy, jezioro z łodzią i wędką, " +
                    "rzemiosło, walka, dialogi i fabuła prowadzona wyborami. Wszystko generowane w kodzie " +
                    "— zero instalacji, zero dodatkowych plików.",
                Kind = "web",
                Repo = "Agama12345/gta",
                Branch = "arena/68dc2b6a-gta",
                SubPath = "releases/runy-przeznaczenia",
                Genre = "RPG",
                Developer = "Arcane Spire Studio",
                Price = "Darmowa",
                Accent = "#A86BF0",
                Emblem = "RP",
                BuiltIn = true,
                ApproxSize = 750 * 1024
            };
        }

        private static GameInfo BuildOreRush()
        {
            return new GameInfo
            {
                Id = OreRushId,
                Name = "OreRush",
                Tagline = "Zręcznościówka o kopaniu i ucieczce",
                Description =
                    "Wpadnij do kopalni, wywieź rudę i nie daj się złapać. Szybka gra zręcznościowa " +
                    "w stylu arcade — krótkie próby, wysoka powtarzalność, tabela wyników.\n\n" +
                    "Launcher uruchamia ją w osobnym oknie aplikacji. Jeśli chcesz podłączyć własną " +
                    "kopię (repozytorium GitHub z paczką HTML albo bezpośredni link), wejdź w " +
                    "Biblioteka → Właściwości i wpisz adres — launcher zapamięta i będzie aktualizował.",
                Kind = "external",
                Url = "https://orerush.com",
                Genre = "Zręcznościowa",
                Developer = "OreRush",
                Price = "Darmowa",
                Accent = "#C9A227",
                Emblem = "OR",
                BuiltIn = true,
                ApproxSize = 0
            };
        }

        public static void LoadCatalog()
        {
            Catalog.Clear();
            Catalog.Add(BuildRuny());
            Catalog.Add(BuildOreRush());

            var custom = Json.LoadArray(AppPaths.CatalogFile);
            if (custom != null)
            {
                foreach (var item in custom)
                {
                    var game = GameInfo.FromJson(Json.AsDict(item));
                    if (game == null) continue;
                    if (string.IsNullOrWhiteSpace(game.Id)) continue;
                    var builtIn = Catalog.FirstOrDefault(g => string.Equals(g.Id, game.Id, StringComparison.OrdinalIgnoreCase));
                    if (builtIn != null)
                    {
                        // nadpisania dla gier wbudowanych (np. własny adres OreRush)
                        builtIn.BuiltIn = false;
                        if (!string.IsNullOrWhiteSpace(game.Url)) builtIn.Url = game.Url;
                        if (!string.IsNullOrWhiteSpace(game.Repo)) builtIn.Repo = game.Repo;
                        if (!string.IsNullOrWhiteSpace(game.Branch)) builtIn.Branch = game.Branch;
                        if (!string.IsNullOrWhiteSpace(game.SubPath)) builtIn.SubPath = game.SubPath;
                        if (!string.IsNullOrWhiteSpace(game.Name)) builtIn.Name = game.Name;
                        if (!string.IsNullOrWhiteSpace(game.Tagline)) builtIn.Tagline = game.Tagline;
                        if (!string.IsNullOrWhiteSpace(game.Description)) builtIn.Description = game.Description;
                        if (!string.IsNullOrWhiteSpace(game.Kind)) builtIn.Kind = game.Kind;
                        continue;
                    }
                    game.BuiltIn = false;
                    Catalog.Add(game);
                }
            }
        }

        public static void SaveCatalog()
        {
            var custom = Catalog.Where(g => !g.BuiltIn).Select(g => (object)g.ToJson()).ToList();
            Json.SaveFile(AppPaths.CatalogFile, custom);
        }

        public static GameInfo FindGame(string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return null;
            return Catalog.FirstOrDefault(g => string.Equals(g.Id, id, StringComparison.OrdinalIgnoreCase));
        }

        public static void AddOrUpdateCustom(GameInfo game)
        {
            var existing = Catalog.FirstOrDefault(g => string.Equals(g.Id, game.Id, StringComparison.OrdinalIgnoreCase));
            if (existing != null) Catalog.Remove(existing);
            game.BuiltIn = false;
            Catalog.Add(game);
            SaveCatalog();
        }

        // -------------------------------------------------------------- konta
        public static void LoadAccounts()
        {
            Accounts.Clear();
            var list = Json.LoadArray(AppPaths.AccountsFile);
            if (list != null)
            {
                foreach (var item in list)
                {
                    var dict = Json.AsDict(item);
                    if (dict == null) continue;
                    var account = new Account
                    {
                        User = Json.Str(dict, "user"),
                        Salt = Json.Str(dict, "salt"),
                        Hash = Json.Str(dict, "hash"),
                        Created = Json.Str(dict, "created"),
                        Email = Json.Str(dict, "email"),
                        Avatar = Json.Str(dict, "avatar"),
                        Owned = Json.StrList(dict, "owned")
                    };
                    if (string.IsNullOrWhiteSpace(account.User)) continue;
                    var playtime = Json.AsDict(dict.ContainsKey("playtime") ? dict["playtime"] : null);
                    if (playtime != null)
                    {
                        foreach (var pair in playtime)
                        {
                            account.Playtime[pair.Key] = Json.Long(playtime, pair.Key);
                        }
                    }
                    var launches = Json.AsDict(dict.ContainsKey("launches") ? dict["launches"] : null);
                    if (launches != null)
                    {
                        foreach (var pair in launches)
                        {
                            account.Launches[pair.Key] = Json.Int(launches, pair.Key);
                        }
                    }
                    var lastPlayed = Json.AsDict(dict.ContainsKey("lastPlayed") ? dict["lastPlayed"] : null);
                    if (lastPlayed != null)
                    {
                        foreach (var pair in lastPlayed)
                        {
                            account.LastPlayed[pair.Key] = Json.Str(lastPlayed, pair.Key);
                        }
                    }
                    Accounts.Add(account);
                }
            }
        }

        public static void SaveAccounts()
        {
            var list = new List<object>();
            foreach (var account in Accounts)
            {
                var playtime = new Dictionary<string, object>();
                foreach (var pair in account.Playtime) playtime[pair.Key] = pair.Value;
                var launches = new Dictionary<string, object>();
                foreach (var pair in account.Launches) launches[pair.Key] = pair.Value;
                var lastPlayed = new Dictionary<string, object>();
                foreach (var pair in account.LastPlayed) lastPlayed[pair.Key] = pair.Value;

                list.Add(new Dictionary<string, object>
                {
                    { "user", account.User },
                    { "salt", account.Salt },
                    { "hash", account.Hash },
                    { "created", account.Created },
                    { "email", account.Email },
                    { "avatar", account.Avatar },
                    { "owned", account.Owned },
                    { "playtime", playtime },
                    { "launches", launches },
                    { "lastPlayed", lastPlayed }
                });
            }
            Json.SaveFile(AppPaths.AccountsFile, list);
        }

        private static string RandomSalt()
        {
            var bytes = new byte[16];
            using (var rng = RandomNumberGenerator.Create()) rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }

        private static string HashPassword(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            using (var kdf = new Rfc2898DeriveBytes(password ?? "", saltBytes, 60000, HashAlgorithmName.SHA256))
            {
                return Convert.ToBase64String(kdf.GetBytes(32));
            }
        }

        public static string ValidateUser(string user)
        {
            if (string.IsNullOrWhiteSpace(user)) return "Podaj nazwę użytkownika.";
            user = user.Trim();
            if (user.Length < 3) return "Nazwa musi mieć co najmniej 3 znaki.";
            if (user.Length > 24) return "Nazwa może mieć najwyżej 24 znaki.";
            foreach (var ch in user)
            {
                if (!char.IsLetterOrDigit(ch) && ch != '_' && ch != '-' && ch != '.')
                    return "Dozwolone są litery, cyfry oraz _ - .";
            }
            return null;
        }

        public static string Register(string user, string password, string password2, string email)
        {
            user = (user ?? "").Trim();
            var error = ValidateUser(user);
            if (error != null) return error;
            if (Accounts.Any(a => string.Equals(a.User, user, StringComparison.OrdinalIgnoreCase)))
                return "Konto o tej nazwie już istnieje.";
            if (string.IsNullOrEmpty(password) || password.Length < 4)
                return "Hasło musi mieć co najmniej 4 znaki.";
            if (password != password2) return "Hasła nie są takie same.";

            var salt = RandomSalt();
            var account = new Account
            {
                User = user,
                Salt = salt,
                Hash = HashPassword(password, salt),
                Created = DateTime.Now.ToString("o"),
                Email = email ?? "",
                Avatar = user.Substring(0, 1).ToUpperInvariant()
            };
            account.Owned.Add(RunyId);
            Accounts.Add(account);
            SaveAccounts();
            Current = account;
            SaveSession(true);
            AppPaths.Log("Zarejestrowano konto: " + user);
            return null;
        }

        public static string Login(string user, string password, bool remember)
        {
            user = (user ?? "").Trim();
            var account = Accounts.FirstOrDefault(a => string.Equals(a.User, user, StringComparison.OrdinalIgnoreCase));
            if (account == null) return "Nie ma takiego konta. Zarejestruj się.";
            var hash = HashPassword(password ?? "", account.Salt);
            if (!string.Equals(hash, account.Hash, StringComparison.Ordinal))
                return "Błędne hasło.";
            Current = account;
            SaveSession(remember);
            AppPaths.Log("Zalogowano: " + user);
            return null;
        }

        public static void Logout()
        {
            Current = null;
            try { if (File.Exists(AppPaths.SessionFile)) File.Delete(AppPaths.SessionFile); }
            catch { }
        }

        public static void SaveSession(bool remember)
        {
            if (Current == null || !remember)
            {
                try { if (File.Exists(AppPaths.SessionFile)) File.Delete(AppPaths.SessionFile); }
                catch { }
                return;
            }
            Json.SaveFile(AppPaths.SessionFile, new Dictionary<string, object>
            {
                { "user", Current.User }, { "remember", true }
            });
        }

        public static void RestoreSession()
        {
            var dict = Json.LoadObject(AppPaths.SessionFile);
            if (dict == null) return;
            if (!Json.Bool(dict, "remember")) return;
            var user = Json.Str(dict, "user");
            var account = Accounts.FirstOrDefault(a => string.Equals(a.User, user, StringComparison.OrdinalIgnoreCase));
            if (account != null) Current = account;
        }

        public static string ChangePassword(string oldPassword, string password, string password2)
        {
            if (Current == null) return "Nie jesteś zalogowany.";
            if (!string.Equals(HashPassword(oldPassword ?? "", Current.Salt), Current.Hash, StringComparison.Ordinal))
                return "Stare hasło jest błędne.";
            if (string.IsNullOrEmpty(password) || password.Length < 4) return "Nowe hasło musi mieć co najmniej 4 znaki.";
            if (password != password2) return "Hasła nie są takie same.";
            Current.Salt = RandomSalt();
            Current.Hash = HashPassword(password, Current.Salt);
            SaveAccounts();
            return null;
        }

        public static void Grant(string gameId)
        {
            if (Current == null) return;
            if (!Current.Owned.Contains(gameId))
            {
                Current.Owned.Add(gameId);
                SaveAccounts();
            }
        }

        public static void AddPlaytime(string gameId, TimeSpan span)
        {
            if (Current == null || span.TotalSeconds < 1) return;
            long current;
            Current.Playtime.TryGetValue(gameId, out current);
            Current.Playtime[gameId] = current + (long)span.TotalSeconds;
            int launches;
            Current.Launches.TryGetValue(gameId, out launches);
            Current.Launches[gameId] = launches + 1;
            Current.LastPlayed[gameId] = DateTime.Now.ToString("o");
            SaveAccounts();
        }

        public static string PlaytimeText(string gameId)
        {
            if (Current == null) return "";
            long seconds;
            if (!Current.Playtime.TryGetValue(gameId, out seconds) || seconds < 60) return "brak czasu gry";
            var span = TimeSpan.FromSeconds(seconds);
            if (span.TotalHours >= 1) return string.Format("{0:0.#} godz", span.TotalHours);
            return ((int)span.TotalMinutes) + " min";
        }

        // ---------------------------------------------------------- ustawienia
        public static void LoadSettings()
        {
            var dict = Json.LoadObject(AppPaths.SettingsFile);
            Settings = new Settings();
            if (dict == null) return;
            Settings.AutoUpdate = Json.Bool(dict, "autoUpdate", true);
            Settings.CloseBrowserOnExit = Json.Bool(dict, "closeBrowserOnExit");
            Settings.StartWithWindows = Json.Bool(dict, "startWithWindows");
            Settings.HideToTray = Json.Bool(dict, "hideToTray");
            Settings.LastPage = Json.Str(dict, "lastPage", "store");
            Settings.WindowBounds = Json.Str(dict, "windowBounds");
        }

        public static void SaveSettings()
        {
            Json.SaveFile(AppPaths.SettingsFile, new Dictionary<string, object>
            {
                { "autoUpdate", Settings.AutoUpdate },
                { "closeBrowserOnExit", Settings.CloseBrowserOnExit },
                { "startWithWindows", Settings.StartWithWindows },
                { "hideToTray", Settings.HideToTray },
                { "lastPage", Settings.LastPage },
                { "windowBounds", Settings.WindowBounds }
            });
        }

        // ------------------------------------------------------ stan instalacji
        public static GameState GetState(string gameId)
        {
            var dict = Json.LoadObject(AppPaths.GameStateFile(gameId));
            if (dict == null) return new GameState();
            return new GameState
            {
                Sha = Json.Str(dict, "sha"),
                Updated = Json.Str(dict, "updated"),
                Installed = Json.Str(dict, "installed"),
                Size = Json.Long(dict, "size"),
                Version = Json.Str(dict, "version")
            };
        }

        public static void SaveState(string gameId, GameState state)
        {
            Json.SaveFile(AppPaths.GameStateFile(gameId), new Dictionary<string, object>
            {
                { "sha", state.Sha },
                { "updated", state.Updated },
                { "installed", state.Installed },
                { "size", state.Size },
                { "version", state.Version }
            });
        }

        public static bool IsInstalled(GameInfo game)
        {
            if (game == null) return false;
            var state = GetState(game.Id);
            if (game.Kind == "external")
            {
                return !string.IsNullOrWhiteSpace(state.Installed);
            }
            if (game.Kind == "file")
            {
                return !string.IsNullOrWhiteSpace(state.Installed) && File.Exists(state.Installed);
            }
            var www = AppPaths.GameWww(game.Id);
            return Directory.Exists(www) && File.Exists(Path.Combine(www, "index.html"));
        }

        public static bool IsOwned(GameInfo game)
        {
            if (game == null) return false;
            if (Current == null) return false;
            if (Current.Owns(game.Id)) return true;
            // gry dodane ręcznie traktujemy jako własne
            return !game.BuiltIn;
        }
    }
}
