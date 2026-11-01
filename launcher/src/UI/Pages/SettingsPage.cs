using System;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI.Pages
{
    /// <summary>Ustawienia: aktualizacje, autostart, foldery, informacje o wersji.</summary>
    public class SettingsPage : UserControl, IPage
    {
        private readonly MainForm _main;
        private readonly CheckBox _autoUpdate;
        private readonly CheckBox _startWithWindows;
        private readonly CheckBox _closeBrowser;
        private readonly Label _paths;
        private readonly Label _version;
        private readonly SpireButton _checkLauncher;

        public SettingsPage(MainForm main)
        {
            _main = main;
            Dock = DockStyle.Fill;
            BackColor = Theme.Bg;
            Padding = new Padding(28, 18, 28, 18);

            var header = new Label
            {
                Text = "Ustawienia",
                ForeColor = Theme.Text,
                Font = Theme.H1,
                AutoSize = true,
                Location = new Point(0, 0)
            };
            Controls.Add(header);

            var card = new RoundPanel
            {
                Location = new Point(0, 50),
                Size = new Size(620, 240),
                Radius = 12,
                FillColor = Theme.Panel,
                BorderColor = Theme.Border
            };
            Controls.Add(card);

            _autoUpdate = MakeCheck("Automatycznie aktualizuj gry i launcher", 18);
            card.Controls.Add(_autoUpdate);
            _autoUpdate.CheckedChanged += (s, e) =>
            {
                Store.Settings.AutoUpdate = _autoUpdate.Checked;
                Store.SaveSettings();
            };

            _startWithWindows = MakeCheck("Uruchamiaj Arcane Spire razem z Windows", 62);
            card.Controls.Add(_startWithWindows);
            _startWithWindows.CheckedChanged += (s, e) =>
            {
                Store.Settings.StartWithWindows = _startWithWindows.Checked;
                Store.SaveSettings();
                SelfUpdate.SetStartWithWindows(_startWithWindows.Checked);
            };

            _closeBrowser = MakeCheck("Zamykaj okno gry przy zamykaniu launchera", 106);
            card.Controls.Add(_closeBrowser);
            _closeBrowser.CheckedChanged += (s, e) =>
            {
                Store.Settings.CloseBrowserOnExit = _closeBrowser.Checked;
                Store.SaveSettings();
            };

            var install = new SpireButton
            {
                Text = "ZAINSTALUJ LAUNCHER W SYSTEMIE",
                Style = ButtonStyle.Primary,
                Size = new Size(280, 40),
                Location = new Point(18, 154)
            };
            install.Click += (s, e) =>
            {
                string message;
                if (SelfUpdate.InstallToSystem(out message))
                {
                    MessageBox.Show(this, message + "\n\nSkróty: pulpit i menu Start.\n" +
                        "Od teraz launcher może się sam aktualizować.",
                        "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                else
                {
                    MessageBox.Show(this, message, "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            };
            card.Controls.Add(install);

            var openData = new SpireButton
            {
                Text = "OTWÓRZ FOLDER DANYCH",
                Style = ButtonStyle.Ghost,
                Size = new Size(220, 40),
                Location = new Point(310, 154)
            };
            openData.Click += (s, e) => AppPaths.OpenInExplorer(AppPaths.DataDir);
            card.Controls.Add(openData);

            var openLog = new SpireButton
            {
                Text = "POKAŻ LOG",
                Style = ButtonStyle.Ghost,
                Size = new Size(150, 40),
                Location = new Point(310, 200)
            };
            openLog.Click += (s, e) =>
            {
                try { Process.Start("notepad.exe", "\"" + AppPaths.LogFile + "\""); }
                catch { }
            };
            card.Controls.Add(openLog);

            _checkLauncher = new SpireButton
            {
                Text = "SPRAWDŹ AKTUALIZACJE LAUNCHERA",
                Style = ButtonStyle.Secondary,
                Size = new Size(280, 38),
                Location = new Point(0, 310)
            };
            _checkLauncher.Click += async (s, e) =>
            {
                _main.SetStatus("Sprawdzanie wersji launchera…");
                var update = await SelfUpdate.CheckAsync();
                if (!update.Available)
                {
                    MessageBox.Show(this, "Launcher jest aktualny (build " + BuildInfo.Sha + ").",
                        "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }
                if (MessageBox.Show(this, "Jest nowsza wersja launchera.\nPobrać i uruchomić ponownie?",
                        "Arcane Spire", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes) return;
                try
                {
                    var file = await SelfUpdate.DownloadAsync(update, null);
                    if (SelfUpdate.ScheduleApply(file))
                    {
                        _main.SetStatus("Zamykam, aby podmienić plik launchera…");
                        _main.Close();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show(this, "Nie udało się pobrać aktualizacji:\n" + ex.Message,
                        "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            };
            Controls.Add(_checkLauncher);

            _paths = new Label
            {
                ForeColor = Theme.Dim,
                Font = Theme.Mono,
                Location = new Point(0, 360),
                Size = new Size(760, 90)
            };
            Controls.Add(_paths);

            _version = new Label
            {
                ForeColor = Theme.Muted,
                Font = Theme.Small,
                Location = new Point(0, 470),
                Size = new Size(760, 90)
            };
            Controls.Add(_version);

            Resize += (s, e) => DoLayout();
            DoLayout();
        }

        private CheckBox MakeCheck(string text, int top)
        {
            return new CheckBox
            {
                Text = text,
                ForeColor = Theme.Text,
                Font = Theme.Body,
                AutoSize = true,
                Location = new Point(18, top)
            };
        }

        private void DoLayout()
        {
            _paths.SetBounds(0, 360, Math.Max(320, Width - Padding.Horizontal - 40), 96);
            _version.SetBounds(0, 456, Math.Max(320, Width - Padding.Horizontal - 40), 96);
        }

        public void RefreshData()
        {
            _autoUpdate.Checked = Store.Settings.AutoUpdate;
            _startWithWindows.Checked = SelfUpdate.IsStartWithWindows();
            _closeBrowser.Checked = Store.Settings.CloseBrowserOnExit;

            _paths.Text = "Dane:      " + AppPaths.DataDir + Environment.NewLine +
                          "Gry:       " + AppPaths.GamesDir + Environment.NewLine +
                          "Log:       " + AppPaths.LogFile;
            _version.Text = "Arcane Spire " + Application.ProductVersion +
                            "   ·   build " + BuildInfo.Sha + " (" + BuildInfo.BuiltAt + ")" + Environment.NewLine +
                            "Kanał aktualizacji: " + BuildInfo.Channel +
                            "   ·   " + (SelfUpdate.IsInstalled ? "wersja zainstalowana" : "wersja przenośna") +
                            Environment.NewLine +
                            "Gry pobierane są z GitHuba (codeload.github.com), bez konta w chmurze — " +
                            "wszystko zostaje na tym komputerze.";
            DoLayout();
        }
    }
}
