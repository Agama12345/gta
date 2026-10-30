using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Reflection;

namespace ArcaneSpire.UI
{
    /// <summary>Zasoby wbudowane w .exe (ikony PNG).</summary>
    public static class Assets
    {
        private static readonly Dictionary<string, Image> Cache = new Dictionary<string, Image>();

        public static Image Load(string name)
        {
            lock (Cache)
            {
                Image cached;
                if (Cache.TryGetValue(name, out cached)) return cached;
                try
                {
                    var assembly = Assembly.GetExecutingAssembly();
                    foreach (var resourceName in assembly.GetManifestResourceNames())
                    {
                        if (!resourceName.EndsWith("." + name, StringComparison.OrdinalIgnoreCase)) continue;
                        using (var stream = assembly.GetManifestResourceStream(resourceName))
                        {
                            if (stream == null) continue;
                            var image = Image.FromStream(stream);
                            Cache[name] = image;
                            return image;
                        }
                    }
                }
                catch (Exception ex) { Core.AppPaths.Log(ex, "Assets.Load " + name); }
                return null;
            }
        }

        public static Image Logo48 { get { return Load("icon-48.png") ?? Load("app.png"); } }
        public static Image Logo128 { get { return Load("icon-128.png") ?? Load("app.png"); } }
    }
}
