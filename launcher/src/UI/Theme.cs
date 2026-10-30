using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.Windows.Forms;

namespace ArcaneSpire.UI
{
    /// <summary>Kolory, fonty i pomocnicze rysowanie — ciemny motyw w stylu Steama z fioletem.</summary>
    public static class Theme
    {
        public static readonly Color Bg = Color.FromArgb(16, 18, 24);
        public static readonly Color Rail = Color.FromArgb(21, 24, 32);
        public static readonly Color Panel = Color.FromArgb(27, 31, 41);
        public static readonly Color Panel2 = Color.FromArgb(36, 41, 54);
        public static readonly Color Panel3 = Color.FromArgb(46, 52, 68);
        public static readonly Color Border = Color.FromArgb(52, 58, 74);
        public static readonly Color Text = Color.FromArgb(234, 238, 246);
        public static readonly Color Muted = Color.FromArgb(152, 161, 178);
        public static readonly Color Dim = Color.FromArgb(112, 120, 136);
        public static readonly Color Accent = Color.FromArgb(168, 107, 240);
        public static readonly Color AccentDark = Color.FromArgb(118, 72, 176);
        public static readonly Color AccentSoft = Color.FromArgb(58, 40, 84);
        public static readonly Color Good = Color.FromArgb(126, 198, 120);
        public static readonly Color Warn = Color.FromArgb(230, 176, 84);
        public static readonly Color Bad = Color.FromArgb(214, 96, 96);
        public static readonly Color Gold = Color.FromArgb(232, 194, 82);

        public static Font Font(float size, FontStyle style = FontStyle.Regular)
        {
            return new Font("Segoe UI", size, style, GraphicsUnit.Point);
        }

        public static readonly Font H1 = Font(21f, FontStyle.Bold);
        public static readonly Font H2 = Font(15f, FontStyle.Bold);
        public static readonly Font H3 = Font(12f, FontStyle.Bold);
        public static readonly Font Body = Font(9.75f);
        public static readonly Font Small = Font(8.5f);
        public static readonly Font Tiny = Font(7.75f);
        public static readonly Font Mono = new Font("Consolas", 8.5f);

        public static GraphicsPath Rounded(Rectangle bounds, int radius)
        {
            var path = new GraphicsPath();
            var d = radius * 2;
            if (d <= 0)
            {
                path.AddRectangle(bounds);
                return path;
            }
            path.AddArc(bounds.X, bounds.Y, d, d, 180, 90);
            path.AddArc(bounds.Right - d, bounds.Y, d, d, 270, 90);
            path.AddArc(bounds.Right - d, bounds.Bottom - d, d, d, 0, 90);
            path.AddArc(bounds.X, bounds.Bottom - d, d, d, 90, 90);
            path.CloseFigure();
            return path;
        }

        public static void FillRounded(Graphics g, Color color, Rectangle bounds, int radius)
        {
            using (var path = Rounded(bounds, radius))
            using (var brush = new SolidBrush(color))
            {
                g.FillPath(brush, path);
            }
        }

        public static void StrokeRounded(Graphics g, Color color, Rectangle bounds, int radius, float width = 1f)
        {
            using (var path = Rounded(bounds, radius))
            using (var pen = new Pen(color, width))
            {
                g.DrawPath(pen, path);
            }
        }

        public static Color ParseColor(string hex, Color fallback)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(hex)) return fallback;
                return ColorTranslator.FromHtml(hex);
            }
            catch { return fallback; }
        }

        public static Color Mix(Color a, Color b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            return Color.FromArgb(
                (int)(a.R + (b.R - a.R) * t),
                (int)(a.G + (b.G - a.G) * t),
                (int)(a.B + (b.B - a.B) * t));
        }

        public static Color Lighten(Color c, double amount)
        {
            return Mix(c, Color.White, amount);
        }

        public static Color Darken(Color c, double amount)
        {
            return Mix(c, Color.Black, amount);
        }

        public static void EnableSmoothing(Graphics g)
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
        }
    }
}
