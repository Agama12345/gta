using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using ArcaneSpire.Core;
using ArcaneSpire.UI.Pages;

namespace ArcaneSpire.UI
{
    public interface IPage
    {
        void RefreshData();
    }

    /// <summary>Główne okno: lewa szyna nawigacji, pasek górny, strony i pasek stanu.</summary>
    public class MainForm : Form
    {
        public static MainForm Instance;

        public readonly DownloadManager Downloads = new DownloadManager();
        public string SelectedGameId = Store.RunyId;

        private Panel _rail;
        private Panel _topBar;
        private Panel _content;
        private Panel _statusBar;

        private Label _pageTitle;
        private Label _statusText;
        private Label _accountLabel;
        private Label _versionLabel;
        private Label _downloadBadge;

        private NavButton _navStore;
        private NavButton _navLibrary;
        private NavButton _navDownloads;
        private NavButton _navAccount;
        private NavButton _navSettings;

        private readonly Dictionary<string, UserControl> _pages = new Dictionary<string, UserControl>();
        private string _currentPage = "store";
        private readonly Dictionary<string, DateTime> _playing = new Dictionary<string, DateTime>();
        private System.Windows.Forms.Timer _clock;
        private bool _closing;

        public string CurrentPage { get { return _currentPage; } }
        public bool IsResizing { get; private set; }

        public MainForm()
        {
            Instance = this;
            AppPaths.EnsureDirectories();
            Store.LoadSettings();
            Store.LoadCatalog();
            Store.LoadAccounts();
            Store.RestoreSession();

            BuildShell();
            BuildPages();
            ShowPage(string.IsNullOrEmpty(Store.Settings.LastPage) ? "store" : Store.Settings.LastPage);

            AppPaths.Log("=== Arcane Spire " + Application.ProductVersion + " start (build " + BuildInfo.Sha + ") ===");
        }

        // ------------------------------------------------------------- układ
        private void BuildShell()
        {
            Text = "Arcane Spire";
            BackColor = Theme.Bg;
            ForeColor = Theme.Text;
            MinimumSize = new Size(1120, 720);
            ClientSize = new Size(1320, 840);
            StartPosition = FormStartPosition.CenterScreen;
            DoubleBuffered = true;
            Font = Theme.Body;
            try
            {
                var icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
                if (icon != null) Icon = icon;
            }
            catch { }

            RestoreWindowBounds();

            _rail = new Panel { BackColor = Theme.Rail };
            _topBar = new Panel { BackColor = Theme.Rail };
            _content = new Panel { BackColor = Theme.Bg };
            _statusBar = new Panel { BackColor = Color.FromArgb(19, 22, 29) };
            Controls.Add(_rail);
            Controls.Add(_topBar);
            Controls.Add(_content);
            Controls.Add(_statusBar);

            BuildRail();
            BuildTopBar();

            _statusText = new Label
            {
                Text = "Gotowe.",
                ForeColor = Theme.Muted,
                Font = Theme.Small,
                AutoEllipsis = true
            };
            _statusBar.Controls.Add(_statusText);

            _clock = new System.Windows.Forms.Timer { Interval = 500 };
            _clock.Tick += (s, e) => OnClock();
            _clock.Start();

            Resize += (s, e) => DoLayout();
            DoLayout();
        }

        private void RestoreWindowBounds()
        {
            try
            {
                var parts = (Store.Settings.WindowBounds ?? "").Split(',');
                if (parts.Length == 4)
                {
                    int x, y, w, h;
                    if (int.TryParse(parts[0], out x) && int.TryParse(parts[1], out y) &&
                        int.TryParse(parts[2], out w) && int.TryParse(parts[3], out h) && w > 900 && h > 600)
                    {
                        var bounds = new Rectangle(x, y, w, h);
                        var onScreen = Screen.AllScreens.Any(s2 => s2.WorkingArea.IntersectsWith(bounds));
                        if (onScreen)
                        {
                            StartPosition = FormStartPosition.Manual;
                            Bounds = bounds;
                        }
                    }
                }
            }
            catch { }
        }

