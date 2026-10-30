using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace ArcaneSpire.UI
{
    public enum ButtonStyle
    {
        Primary,
        Secondary,
        Ghost,
        Danger,
        Success
    }

    /// <summary>Przycisk rysowany ręcznie — płaski, zaokrąglony, z akcentem.</summary>
    public class SpireButton : Button
    {
        private bool _hover;
        private bool _pressed;

        public ButtonStyle Style { get; set; }
        public int Radius { get; set; }
        public Color AccentColor { get; set; }
        public bool Compact { get; set; }

        public SpireButton()
        {
            Style = ButtonStyle.Secondary;
            Radius = 6;
            AccentColor = Theme.Accent;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
            FlatStyle = FlatStyle.Flat;
            FlatAppearance.BorderSize = 0;
            Font = Theme.Font(9.75f, FontStyle.Bold);
            ForeColor = Theme.Text;
            BackColor = Color.Transparent;
            Cursor = Cursors.Hand;
            Size = new Size(160, 40);
        }

        protected override void OnMouseEnter(EventArgs e)
        {
            _hover = true;
            Invalidate();
            base.OnMouseEnter(e);
        }

        protected override void OnMouseLeave(EventArgs e)
        {
            _hover = false;
            _pressed = false;
            Invalidate();
            base.OnMouseLeave(e);
        }

        protected override void OnMouseDown(MouseEventArgs mevent)
        {
            _pressed = true;
            Invalidate();
            base.OnMouseDown(mevent);
        }

        protected override void OnMouseUp(MouseEventArgs mevent)
        {
            _pressed = false;
            Invalidate();
            base.OnMouseUp(mevent);
        }

        protected override void OnEnabledChanged(EventArgs e)
        {
            Invalidate();
            base.OnEnabledChanged(e);
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var rect = new Rectangle(0, 0, Width - 1, Height - 1);

            Color fill;
            Color border;
            Color text;
            switch (Style)
            {
                case ButtonStyle.Primary:
                    fill = _pressed ? Theme.AccentDark : _hover ? Theme.Lighten(AccentColor, 0.12) : AccentColor;
                    border = Theme.Lighten(AccentColor, 0.25);
                    text = Color.White;
                    break;
                case ButtonStyle.Success:
                    fill = _pressed ? Color.FromArgb(60, 130, 82) : _hover ? Color.FromArgb(84, 170, 106) : Color.FromArgb(72, 152, 92);
                    border = Color.FromArgb(110, 200, 130);
                    text = Color.White;
                    break;
                case ButtonStyle.Danger:
                    fill = _pressed ? Color.FromArgb(130, 50, 50) : _hover ? Color.FromArgb(176, 70, 70) : Color.FromArgb(150, 58, 58);
                    border = Color.FromArgb(200, 100, 100);
                    text = Color.White;
                    break;
                case ButtonStyle.Ghost:
                    fill = _hover ? Theme.Panel2 : Theme.Panel;
                    border = Theme.Border;
                    text = _hover ? Theme.Text : Theme.Muted;
                    break;
                default:
                    fill = _pressed ? Theme.Panel : _hover ? Theme.Panel3 : Theme.Panel2;
                    border = _hover ? Theme.Lighten(Theme.Border, 0.15) : Theme.Border;
                    text = Theme.Text;
                    break;
            }

            if (!Enabled)
            {
                fill = Theme.Mix(fill, Theme.Bg, 0.55);
                border = Theme.Mix(border, Theme.Bg, 0.55);
                text = Theme.Dim;
            }

            Theme.FillRounded(g, fill, rect, Radius);
            Theme.StrokeRounded(g, border, rect, Radius);

            var flags = TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter |
                        TextFormatFlags.EndEllipsis | TextFormatFlags.NoPadding;
            if (Compact) flags |= TextFormatFlags.SingleLine;
            TextRenderer.DrawText(g, Text, Font, rect, text, flags);
        }
    }

    /// <summary>Panel z zaokrąglonym tłem i obramowaniem.</summary>
    public class RoundPanel : Panel
    {
        public int Radius { get; set; }
        public Color FillColor { get; set; }
        public Color BorderColor { get; set; }

        public RoundPanel()
        {
            Radius = 10;
            FillColor = Theme.Panel;
            BorderColor = Theme.Border;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
            BackColor = Color.Transparent;
        }

        protected override void OnPaintBackground(PaintEventArgs e)
        {
            if (Parent != null)
            {
                using (var brush = new SolidBrush(Parent.BackColor))
                {
                    e.Graphics.FillRectangle(brush, ClientRectangle);
                }
            }
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var rect = new Rectangle(0, 0, Width - 1, Height - 1);
            Theme.FillRounded(g, FillColor, rect, Radius);
            if (BorderColor.A > 0) Theme.StrokeRounded(g, BorderColor, rect, Radius);
        }
    }

    /// <summary>Okładka gry: gradient w kolorze akcentu + godło z liter.</summary>
    public class CoverArt : Control
    {
        private readonly string _emblem;
        private readonly Color _accent;
        private readonly string _title;
        private readonly string _subtitle;

        public bool ShowTitle { get; set; }
        public int CornerRadius { get; set; }

        public CoverArt(string emblem, string accentHex, string title, string subtitle)
        {
            _emblem = string.IsNullOrWhiteSpace(emblem) ? "AS" : emblem;
            _accent = Theme.ParseColor(accentHex, Theme.Accent);
            _title = title ?? "";
            _subtitle = subtitle ?? "";
            ShowTitle = true;
            CornerRadius = 8;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
            BackColor = Color.Transparent;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            if (Width < 4 || Height < 4) return;

            var rect = new Rectangle(0, 0, Width - 1, Height - 1);
            using (var path = Theme.Rounded(rect, CornerRadius))
            {
                var top = Theme.Darken(_accent, 0.55);
                var bottom = Theme.Mix(Theme.Bg, _accent, 0.18);
                using (var brush = new LinearGradientBrush(rect, top, bottom, 55f))
                {
                    g.FillPath(brush, path);
                }

                // ukośne pasy — tekstura "okładki"
                var state = g.Save();
                g.SetClip(path);
                using (var pen = new Pen(Color.FromArgb(16, 255, 255, 255), Math.Max(2f, Width / 90f)))
                {
                    for (var x = -Height; x < Width + Height; x += Math.Max(18, Width / 12))
                    {
                        g.DrawLine(pen, x, Height, x + Height, 0);
                    }
                }
                g.Restore(state);

                // godło
                var size = Math.Min(Width, Height) * 0.42f;
                using (var font = Theme.Font(size, FontStyle.Bold))
                {
                    var flags = TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter | TextFormatFlags.NoPadding;
                    var area = new Rectangle(0, (int)(Height * 0.34f - size * 0.8f), Width, (int)(size * 1.9f));
                    TextRenderer.DrawText(g, _emblem, font, area, Color.FromArgb(235, 255, 255, 255), flags);
                }

                if (ShowTitle && Height > 90)
                {
                    var barHeight = Math.Max(38, Height / 3);
                    var bar = new Rectangle(0, Height - barHeight, Width, barHeight);
                    using (var brush = new SolidBrush(Color.FromArgb(190, 8, 8, 12)))
                    {
                        g.FillRectangle(brush, bar);
                    }
                    TextRenderer.DrawText(g, _title, Theme.Font(11f, FontStyle.Bold),
                        new Rectangle(12, bar.Y + 7, Width - 24, 22), Theme.Text,
                        TextFormatFlags.Left | TextFormatFlags.EndEllipsis);
                    if (!string.IsNullOrEmpty(_subtitle))
                    {
                        TextRenderer.DrawText(g, _subtitle, Theme.Font(8.25f),
                            new Rectangle(12, bar.Y + 26, Width - 24, 18), Theme.Muted,
                            TextFormatFlags.Left | TextFormatFlags.EndEllipsis);
                    }
                }

                using (var pen = new Pen(Color.FromArgb(70, _accent), 1f))
                {
                    g.DrawPath(pen, path);
                }
            }
        }
    }

    /// <summary>Pasek postępu rysowany ręcznie (bez animacji systemowej).</summary>
    public class ProgressStrip : Control
    {
        private double _value;
        public Color BarColor { get; set; }
        public bool Indeterminate { get; set; }

        public double Value
        {
            get { return _value; }
            set
            {
                var clamped = Math.Max(0, Math.Min(1, value));
                if (Math.Abs(clamped - _value) < 0.0005) return;
                _value = clamped;
                Invalidate();
            }
        }

        public ProgressStrip()
        {
            BarColor = Theme.Accent;
            Height = 8;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
            BackColor = Color.Transparent;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var rect = new Rectangle(0, 0, Width - 1, Height - 1);
            Theme.FillRounded(g, Theme.Panel3, rect, Height / 2);
            var filledWidth = (int)(rect.Width * _value);
            if (filledWidth > 2)
            {
                var fill = new Rectangle(rect.X, rect.Y, filledWidth, rect.Height);
                using (var brush = new LinearGradientBrush(fill, Theme.Lighten(BarColor, 0.2), BarColor, 0f))
                using (var path = Theme.Rounded(fill, Height / 2))
                {
                    g.FillPath(brush, path);
                }
            }
        }
    }

    /// <summary>Pozycja w lewej nawigacji.</summary>
    public class NavButton : Button
    {
        private bool _hover;
        private bool _active;
        public string Glyph { get; set; }

        public bool Active
        {
            get { return _active; }
            set { _active = value; Invalidate(); }
        }

        public NavButton(string text, string glyph)
        {
            Text = text;
            Glyph = glyph;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
            FlatStyle = FlatStyle.Flat;
            FlatAppearance.BorderSize = 0;
            Font = Theme.Font(10f, FontStyle.Bold);
            BackColor = Color.Transparent;
            Cursor = Cursors.Hand;
            Height = 42;
            TextAlign = ContentAlignment.MiddleLeft;
        }

        protected override void OnMouseEnter(EventArgs e) { _hover = true; Invalidate(); base.OnMouseEnter(e); }
        protected override void OnMouseLeave(EventArgs e) { _hover = false; Invalidate(); base.OnMouseLeave(e); }

        protected override void OnPaint(PaintEventArgs e)
        {
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var rect = new Rectangle(0, 0, Width - 1, Height - 1);
            if (_active)
            {
                Theme.FillRounded(g, Theme.AccentSoft, rect, 8);
                using (var brush = new SolidBrush(Theme.Accent))
                {
                    g.FillRectangle(brush, new Rectangle(0, 8, 3, Height - 16));
                }
            }
            else if (_hover)
            {
                Theme.FillRounded(g, Theme.Panel2, rect, 8);
            }

            var textColor = _active ? Theme.Text : _hover ? Theme.Lighten(Theme.Muted, 0.2) : Theme.Muted;
            TextRenderer.DrawText(g, Glyph, Theme.Font(11f), new Rectangle(14, 0, 26, Height), textColor,
                TextFormatFlags.VerticalCenter | TextFormatFlags.Left | TextFormatFlags.NoPadding);
            TextRenderer.DrawText(g, Text, Font, new Rectangle(44, 0, Width - 54, Height), textColor,
                TextFormatFlags.VerticalCenter | TextFormatFlags.Left | TextFormatFlags.EndEllipsis);
        }
    }

    /// <summary>Pole tekstowe w ciemnym motywie.</summary>
    public class SpireTextBox : Panel
    {
        public TextBox Box { get; private set; }

        public override string Text
        {
            get { return Box.Text; }
            set { Box.Text = value; }
        }

        public string Placeholder { get; set; }

        public SpireTextBox(string placeholder, bool password = false)
        {
            Placeholder = placeholder;
            Height = 38;
            BackColor = Color.Transparent;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint |
                     ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);

            Box = new TextBox
            {
                BorderStyle = BorderStyle.None,
                BackColor = Theme.Panel2,
                ForeColor = Theme.Text,
                Font = Theme.Font(10f),
                UseSystemPasswordChar = password
            };
            Box.GotFocus += (s, e) => Invalidate();
            Box.LostFocus += (s, e) => Invalidate();
            Box.TextChanged += (s, e) => OnTextChanged(EventArgs.Empty);
            Controls.Add(Box);
            Resize += (s, e) => LayoutBox();
        }

        private void LayoutBox()
        {
            Box.SetBounds(12, (Height - Box.PreferredHeight) / 2 + 1, Width - 24, Box.PreferredHeight);
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var rect = new Rectangle(0, 0, Width - 1, Height - 1);
            var focused = Box.Focused;
            Theme.FillRounded(g, Theme.Panel2, rect, 7);
            Theme.StrokeRounded(g, focused ? Theme.Accent : Theme.Border, rect, 7);
            if (string.IsNullOrEmpty(Box.Text) && !string.IsNullOrEmpty(Placeholder) && !focused)
            {
                TextRenderer.DrawText(g, Placeholder, Theme.Font(10f), new Rectangle(12, 0, Width - 24, Height),
                    Theme.Dim, TextFormatFlags.VerticalCenter | TextFormatFlags.Left);
            }
            LayoutBox();
        }
    }

    /// <summary>Etykieta z zawijaniem tekstu (bez przezroczystego tła).</summary>
    public class WrappedLabel : Label
    {
        public WrappedLabel()
        {
            AutoSize = false;
            BackColor = Color.Transparent;
        }
    }
}
