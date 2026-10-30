using System;
using System.Collections.Generic;

namespace ArcaneSpire.Core
{
    /// <summary>Gra w katalogu (sklep + biblioteka).</summary>
    public class GameInfo
    {
        public string Id = "";
        public string Name = "";
        public string Tagline = "";
        public string Description = "";
        /// <summary>web = paczka HTML z GitHuba, file = pojedynczy plik/instalator, external = link do strony.</summary>
        public string Kind = "web";
        public string Repo = "";
        public string Branch = "main";
        public string SubPath = "";
        public string Url = "";
        public string Genre = "RPG";
        public string Developer = "Arcane Spire";
        public string Price = "Darmowa";
        public string Accent = "#A86BF0";
        public string Emblem = "AS";
        public bool BuiltIn;
        public long ApproxSize;

        public bool HasRepo { get { return !string.IsNullOrWhiteSpace(Repo) && Kind == "web"; } }
        public bool IsExternal { get { return Kind == "external"; } }

        public Dictionary<string, object> ToJson()
        {
            return new Dictionary<string, object>
            {
                { "id", Id }, { "name", Name }, { "tagline", Tagline }, { "description", Description },
                { "kind", Kind }, { "repo", Repo }, { "branch", Branch }, { "subPath", SubPath },
                { "url", Url }, { "genre", Genre }, { "developer", Developer }, { "price", Price },
                { "accent", Accent }, { "emblem", Emblem }, { "builtIn", BuiltIn }, { "approxSize", ApproxSize }
            };
        }

        public static GameInfo FromJson(Dictionary<string, object> dict)
        {
            if (dict == null) return null;
            var game = new GameInfo
            {
                Id = Json.Str(dict, "id"),
                Name = Json.Str(dict, "name"),
                Tagline = Json.Str(dict, "tagline"),
                Description = Json.Str(dict, "description"),
                Kind = Json.Str(dict, "kind", "web"),
                Repo = Json.Str(dict, "repo"),
                Branch = Json.Str(dict, "branch", "main"),
                SubPath = Json.Str(dict, "subPath"),
                Url = Json.Str(dict, "url"),
                Genre = Json.Str(dict, "genre", "RPG"),
                Developer = Json.Str(dict, "developer", "Arcane Spire"),
                Price = Json.Str(dict, "price", "Darmowa"),
                Accent = Json.Str(dict, "accent", "#A86BF0"),
                Emblem = Json.Str(dict, "emblem", "AS"),
                BuiltIn = Json.Bool(dict, "builtIn"),
                ApproxSize = Json.Long(dict, "approxSize")
            };
            if (string.IsNullOrWhiteSpace(game.Id)) return null;
            return game;
        }
    }

    public class Account
    {
        public string User = "";
        public string Salt = "";
        public string Hash = "";
        public string Created = "";
        public string Email = "";
        public List<string> Owned = new List<string>();
        public Dictionary<string, long> Playtime = new Dictionary<string, long>();
        public Dictionary<string, int> Launches = new Dictionary<string, int>();
        public Dictionary<string, string> LastPlayed = new Dictionary<string, string>();
        public string Avatar = "";

        public bool Owns(string gameId)
        {
            return Owned != null && Owned.Contains(gameId);
        }
    }

    public class GameState
    {
        public string Sha = "";
        public string Updated = "";
        public string Installed = "";
        public long Size;
        public string Version = "";
    }

    public class Settings
    {
        public bool AutoUpdate = true;
        public bool CloseBrowserOnExit = false;
        public bool StartWithWindows = false;
        public bool HideToTray = false;
        public string LastPage = "store";
        public string WindowBounds = "";
    }

    public class Session
    {
        public string User = "";
        public bool Remember;
    }

    /// <summary>Pozycja kolejki pobierania.</summary>
    public class DownloadJob
    {
        public string GameId = "";
        public string GameName = "";
        public string Sha = "";
        public string Status = "W kolejce";
        public double Progress;
        public long Received;
        public long Total;
        public DateTime Started = DateTime.Now;
        public bool Cancelled;
        public bool Failed;
        public bool Finished;
        public Exception Error;
        public double BytesPerSecond;

        public string SizeText
        {
            get
            {
                if (Total > 0) return AppPaths.FormatBytes(Received) + " / " + AppPaths.FormatBytes(Total);
                return AppPaths.FormatBytes(Received);
            }
        }

        public string SpeedText
        {
            get
            {
                if (BytesPerSecond <= 0) return "";
                return AppPaths.FormatBytes((long)BytesPerSecond) + "/s";
            }
        }

        public string EtaText
        {
            get
            {
                if (BytesPerSecond <= 1 || Total <= Received) return "";
                var seconds = (Total - Received) / BytesPerSecond;
                return AppPaths.FormatDuration(TimeSpan.FromSeconds(seconds));
            }
        }
    }
}