        private void BuildRail()
        {
            var logo = new PictureBox
            {
                Image = Assets.Logo48,
                SizeMode = PictureBoxSizeMode.Zoom,
                Size = new Size(44, 44),
                Location = new Point(18, 20)
            };
            _rail.Controls.Add(logo);

            var title = new Label
            {
                Text = "ARCANE SPIRE",
                ForeColor = Theme.Text,
                Font = Theme.Font(11.5f, FontStyle.Bold),
                AutoSize = true,
                Location = new Point(72, 24)
            };
            _rail.Controls.Add(title);

            var subtitle = new Label
            {
                Text = "biblioteka gier",
                ForeColor = Theme.Dim,
                Font = Theme.Small,
                AutoSize = true,
                Location = new Point(73, 44)
            };
            _rail.Controls.Add(subtitle);

            _navStore = MakeNav("Sklep", "◆", 100);
            _navLibrary = MakeNav("Biblioteka", "▤", 146);
            _navDownloads = MakeNav("Pobierania", "↓", 192);
            _navAccount = MakeNav("Konto", "☺", 238);
            _navSettings = MakeNav("Ustawienia", "⚙", 284);

            _navStore.Click += (s, e) => ShowPage("store");
            _navLibrary.Click += (s, e) => ShowPage("library");
            _navDownloads.Click += (s, e) => ShowPage("downloads");
            _navAccount.Click += (s, e) => ShowPage("account");
            _navSettings.Click += (s, e) => ShowPage("settings");

            _downloadBadge = new Label
            {
                Text = "",
                ForeColor = Color.White,
                BackColor = Theme.Accent,
                Font = Theme.Font(7.5f, FontStyle.Bold),
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(58, 18),
                Visible = false
            };
            _rail.Controls.Add(_downloadBadge);

            _versionLabel = new Label
            {
                Text = "wersja " + Application.ProductVersion + "  ·  build " + BuildInfo.Sha,
                ForeColor = Theme.Dim,
                Font = Theme.Tiny,
                AutoSize = false,
                Size = new Size(200, 34),
                TextAlign = ContentAlignment.BottomLeft
            };
            _rail.Controls.Add(_versionLabel);
        }

        private NavButton MakeNav(string text, string glyph, int top)
        {
            var button = new NavButton(text, glyph)
            {
                Location = new Point(12, top),
                Width = 200
            };
            _rail.Controls.Add(button);
            return button;
        }

        private void BuildTopBar()
        {
            _pageTitle = new Label
            {
                Text = "Sklep",
                ForeColor = Theme.Text,
                Font = Theme.H1,
                AutoSize = true
            };
            _topBar.Controls.Add(_pageTitle);

            _accountLabel = new Label
            {
                Text = "Niezalogowany",
                ForeColor = Theme.Muted,
                Font = Theme.Small,
                TextAlign = ContentAlignment.MiddleRight,
                AutoSize = false,
                Size = new Size(220, 40)
            };
            _topBar.Controls.Add(_accountLabel);

            var check = new SpireButton
            {
                Text = "Sprawdź aktualizacje",
                Style = ButtonStyle.Ghost,
                Size = new Size(176, 34),
                Font = Theme.Font(8.75f, FontStyle.Bold)
            };
            check.Click += async (s, e) => await CheckEverythingAsync(true);
            check.Name = "btnCheckUpdates";
            _topBar.Controls.Add(check);

            var accountButton = new SpireButton
            {
                Text = "ZALOGUJ SIĘ",
                Style = ButtonStyle.Primary,
                Size = new Size(132, 34),
                Font = Theme.Font(8.75f, FontStyle.Bold)
            };
            accountButton.Name = "btnAccount";
            accountButton.Click += (s, e) =>
            {
                if (Store.Current == null) Dialogs.ShowLogin(this);
                else ShowPage("account");
            };
            _topBar.Controls.Add(accountButton);
        }

        private void BuildPages()
        {
            AddPage("store", new StorePage(this));
            AddPage("library", new LibraryPage(this));
            AddPage("downloads", new DownloadsPage(this));
            AddPage("account", new AccountPage(this));
            AddPage("settings", new SettingsPage(this));
        }

        private void AddPage(string key, UserControl page)
        {
            page.Dock = DockStyle.Fill;
            page.Visible = false;
            page.BackColor = Theme.Bg;
            _pages[key] = page;
            _content.Controls.Add(page);
        }

        private void DoLayout()
        {
            if (_rail == null) return;
            IsResizing = true;
            var width = ClientSize.Width;
            var height = ClientSize.Height;
            _rail.SetBounds(0, 0, 226, height);
            _topBar.SetBounds(226, 0, Math.Max(0, width - 226), 62);
            _statusBar.SetBounds(226, height - 26, Math.Max(0, width - 226), 26);
            _content.SetBounds(226, 62, Math.Max(0, width - 226), Math.Max(0, height - 88));

            if (_pageTitle != null) _pageTitle.Location = new Point(24, 14);
            if (_statusText != null) _statusText.SetBounds(14, 4, Math.Max(0, width - 260), 18);
            if (_versionLabel != null) _versionLabel.Location = new Point(18, height - 46);
            if (_downloadBadge != null) _downloadBadge.Location = new Point(160, 205);
            if (_accountLabel != null)
            {
                _accountLabel.SetBounds(width - 226 - 480, 12, 210, 40);
            }
            var check = _topBar.Controls["btnCheckUpdates"];
            if (check != null) check.Location = new Point(_topBar.Width - 336, 14);
            var account = _topBar.Controls["btnAccount"];
            if (account != null) account.Location = new Point(_topBar.Width - 148, 14);

            IsResizing = false;
        }

