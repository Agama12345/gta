using System;
using System.Drawing;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI.Pages
{
    /// <summary>Kolejka pobrań z postępem, prędkością i pozostałym czasem.</summary>
    public class DownloadsPage : UserControl, IPage
    {
        private readonly MainForm _main;
        private readonly ListBox _list;
        private readonly Label _empty;
        private readonly SpireButton _cancel;
        private readonly SpireButton _clear;
        private readonly SpireButton _folder;
        private readonly Label _summary;
        private string _signature = "";

        public DownloadsPage(MainForm main)
        {
            _main = main;
            Dock = DockStyle.Fill;
            BackColor = Theme.Bg;
            Padding = new Padding(28, 18, 28, 18);

            _summary = new Label
            {
                Text = "",
                ForeColor = Theme.Muted,
                Font = Theme.Body,
                AutoSize = true,
                Location = new Point(0, 2)
            };
            Controls.Add(_summary);

            _list = new ListBox
            {
                DrawMode = DrawMode.OwnerDrawFixed,
                ItemHeight = 74,
                BorderStyle = BorderStyle.None,
                BackColor = Theme.Bg,
                ForeColor = Theme.Text,
                IntegralHeight = false
            };
            _list.DrawItem += DrawJob;
            Controls.Add(_list);

            _empty = new Label
            {
                Text = "Brak pobrań.\nZainstaluj coś ze sklepu — pojawi się tutaj, tak jak w Steamie.",
                ForeColor = Theme.Dim,
                Font = Theme.Font(10f),
                Size = new Size(460, 60)
            };
            Controls.Add(_empty);

            _cancel = new SpireButton { Text = "ANULUJ", Style = ButtonStyle.Ghost, Size = new Size(120, 38) };
            _cancel.Click += (s, e) =>
            {
                var job = _list.SelectedItem as DownloadJob;
                if (job != null) _main.Downloads.Cancel(job);
            };
            Controls.Add(_cancel);

            _clear = new SpireButton { Text = "WYCZYŚĆ UKOŃCZONE", Style = ButtonStyle.Ghost, Size = new Size(190, 38) };
            _clear.Click += (s, e) => { _main.Downloads.ClearFinished(); RefreshData(); };
            Controls.Add(_clear);

            _folder = new SpireButton { Text = "FOLDER GIER", Style = ButtonStyle.Ghost, Size = new Size(150, 38) };
            _folder.Click += (s, e) => AppPaths.OpenInExplorer(AppPaths.GamesDir);
            Controls.Add(_folder);

            Resize += (s, e) => DoLayout();
            DoLayout();
        }

        private void DoLayout()
        {
            var width = Math.Max(300, Width - Padding.Horizontal);
            _list.SetBounds(0, 34, width, Math.Max(80, Height - 130));
            _empty.SetBounds(10, 44, Math.Min(500, width), 60);
            _cancel.Location = new Point(0, Height - 62);
            _clear.Location = new Point(128, Height - 62);
            _folder.Location = new Point(326, Height - 62);
        }

        public void RefreshData()
        {
            DoLayout();
            var jobs = _main.Downloads.Jobs;
            var previous = _list.SelectedIndex;
            _list.BeginUpdate();
            _list.Items.Clear();
            foreach (var job in jobs) _list.Items.Add(job);
            _list.EndUpdate();
            if (previous >= 0 && previous < _list.Items.Count) _list.SelectedIndex = previous;
            _empty.Visible = _list.Items.Count == 0;

            var active = 0;
            foreach (var job in jobs)
            {
                if (!job.Finished && !job.Cancelled && !job.Failed) active++;
            }
            _summary.Text = active > 0
                ? "Pobierane: " + active + "  ·  kolejka obsługiwana po kolei"
                : jobs.Count == 0 ? "Brak pobrań." : "Wszystkie pobrania zakończone.";
            _signature = Signature();
        }

        private string Signature()
        {
            var text = "";
            foreach (var job in _main.Downloads.Jobs)
            {
                text += job.GameId + ":" + job.Status + ":" + (int)(job.Progress * 100) + ":" + job.SizeText + ";";
            }
            return text;
        }

        public void Tick()
        {
            var signature = Signature();
            if (signature != _signature)
            {
                RefreshData();
                _list.Invalidate();
            }
        }

        private void DrawJob(object sender, DrawItemEventArgs e)
        {
            if (e.Index < 0 || e.Index >= _list.Items.Count) return;
            var job = _list.Items[e.Index] as DownloadJob;
            if (job == null) return;

            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var selected = (e.State & DrawItemState.Selected) == DrawItemState.Selected;
            var rect = new Rectangle(0, e.Bounds.Y, _list.ClientSize.Width - 1, e.Bounds.Height - 3);

            Theme.FillRounded(g, selected ? Theme.Panel2 : Theme.Panel, rect, 8);
            Theme.StrokeRounded(g, selected ? Theme.Accent : Theme.Border, rect, 8);

            var game = Store.FindGame(job.GameId);
            var accent = Theme.ParseColor(game != null ? game.Accent : "#A86BF0", Theme.Accent);
            Theme.FillRounded(g, Theme.Darken(accent, 0.4),
                new Rectangle(rect.X + 10, rect.Y + 12, 46, 46), 6);
            TextRenderer.DrawText(g, game != null ? game.Emblem : "?", Theme.Font(10f, FontStyle.Bold),
                new Rectangle(rect.X + 10, rect.Y + 12, 46, 46), Color.White,
                TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter);

            TextRenderer.DrawText(g, job.GameName, Theme.Font(10f, FontStyle.Bold),
                new Rectangle(rect.X + 68, rect.Y + 10, rect.Width - 200, 20), Theme.Text,
                TextFormatFlags.Left | TextFormatFlags.EndEllipsis);

            var color = job.Failed ? Theme.Bad : job.Finished ? Theme.Good : job.Cancelled ? Theme.Dim : Theme.Muted;
            TextRenderer.DrawText(g, job.Status, Theme.Small,
                new Rectangle(rect.X + 68, rect.Y + 30, rect.Width - 200, 18), color, TextFormatFlags.Left);

            TextRenderer.DrawText(g, job.SizeText + "   " + job.SpeedText + "   " + job.EtaText, Theme.Tiny,
                new Rectangle(rect.X + 68, rect.Y + 46, rect.Width - 90, 16), Theme.Dim, TextFormatFlags.Left);

            var barRect = new Rectangle(rect.X + 68, rect.Bottom - 12, rect.Width - 84, 6);
            Theme.FillRounded(g, Theme.Panel3, barRect, 3);
            var filled = (int)(barRect.Width * Math.Max(0, Math.Min(1, job.Progress)));
            if (filled > 2)
            {
                Theme.FillRounded(g, job.Failed ? Theme.Bad : job.Finished ? Theme.Good : Theme.Accent,
                    new Rectangle(barRect.X, barRect.Y, filled, barRect.Height), 3);
            }
            else if (!job.Finished && !job.Cancelled && !job.Failed)
            {
                Theme.FillRounded(g, Theme.Accent, new Rectangle(barRect.X, barRect.Y, 40, barRect.Height), 3);
            }

            TextRenderer.DrawText(g, (job.Progress * 100).ToString("0") + "%", Theme.Tiny,
                new Rectangle(rect.Right - 60, rect.Y + 10, 50, 18), Theme.Muted,
                TextFormatFlags.Right);
        }
    }
}
