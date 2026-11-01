using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;

namespace ArcaneSpire.Core
{
    /// <summary>Mały wrapper na JavaScriptSerializer — zero zewnętrznych bibliotek.</summary>
    public static class Json
    {
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer
        {
            MaxJsonLength = int.MaxValue,
            RecursionLimit = 200
        };

        public static string Write(object value)
        {
            try { return Serializer.Serialize(value); }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.Write");
                return "{}";
            }
        }

        public static void SaveFile(string path, object value)
        {
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path));
                File.WriteAllText(path, Write(value), new UTF8Encoding(false));
            }
            catch (Exception ex) { AppPaths.Log(ex, "Json.SaveFile " + path); }
        }

        public static Dictionary<string, object> LoadObjectFromText(string text)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(text)) return null;
                var obj = Serializer.Deserialize<object>(text);
                return AsDict(obj);
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.LoadObjectFromText");
                return null;
            }
        }

        public static List<object> LoadArrayFromText(string text)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(text)) return null;
                var obj = Serializer.Deserialize<object>(text);
                var array = obj as object[];
                if (array != null) return new List<object>(array);
                var list = obj as List<object>;
                if (list != null) return list;
                var loose = obj as IList;
                if (loose != null)
                {
                    var result = new List<object>();
                    foreach (var item in loose) result.Add(item);
                    return result;
                }
                return null;
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.LoadArrayFromText");
                return null;
            }
        }

        public static Dictionary<string, object> LoadObject(string path)
        {
            try
            {
                if (!File.Exists(path)) return null;
                var text = File.ReadAllText(path, Encoding.UTF8);
                if (string.IsNullOrWhiteSpace(text)) return null;
                var obj = Serializer.Deserialize<object>(text);
                var dict = obj as Dictionary<string, object>;
                if (dict != null) return dict;
                var loose = obj as IDictionary;
                if (loose == null) return null;
                var result = new Dictionary<string, object>();
                foreach (DictionaryEntry pair in loose) result[Convert.ToString(pair.Key)] = pair.Value;
                return result;
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.LoadObject " + path);
                return null;
            }
        }

        public static List<object> LoadArray(string path)
        {
            try
            {
                if (!File.Exists(path)) return null;
                var text = File.ReadAllText(path, Encoding.UTF8);
                if (string.IsNullOrWhiteSpace(text)) return null;
                var obj = Serializer.Deserialize<object>(text);
                var list = obj as object[];
                if (list != null) return new List<object>(list);
                var arrayList = obj as ArrayList;
                if (arrayList != null) return new List<object>(arrayList.ToArray());
                var generic = obj as List<object>;
                if (generic != null) return generic;
                var loose = obj as IList;
                if (loose != null)
                {
                    var result = new List<object>();
                    foreach (var item in loose) result.Add(item);
                    return result;
                }
                return null;
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.LoadArray " + path);
                return null;
            }
        }

        public static T Deserialize<T>(string text) where T : class
        {
            try
            {
                if (string.IsNullOrWhiteSpace(text)) return null;
                return Serializer.Deserialize<T>(text);
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "Json.Deserialize");
                return null;
            }
        }

        // -------------------------------------------------- czytanie wartości
        public static string Str(Dictionary<string, object> dict, string key, string fallback = "")
        {
            if (dict == null) return fallback;
            object value;
            if (!dict.TryGetValue(key, out value) || value == null) return fallback;
            var text = value as string;
            if (text != null) return text;
            return Convert.ToString(value, CultureInfo.InvariantCulture);
        }

        public static bool Bool(Dictionary<string, object> dict, string key, bool fallback = false)
        {
            if (dict == null) return fallback;
            object value;
            if (!dict.TryGetValue(key, out value) || value == null) return fallback;
            if (value is bool) return (bool)value;
            bool parsed;
            if (bool.TryParse(Convert.ToString(value, CultureInfo.InvariantCulture), out parsed)) return parsed;
            return fallback;
        }

        public static int Int(Dictionary<string, object> dict, string key, int fallback = 0)
        {
            if (dict == null) return fallback;
            object value;
            if (!dict.TryGetValue(key, out value) || value == null) return fallback;
            try { return Convert.ToInt32(value, CultureInfo.InvariantCulture); }
            catch { return fallback; }
        }

        public static long Long(Dictionary<string, object> dict, string key, long fallback = 0)
        {
            if (dict == null) return fallback;
            object value;
            if (!dict.TryGetValue(key, out value) || value == null) return fallback;
            try { return Convert.ToInt64(value, CultureInfo.InvariantCulture); }
            catch { return fallback; }
        }

        public static List<string> StrList(Dictionary<string, object> dict, string key)
        {
            var result = new List<string>();
            if (dict == null) return result;
            object value;
            if (!dict.TryGetValue(key, out value) || value == null) return result;
            var loose = value as IList;
            if (loose == null) return result;
            foreach (var item in loose) result.Add(Convert.ToString(item, CultureInfo.InvariantCulture));
            return result;
        }

        public static Dictionary<string, object> AsDict(object value)
        {
            var dict = value as Dictionary<string, object>;
            if (dict != null) return dict;
            var loose = value as IDictionary;
            if (loose == null) return null;
            var result = new Dictionary<string, object>();
            foreach (DictionaryEntry pair in loose) result[Convert.ToString(pair.Key)] = pair.Value;
            return result;
        }

        public static List<object> AsList(object value)
        {
            var list = value as List<object>;
            if (list != null) return list;
            var array = value as object[];
            if (array != null) return new List<object>(array);
            var loose = value as IList;
            if (loose != null)
            {
                var result = new List<object>();
                foreach (var item in loose) result.Add(item);
                return result;
            }
            return null;
        }
    }
}