        // --------------------------------------------------------- nawigacja
        public void ShowPage(string key)
        {
            if (!_pages.ContainsKey(key)) key = "store";
            _currentPage = key;
            foreach (var pair in _pages) pair.Value.Visible = pair.Key == key;

            _navStore.Active = key == "store";
            _navLibrary.Active = key == "library";
            _navDownloads.Active = key == "downloads";
            _navAccount.Active = key == "account";
            _navSettings.Active = key == "settings";

            switch (key)
            {
                case "store": _pageTitle.Text = "Sklep"; break;
                case "library": _pageTitle.Text = "Biblioteka"; break;
                case "downloads": _pageTitle.Text = "Pobierania"; break;
                case "account": _pageTitle.Text = "Konto"; break;
                default: _pageTitle.Text = "Ustawienia"; break;
            }

            var page = _pages[key] as IPage;
            if (page != null) page.RefreshData();

            Store.Settings.LastPage = key;
            UpdateAccountChip();
        }

        public void RefreshAll()
        {
            foreach (var page in _pages.Values)
            {
                var refreshable = page as IPage;
                if (refreshable != null) refreshable.RefreshData();
            }
            UpdateAccountChip();
        }

        public void UpdateAccountChip()
        {
            if (Store.Current != null)
            {
                _accountLabel.Text = Store.Current.User + Environment.NewLine +
                                     Store.Current.Owned.Count + " gier w bibliotece";
                var button = _topBar.Controls["btnAccount"] as SpireButton;
                if (button != null)
                {
                    button.Text = Store.Current.User.ToUpperInvariant();
                    button.Style = ButtonStyle.Secondary;
                }
            }
            else
            {
                _accountLabel.Text = "Niezalogowany";
                var button = _topBar.Controls["btnAccount"] as SpireButton;
                if (button != null)
                {
                    button.Text = "ZALOGUJ SIĘ";
                    button.Style = ButtonStyle.Primary;
                }
            }
            _accountLabel.Visible = false;
        }

        public void SetStatus(string text)
        {
            if (_statusText == null) return;
            if (_statusText.InvokeRequired)
            {
                _statusText.BeginInvoke((MethodInvoker)(() => SetStatus(text)));
                return;
            }
            _statusText.Text = text;
        }

        // -------------------------------------------------------- akcje gier
        public void OpenGame(string gameId)
        {
            SelectedGameId = gameId;
            ShowPage("library");
            var library = _pages["library"] as LibraryPage;
            if (library != null) library.SelectGame(gameId);
        }

