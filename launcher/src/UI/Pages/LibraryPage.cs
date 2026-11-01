using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI.Pages
{
    /// <summary>Biblioteka: lista gier po lewej, karta gry po prawej — z instalacją jak w Steamie.</summary>
    public class LibraryPage : UserControl, IPage
    {
        private readonly MainForm _main;
        private readonly ListBox _list;
        private readonly Panel _detail;
        private readonly Label _empty;
        private readonly SpireTextBox _search;

        private CoverArt _banner;
        private Label _name;
        private Label _tagline;
        private Label _meta;
        private Label _description;
        private Label _stats;
        private Label _progressText;
        private ProgressStrip _progress;
        private SpireButton _primary;
        private SpireButton _update;
        private SpireButton _folder;
        private SpireButton _uninstall;
        private SpireButton _props;
        private LinkLabel _storeLink;

        private GameInfo _selected;

        public LibraryPage(MainForm main)
        {
            _main = main;
            Dock = DockStyle.Fill;
            BackColor = Theme.Bg;
            Padding = new Padding(28, 18, 28, 18);

            _search = new SpireTextBox("Szukaj w bibliotece…")
            {
                Location = new Point(0, 0),
                Width = 300
            };
            Controls.Add(_search);
            _search.Box.TextChanged += (s, e) => Reload();

            _list = new ListBox
            {
                Location = new Point(0, 48),
                Width = 300,
                BackColor = Theme.Panel,
                ForeColor = Theme.Text,
                BorderStyle = BorderStyle.None,
                DrawMode = DrawMode.OwnerDrawFixed,
                ItemHeight = 58,
                Font = Theme.Body
            };
            _list.DrawItem += DrawListItem;
            _list.SelectedIndexChanged += (s, e) => ShowSelected();
            Controls.Add(_list);

            _empty = new Label
            {
                Text = "Twoja biblioteka jest pusta.\nWejdź do sklepu i kliknij „Dodaj do biblioteki”.",
                ForeColor = Theme.Dim,
                Font = Theme.Font(10f),
                Size = new Size(300, 60),
                Visible = false
            };
            Controls.Add(_empty);

            _detail = new Panel { BackColor = Theme.Bg, AutoScroll = true };
            Controls.Add(_detail);

            BuildDetail();
            Resize += (s, e) => DoLayout();
            DoLayout();
        }

        private void BuildDetail()
        {
            _banner = new CoverArt("RP", "#A86BF0", "", "") { CornerRadius = 12 };
            _detail.Controls.Add(_banner);

            _name = new Label { ForeColor = Theme.Text, Font = Theme.Font(19f, FontStyle.Bold), AutoEllipsis = true };
            _detail.Controls.Add(_name);

            _tagline = new Label { ForeColor = Theme.Lighten(Theme.Accent, 0.25), Font = Theme.Font(10f) };
            _detail.Controls.Add(_tagline);

            _meta = new Label { ForeColor = Theme.Dim, Font = Theme.Small };
            _detail.Controls.Add(_meta);

            _description = new Label { ForeColor = Theme.Muted, Font = Theme.Body };
            _detail.Controls.Add(_description);

            _stats = new Label { ForeColor = Theme.Dim, Font = Theme.Mono };
            _detail.Controls.Add(_stats);

            _progressText = new Label { ForeColor = Theme.Muted, Font = Theme.Small, Visible = false };
            _detail.Controls.Add(_progressText);

            _progress = new ProgressStrip { Visible = false, Height = 8 };
            _detail.Controls.Add(_progress);

            _primary = new SpireButton { Radius = 8, Font = Theme.Font(11f, FontStyle.Bold) };
            _primary.Click += (s, e) => PrimaryAction();
            _detail.Controls.Add(_primary);

            _update = new SpireButton { Text = "AKTUALIZUJ", Style = ButtonStyle.Secondary, Radius = 8 };
            _update.Click += (s, e) => _main.InstallGame(_selected);
            _detail.Controls.Add(_update);

            _folder = new SpireButton { Text = "PLIKI LOKALNE", Style = ButtonStyle.Ghost, Radius = 8 };
            _folder.Click += (s, e) =>
            {
                if (_selected == null) return;
                AppPaths.OpenInExplorer(AppPaths.GameDir(_selected.Id));
            };
            _detail.Controls.Add(_folder);

            _uninstall = new SpireButton { Text = "ODINSTALUJ", Style = ButtonStyle.Ghost, Radius = 8 };
            _uninstall.Click += (s, e) => _main.UninstallGame(_selected);
            _detail.Controls.Add(_uninstall);

            _props = new SpireButton { Text = "WŁAŚCIWOŚCI", Style = ButtonStyle.Ghost, Radius = 8 };
            _props.Click += (s, e) =>
            {
                if (_selected == null) return;
                Dialogs.ShowGameProperties(_main, _selected);
                RefreshData();
            };
            _detail.Controls.Add(_props);

            _storeLink = new LinkLabel
            {
                Text = "Zobacz w sklepie ›",
                LinkColor = Theme.Accent,
                LinkBehavior = LinkBehavior.HoverUnderline,
                Font = Theme.Small,
                AutoSize = true
            };
            _storeLink.LinkClicked += (s, e) => _main.ShowPage("store");
            _detail.Controls.Add(_storeLink);
        }

        private void DoLayout()
        {
            var leftWidth = 320;
            _search.SetBounds(0, 0, leftWidth, 38);
            _list.SetBounds(0, 48, leftWidth, Math.Max(80, Height - Padding.Bottom - 48));
            _empty.SetBounds(10, 60, leftWidth - 20, 60);
            _detail.SetBounds(leftWidth + 24, 0, Math.Max(200, Width - leftWidth - 24), Height - Padding.Bottom);
            LayoutDetail();
        }

        private void LayoutDetail()
        {
            if (_selected == null || _banner == null) return;
            var width = Math.Max(280, _detail.Width - 28);
            var y = 0;
            _banner.SetBounds(0, y, width, 200);
            y += 214;
            _name.SetBounds(0, y, width, 32);
            y += 34;
            _tagline.SetBounds(0, y, width, 22);
            y += 26;
            _meta.SetBounds(0, y, width, 18);
            y += 24;
            _description.SetBounds(0, y, width, 128);
            y += 134;
            _stats.SetBounds(0, y, width, 40);
            y += 46;

            var busyJob = FindJob(_selected.Id);
            if (busyJob != null)
            {
                _progressText.Visible = true;
                _progress.Visible = true;
                _progressText.SetBounds(0, y, width, 18);
                y += 20;
                _progress.SetBounds(0, y, width, 8);
                y += 16;
                _progressText.Text = busyJob.Status + "  ·  " + busyJob.SizeText + "  " + busyJob.SpeedText + "  " + busyJob.EtaText;
                _progress.Value = busyJob.Progress;
            }
            else
            {
                _progressText.Visible = false;
                _progress.Visible = false;
            }

            y += 6;
            _primary.SetBounds(0, y, 210, 50);
            _primary.Visible = true;
            _update.SetBounds(220, y, 140, 50);
            y += 60;
            _folder.SetBounds(0, y, 140, 38);
            _uninstall.SetBounds(148, y, 130, 38);
            _props.SetBounds(286, y, 140, 38);
            _storeLink.Location = new Point(0, y + 52);
        }

        private DownloadJob FindJob(string gameId)
        {
            foreach (var job in _main.Downloads.Jobs)
            {
                if (job.GameId != gameId) continue;
                if (job.Finished || job.Cancelled || job.Failed) continue;
                return job;
            }
            return null;
        }

        private void PrimaryAction()
        {
            if (_selected == null) return;
            if (Store.IsInstalled(_selected)) _main.PlayGame(_selected);
            else _main.InstallGame(_selected);
        }

        private void Reload()
        {
            var filter = (_search.Text ?? "").Trim();
            _list.Items.Clear();
            foreach (var game in Store.Catalog)
            {
                if (Store.Current == null) continue;
                if (!Store.IsOwned(game)) continue;
                if (filter.Length > 0 && game.Name.IndexOf(filter, StringComparison.OrdinalIgnoreCase) < 0) continue;
                _list.Items.Add(game);
            }
            _empty.Visible = _list.Items.Count == 0;
            if (_list.Items.Count > 0)
            {
                var index = 0;
                for (var i = 0; i < _list.Items.Count; i++)
                {
                    var game = _list.Items[i] as GameInfo;
                    if (game != null && game.Id == _main.SelectedGameId) { index = i; break; }
                }
                _list.SelectedIndex = index;
            }
            else
            {
                _selected = null;
                ShowSelected();
            }
        }

        public void SelectGame(string gameId)
        {
            _main.SelectedGameId = gameId;
            for (var i = 0; i < _list.Items.Count; i++)
            {
                var game = _list.Items[i] as GameInfo;
                if (game != null && game.Id == gameId)
                {
                    _list.SelectedIndex = i;
                    return;
                }
            }
            Reload();
        }

        private void ShowSelected()
        {
            if (_list.SelectedItem == null)
            {
                _selected = null;
                _banner.Visible = false;
                _name.Text = "";
                _tagline.Text = "";
                _meta.Text = "";
                _description.Text = "";
                _stats.Text = "";
                _primary.Visible = false;
                _update.Visible = false;
                _folder.Visible = false;
                _uninstall.Visible = false;
                _props.Visible = false;
                _storeLink.Visible = false;
                return;
            }

            _selected = _list.SelectedItem as GameInfo;
            if (_selected == null) return;
            _main.SelectedGameId = _selected.Id;

            _banner.Visible = true;
            _primary.Visible = true;
            _update.Visible = true;
            _folder.Visible = true;
            _uninstall.Visible = true;
            _props.Visible = true;
            _storeLink.Visible = true;

            // okładka
            _detail.Controls.Remove(_banner);
            _banner.Dispose();
            _banner = new CoverArt(_selected.Emblem, _selected.Accent, "", "") { CornerRadius = 12 };
            _detail.Controls.Add(_banner);

            _name.Text = _selected.Name;
            _tagline.Text = _selected.Tagline;
            _meta.Text = _selected.Genre + "  ·  " + _selected.Developer + "  ·  " + _selected.Price;
            _description.Text = _selected.Description;

            var state = Store.GetState(_selected.Id);
            var installed = Store.IsInstalled(_selected);
            var lines = new List<string>();
            lines.Add(installed ? "Status: zainstalowana" : "Status: nie zainstalowana");
            if (!string.IsNullOrEmpty(state.Version)) lines.Add("Wersja: " + state.Version);
            if (!string.IsNullOrEmpty(state.Sha))
                lines.Add("Commit: " + state.Sha.Substring(0, Math.Min(7, state.Sha.Length)));
            if (state.Size > 0) lines.Add("Rozmiar: " + AppPaths.FormatBytes(state.Size));
            var playtime = Store.PlaytimeText(_selected.Id);
            if (!string.IsNullOrEmpty(playtime)) lines.Add("Czas gry: " + playtime);
            if (!string.IsNullOrEmpty(state.Updated))
            {
                DateTime when;
                if (DateTime.TryParse(state.Updated, out when))
                    lines.Add("Zainstalowana: " + when.ToString("yyyy-MM-dd HH:mm"));
            }
            _stats.Text = string.Join("   ·   ", lines.ToArray());

            if (installed)
            {
                _primary.Text = "GRAJ";
                _primary.Style = ButtonStyle.Success;
            }
            else
            {
                _primary.Text = _selected.Kind == "file" ? "Pobierz" : "ZAINSTALUJ";
                _primary.Style = ButtonStyle.Primary;
            }
            _update.Enabled = _selected.HasRepo;
            LayoutDetail();
        }

        private void DrawListItem(object sender, DrawItemEventArgs e)
        {
            if (e.Index < 0) return;
            var game = _list.Items[e.Index] as GameInfo;
            if (game == null) return;

            var g = e.Graphics;
            Theme.EnableSmoothing(g);
            var selected = (e.State & DrawItemState.Selected) == DrawItemState.Selected;
            var rect = new Rectangle(0, e.Bounds.Y, _list.ClientSize.Width - 1, e.Bounds.Height - 1);

            using (var brush = new SolidBrush(selected ? Theme.Panel2 : Theme.Panel))
            {
                g.FillRectangle(brush, rect);
            }
            if (selected)
            {
                using (var pen = new Pen(Theme.Accent, 2f))
                {
                    g.DrawRectangle(pen, new Rectangle(rect.X + 1, rect.Y + 1, rect.Width - 2, rect.Height - 2));
                }
            }

            var accent = Theme.ParseColor(game.Accent, Theme.Accent);
            var thumbRect = new Rectangle(rect.X + 8, rect.Y + 8, rect.Height - 16, rect.Height - 16);
            Theme.FillRounded(g, Theme.Darken(accent, 0.45), thumbRect, 6);
            TextRenderer.DrawText(g, game.Emblem ?? "", Theme.Font(10f, FontStyle.Bold), thumbRect, Color.White,
                TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter);

            TextRenderer.DrawText(g, game.Name, Theme.Font(9.75f, FontStyle.Bold),
                new Rectangle(thumbRect.Right + 10, rect.Y + 10, rect.Width - thumbRect.Width - 30, 20),
                Theme.Text, TextFormatFlags.Left | TextFormatFlags.EndEllipsis);

            var installed = Store.IsInstalled(game);
            TextRenderer.DrawText(g, installed ? "zainstalowana" : "nie zainstalowana", Theme.Tiny,
                new Rectangle(thumbRect.Right + 10, rect.Y + 30, rect.Width - thumbRect.Width - 30, 16),
                installed ? Theme.Good : Theme.Dim, TextFormatFlags.Left);
        }

        public void RefreshData()
        {
            DoLayout();
            Reload();
        }

        public void Tick()
        {
            if (_selected != null) LayoutDetail();
        }
    }
}
