using System;
using System.Drawing;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI.Pages
{
    /// <summary>Sklep: kafelki gier, ceny, przycisk instalacji jak w Steamie.</summary>
    public class StorePage : UserControl, IPage
    {
        private readonly MainForm _main;
        private readonly FlowLayoutPanel _grid;
        private readonly Label _hint;
        private readonly Label _subtitle;

        public StorePage(MainForm main)
        {
            _main = main;
            Dock = DockStyle.Fill;
            BackColor = Theme.Bg;
            Padding = new Padding(28, 18, 28, 18);

            _subtitle = new Label
            {
                Text = "Polecane dla Ciebie  ·  wszystko darmowe, instalacja jednym kliknięciem",
                ForeColor = Theme.Muted,
                Font = Theme.Body,
                AutoSize = true,
                Location = new Point(2, 2)
            };
            Controls.Add(_subtitle);

            _hint = new Label
            {
                Text = "",
                ForeColor = Theme.Dim,
                Font = Theme.Small,
                AutoSize = true,
                Location = new Point(2, 30)
            };
            Controls.Add(_hint);

            _grid = new FlowLayoutPanel
            {
                Location = new Point(0, 56),
                AutoScroll = true,
                FlowDirection = FlowDirection.LeftToRight,
                WrapContents = true,
                BackColor = Theme.Bg,
                Padding = new Padding(0)
            };
            Controls.Add(_grid);

            Resize += (s, e) => LayoutChildren();
            BuildTiles();
            LayoutChildren();
        }

        private void LayoutChildren()
        {
            _grid.SetBounds(0, 56, Math.Max(200, Width - Padding.Horizontal), Math.Max(100, Height - 74));
        }

        private void BuildTiles()
        {
            _grid.Controls.Clear();
            foreach (var game in Store.Catalog)
            {
                _grid.Controls.Add(BuildTile(game));
            }
        }

        private Control BuildTile(GameInfo game)
        {
            var card = new RoundPanel
            {
                Size = new Size(322, 428),
                Margin = new Padding(0, 0, 18, 18),
                Radius = 12,
                FillColor = Theme.Panel,
                BorderColor = Theme.Border
            };

            var cover = new CoverArt(game.Emblem, game.Accent, "", "")
            {
                Bounds = new Rectangle(12, 12, 298, 186),
                CornerRadius = 9
            };
            card.Controls.Add(cover);

            var name = new Label
            {
                Text = game.Name,
                ForeColor = Theme.Text,
                Font = Theme.Font(13f, FontStyle.Bold),
                AutoEllipsis = true,
                Bounds = new Rectangle(14, 208, 294, 26)
            };
            card.Controls.Add(name);

            var tagline = new Label
            {
                Text = game.Tagline,
                ForeColor = Theme.Muted,
                Font = Theme.Small,
                Bounds = new Rectangle(14, 234, 294, 34)
            };
            card.Controls.Add(tagline);

            var meta = new Label
            {
                Text = game.Genre + "  ·  " + game.Developer,
                ForeColor = Theme.Dim,
                Font = Theme.Tiny,
                Bounds = new Rectangle(14, 270, 294, 18)
            };
            card.Controls.Add(meta);

            var price = new Label
            {
                Text = game.Price,
                ForeColor = Theme.Gold,
                Font = Theme.Font(11f, FontStyle.Bold),
                Bounds = new Rectangle(14, 292, 294, 24)
            };
            card.Controls.Add(price);

            var state = Store.GetState(game.Id);
            var installed = Store.IsInstalled(game);
            var owned = Store.IsOwned(game);

            var info = new Label
            {
                ForeColor = installed ? Theme.Good : owned ? Theme.Muted : Theme.Dim,
                Font = Theme.Tiny,
                Bounds = new Rectangle(14, 318, 294, 18),
                Text = installed
                    ? "Zainstalowana" + (string.IsNullOrEmpty(state.Version) ? "" : " · v" + state.Version)
                    : owned ? "W bibliotece" : "Nie posiadasz"
            };
            card.Controls.Add(info);

            var action = new SpireButton
            {
                Bounds = new Rectangle(12, 342, 298, 44),
                Radius = 8
            };
            if (installed)
            {
                action.Text = "GRAJ";
                action.Style = ButtonStyle.Success;
                action.Click += (s, e) => _main.PlayGame(game);
            }
            else if (owned)
            {
                action.Text = "ZAINSTALUJ";
                action.Style = ButtonStyle.Primary;
                action.Click += (s, e) => _main.InstallGame(game);
            }
            else
            {
                action.Text = "DODAJ DO BIBLIOTEKI";
                action.Style = ButtonStyle.Primary;
                action.Click += (s, e) =>
                {
                    if (Store.Current == null)
                    {
                        if (!Dialogs.ShowLogin(_main)) return;
                    }
                    Store.Grant(game.Id);
                    _main.SetStatus("Dodano do biblioteki: " + game.Name);
                    _main.InstallGame(game);
                };
            }
            card.Controls.Add(action);

            var details = new LinkLabel
            {
                Text = "Więcej o grze ›",
                LinkColor = Theme.Accent,
                ActiveLinkColor = Theme.Lighten(Theme.Accent, 0.3),
                VisitedLinkColor = Theme.Accent,
                Font = Theme.Small,
                LinkBehavior = LinkBehavior.HoverUnderline,
                Bounds = new Rectangle(14, 392, 200, 20)
            };
            details.LinkClicked += (s, e) => _main.OpenGame(game.Id);
            card.Controls.Add(details);

            return card;
        }

        public void RefreshData()
        {
            BuildTiles();
            if (Store.Current == null)
            {
                _hint.Text = "Nie jesteś zalogowany — możesz przeglądać sklep, ale instalacja wymaga konta.";
                _hint.ForeColor = Theme.Warn;
            }
            else
            {
                _hint.Text = "Zalogowany jako " + Store.Current.User + "  ·  gier w bibliotece: " +
                             Store.Current.Owned.Count;
                _hint.ForeColor = Theme.Dim;
            }
            LayoutChildren();
        }
    }
}