        public async void InstallGame(GameInfo game)
        {
            if (game == null) return;
            if (Store.Current == null)
            {
                SetStatus("Do instalacji potrzebne jest konto.");
                if (!Dialogs.ShowLogin(this)) return;
            }

            Store.Grant(game.Id);

            string sha = null;
            if (game.HasRepo)
            {
                SetStatus("Sprawdzanie wersji " + game.Name + "…");
                sha = await Task.Run(() => GitHub.GetLatestShaAsync(game.Repo, game.Branch));
                if (sha == null)
                {
                    SetStatus("Brak połączenia z GitHubem — spróbuj ponownie.");
                    if (MessageBox.Show(this,
                            "Nie udało się odczytać wersji z GitHuba.\nZainstalować mimo to ostatnią paczkę gałęzi " +
                            game.Branch + "?",
                            "Arcane Spire", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
                        return;
                }
            }

            Downloads.Enqueue(game, sha);
            ShowPage("downloads");
            SetStatus("Dodano do pobierania: " + game.Name);
        }

        public void PlayGame(GameInfo game)
        {
            if (game == null) return;
            try
            {
                string message;
                var process = GameRunner.Launch(game, out message);
                SetStatus(message);
                _playing[game.Id] = DateTime.Now;
                if (Store.Current != null) UpdateAccountChip();
                if (process != null)
                {
                    process.EnableRaisingEvents = true;
                    process.Exited += (s, e) =>
                    {
                        DateTime started;
                        if (_playing.TryGetValue(game.Id, out started))
                        {
                            Store.AddPlaytime(game.Id, DateTime.Now - started);
                            _playing.Remove(game.Id);
                        }
                        try { BeginInvoke((MethodInvoker)(() => RefreshAll())); }
                        catch { }
                    };
                }
            }
            catch (Exception ex)
            {
                AppPaths.Log(ex, "PlayGame " + game.Id);
                MessageBox.Show(this, "Nie udało się uruchomić gry:\n" + ex.Message,
                    "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        public void UninstallGame(GameInfo game)
        {
            if (game == null) return;
            if (MessageBox.Show(this, "Odinstalować grę \"" + game.Name + "\"?\nZapisy w chmurze nie istnieją — " +
                                      "stan gry trzymany jest w przeglądarce i zostanie zachowany.",
                    "Odinstalowanie", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes) return;

            AppPaths.TryDelete(AppPaths.GameDir(game.Id));
            SetStatus("Odinstalowano: " + game.Name);
            RefreshAll();
        }

        // ------------------------------------------------------ aktualizacje
        public async Task CheckEverythingAsync(bool interactive)
        {
            if (interactive) SetStatus("Sprawdzanie aktualizacji…");

            foreach (var game in Store.Catalog)
            {
                if (!game.HasRepo) continue;
                if (!Store.IsInstalled(game)) continue;
                var state = Store.GetState(game.Id);
                var sha = await Task.Run(() => GitHub.GetLatestShaAsync(game.Repo, game.Branch));
                if (sha == null) continue;
                if (!string.Equals(state.Sha, sha, StringComparison.OrdinalIgnoreCase))
                {
                    SetStatus("Nowa wersja " + game.Name + " — pobieram.");
                    Downloads.Enqueue(game, sha);
                }
            }

            var update = await SelfUpdate.CheckAsync();
            if (update.Available)
            {
                if (interactive || Store.Settings.AutoUpdate)
                {
                    SetStatus("Nowa wersja launchera — pobieram.");
                    try
                    {
                        var file = await SelfUpdate.DownloadAsync(update, null);
                        if (MessageBox.Show(this,
                                "Pobrano nową wersję launchera.\nZamknąć i uruchomić ponownie teraz?",
                                "Arcane Spire", MessageBoxButtons.YesNo, MessageBoxIcon.Information) == DialogResult.Yes)
                        {
                            if (SelfUpdate.ScheduleApply(file))
                            {
                                _closing = true;
                                Close();
                                return;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        AppPaths.Log(ex, "SelfUpdate download");
                        SetStatus("Aktualizacja launchera nie udała się: " + ex.Message);
                    }
                }
            }
            else if (interactive)
            {
                SetStatus("Wszystko aktualne. Launcher: build " + BuildInfo.Sha);
            }

            RefreshAll();
        }

        private void OnClock()
        {
            var jobs = Downloads.Jobs;
            var active = 0;
            DownloadJob current = null;
            foreach (var job in jobs)
            {
                if (job.Finished || job.Cancelled || job.Failed) continue;
                active++;
                if (current == null) current = job;
            }

            if (active > 0)
            {
                _downloadBadge.Visible = true;
                _downloadBadge.Text = "↓ " + active;
                if (_currentPage != "downloads" && current != null)
                {
                    SetStatus(current.GameName + ": " + current.Status + " " + current.Progress.ToString("P0"));
                }
            }
            else
            {
                _downloadBadge.Visible = false;
            }

            var page = _pages.ContainsKey(_currentPage) ? _pages[_currentPage] as DownloadsPage : null;
            if (page != null) page.Tick();
        }

        // ---------------------------------------------------------- zamykanie
        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            try
            {
                Store.Settings.WindowBounds = Bounds.X + "," + Bounds.Y + "," + Bounds.Width + "," + Bounds.Height;
                if (WindowState == FormWindowState.Normal) Store.Settings.LastPage = _currentPage;
                Store.SaveSettings();

                foreach (var pair in _playing)
                {
                    Store.AddPlaytime(pair.Key, DateTime.Now - pair.Value);
                }
                Store.SaveAccounts();
                if (!_closing) LocalServer.StopAll();
            }
            catch (Exception ex) { AppPaths.Log(ex, "OnFormClosing"); }
            base.OnFormClosing(e);
        }

        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            BeginInvoke((MethodInvoker)(async () =>
            {
                if (Store.Settings.AutoUpdate) await CheckEverythingAsync(false);
                else if (Store.Current == null) SetStatus("Witaj w Arcane Spire. Zarejestruj konto, aby korzystać ze sklepu.");
            }));
        }
    }
}
