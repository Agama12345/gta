using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI.Pages
{
    /// <summary>Konto: logowanie, rejestracja, statystyki i biblioteka.</summary>
    public class AccountPage : UserControl, IPage
    {
        private readonly MainForm _main;
        private readonly Panel _logged;
        private readonly Panel _guest;

        private readonly Label _avatar;
        private readonly Label _userLabel;
        private readonly Label _createdLabel;
        private readonly Label _statsLabel;
        private readonly ListBox _games;

        private readonly SpireTextBox _loginUser;
        private readonly SpireTextBox _loginPass;
        private readonly Label _loginError;

        private readonly SpireTextBox _regUser;
        private readonly SpireTextBox _regEmail;
        private readonly SpireTextBox _regPass;
        private readonly SpireTextBox _regPass2;
        private readonly Label _regError;

        public AccountPage(MainForm main)
        {
            _main = main;
            Dock = DockStyle.Fill;
            BackColor = Theme.Bg;
            Padding = new Padding(28, 18, 28, 18);

            // ------------------------------------------------ widok zalogowany
            _logged = new Panel { BackColor = Theme.Bg, Visible = false };
            Controls.Add(_logged);

            _avatar = new Label
            {
                Text = "?",
                ForeColor = Color.White,
                BackColor = Theme.AccentDark,
                Font = Theme.Font(22f, FontStyle.Bold),
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(84, 84)
            };
            _logged.Controls.Add(_avatar);

            _userLabel = new Label { ForeColor = Theme.Text, Font = Theme.Font(17f, FontStyle.Bold), AutoSize = true };
            _logged.Controls.Add(_userLabel);

            _createdLabel = new Label { ForeColor = Theme.Dim, Font = Theme.Small, AutoSize = true };
            _logged.Controls.Add(_createdLabel);

            _statsLabel = new Label { ForeColor = Theme.Muted, Font = Theme.Body };
            _logged.Controls.Add(_statsLabel);

            var logout = new SpireButton { Text = "WYLOGUJ", Style = ButtonStyle.Ghost, Size = new Size(120, 38) };
            logout.Click += (s, e) =>
            {
                Store.Logout();
                _main.SetStatus("Wylogowano.");
                _main.RefreshAll();
            };
            _logged.Controls.Add(logout);

            var changePassword = new SpireButton { Text = "ZMIEŃ HASŁO", Style = ButtonStyle.Secondary, Size = new Size(160, 38) };
            changePassword.Click += (s, e) => Dialogs.ShowChangePassword(_main);
            _logged.Controls.Add(changePassword);

            var folder = new SpireButton { Text = "DANE LAUNCHERA", Style = ButtonStyle.Ghost, Size = new Size(170, 38) };
            folder.Click += (s, e) => AppPaths.OpenInExplorer(AppPaths.DataDir);
            _logged.Controls.Add(folder);
            _logged.Tag = new[] { logout, changePassword, folder };

            var gamesLabel = new Label { Text = "Twoja biblioteka", ForeColor = Theme.Text, Font = Theme.H2, AutoSize = true };
            _logged.Controls.Add(gamesLabel);

            _games = new ListBox
            {
                BackColor = Theme.Panel,
                ForeColor = Theme.Text,
                BorderStyle = BorderStyle.None,
                Font = Theme.Body
            };
            _games.DoubleClick += (s, e) =>
            {
                var game = _games.SelectedItem as GameInfo;
                if (game != null) _main.OpenGame(game.Id);
            };
            _logged.Controls.Add(_games);

            // -------------------------------------------------- widok gościa
            _guest = new Panel { BackColor = Theme.Bg };
            Controls.Add(_guest);

            var intro = new Label
            {
                Text = "Konto w Arcane Spire",
                ForeColor = Theme.Text,
                Font = Theme.H1,
                AutoSize = true
            };
            _guest.Controls.Add(intro);

            var introText = new Label
            {
                Text = "Konto trzyma bibliotekę, czas gry i ustawienia na tym komputerze.\n" +
                       "Hasło jest zapisywane jako skrót PBKDF2-SHA256 — nigdy jawnie.",
                ForeColor = Theme.Muted,
                Font = Theme.Body,
                Size = new Size(560, 44)
            };
            _guest.Controls.Add(introText);

            // logowanie
            var loginBox = new RoundPanel { Radius = 12, FillColor = Theme.Panel, BorderColor = Theme.Border };
            _guest.Controls.Add(loginBox);
            loginBox.Controls.Add(new Label
            {
                Text = "Zaloguj się",
                ForeColor = Theme.Text,
                Font = Theme.H3,
                AutoSize = true,
                Location = new Point(20, 18)
            });

            _loginUser = new SpireTextBox("nazwa użytkownika") { Location = new Point(20, 52), Width = 340 };
            _loginPass = new SpireTextBox("hasło", true) { Location = new Point(20, 100), Width = 340 };
            loginBox.Controls.Add(_loginUser);
            loginBox.Controls.Add(_loginPass);

            var loginButton = new SpireButton
            {
                Text = "ZALOGUJ",
                Style = ButtonStyle.Primary,
                Size = new Size(150, 40),
                Location = new Point(20, 150)
            };
            loginButton.Click += (s, e) =>
            {
                var error = Store.Login(_loginUser.Text, _loginPass.Box.Text, true);
                if (error != null)
                {
                    _loginError.Text = error;
                    return;
                }
                _loginError.Text = "";
                _loginPass.Box.Text = "";
                _main.SetStatus("Zalogowano jako " + Store.Current.User + ".");
                _main.RefreshAll();
            };
            loginBox.Controls.Add(loginButton);

            _loginError = new Label { ForeColor = Theme.Bad, Font = Theme.Small, Location = new Point(20, 198), Size = new Size(380, 20) };
            loginBox.Controls.Add(_loginError);

            // rejestracja
            var regBox = new RoundPanel { Radius = 12, FillColor = Theme.Panel, BorderColor = Theme.Border };
            _guest.Controls.Add(regBox);
            regBox.Controls.Add(new Label
            {
                Text = "Utwórz konto",
                ForeColor = Theme.Text,
                Font = Theme.H3,
                AutoSize = true,
                Location = new Point(20, 18)
            });

            _regUser = new SpireTextBox("nazwa użytkownika") { Location = new Point(20, 52), Width = 340 };
            _regEmail = new SpireTextBox("e-mail (opcjonalnie)") { Location = new Point(20, 98), Width = 340 };
            _regPass = new SpireTextBox("hasło", true) { Location = new Point(20, 144), Width = 340 };
            _regPass2 = new SpireTextBox("powtórz hasło", true) { Location = new Point(20, 190), Width = 340 };
            regBox.Controls.Add(_regUser);
            regBox.Controls.Add(_regEmail);
            regBox.Controls.Add(_regPass);
            regBox.Controls.Add(_regPass2);

            var registerButton = new SpireButton
            {
                Text = "ZAREJESTRUJ",
                Style = ButtonStyle.Success,
                Size = new Size(170, 40),
                Location = new Point(20, 240)
            };
            registerButton.Click += (s, e) =>
            {
                var error = Store.Register(_regUser.Text, _regPass.Box.Text, _regPass2.Box.Text, _regEmail.Text);
                if (error != null)
                {
                    _regError.Text = error;
                    return;
                }
                _regError.Text = "";
                _main.SetStatus("Konto utworzone. Witaj, " + Store.Current.User + "!");
                _main.RefreshAll();
            };
            regBox.Controls.Add(registerButton);

            _regError = new Label { ForeColor = Theme.Bad, Font = Theme.Small, Location = new Point(20, 288), Size = new Size(400, 20) };
            regBox.Controls.Add(_regError);

            loginBox.Size = new Size(380, 230);
            regBox.Size = new Size(380, 320);

            _guest.Tag = new object[] { loginBox, regBox, intro, introText };
            Resize += (s, e) => DoLayout();
            DoLayout();
        }

        private void DoLayout()
        {
            var width = Math.Max(400, Width - Padding.Horizontal);
            _logged.SetBounds(0, 0, width, Height - Padding.Bottom);
            _guest.SetBounds(0, 0, width, Height - Padding.Bottom);

            _avatar.Location = new Point(0, 6);
            _userLabel.Location = new Point(100, 12);
            _createdLabel.Location = new Point(102, 44);
            _statsLabel.SetBounds(0, 106, width, 40);

            var buttons = _logged.Tag as Button[];
            if (buttons != null)
            {
                buttons[0].Location = new Point(0, 158);
                buttons[1].Location = new Point(128, 158);
                buttons[2].Location = new Point(296, 158);
            }
            foreach (Control control in _logged.Controls)
            {
                var label = control as Label;
                if (label != null && label.Text == "Twoja biblioteka") label.Location = new Point(0, 214);
            }
            _games.SetBounds(0, 246, width, Math.Max(80, Height - 300));

            var intro = _guest.Controls[0] as Label;
            var introText = _guest.Controls[1] as Label;
            if (intro != null) intro.Location = new Point(0, 0);
            if (introText != null) introText.Location = new Point(0, 42);

            var boxes = _guest.Tag as object[];
            if (boxes != null)
            {
                var loginBox = boxes[0] as RoundPanel;
                var regBox = boxes[1] as RoundPanel;
                if (loginBox != null) loginBox.Location = new Point(0, 104);
                if (regBox != null) regBox.Location = new Point(400, 104);
            }
        }

        public void RefreshData()
        {
            DoLayout();
            var logged = Store.Current != null;
            _logged.Visible = logged;
            _guest.Visible = !logged;
            if (!logged) return;

            var account = Store.Current;
            _avatar.Text = string.IsNullOrEmpty(account.Avatar) ? account.User.Substring(0, 1).ToUpperInvariant() : account.Avatar;
            _userLabel.Text = account.User;
            DateTime created;
            _createdLabel.Text = DateTime.TryParse(account.Created, out created)
                ? "konto od " + created.ToString("d MMMM yyyy")
                : "konto lokalne";

            long totalSeconds = 0;
            foreach (var pair in account.Playtime) totalSeconds += pair.Value;
            var span = TimeSpan.FromSeconds(totalSeconds);
            _statsLabel.Text = "Gier w bibliotece: " + account.Owned.Count +
                               "     ·     Łączny czas gry: " +
                               (span.TotalHours >= 1 ? ((int)span.TotalHours) + " godz " + span.Minutes + " min" : span.Minutes + " min") +
                               "     ·     Zainstalowanych: " +
                               CountInstalled();

            _games.Items.Clear();
            foreach (var game in Store.Catalog)
            {
                if (!account.Owns(game.Id)) continue;
                var state = Store.GetState(game.Id);
                var status = Store.IsInstalled(game) ? "zainstalowana" : "nie zainstalowana";
                _games.Items.Add(game.Name + "   ·   " + status +
                                 (string.IsNullOrEmpty(state.Version) ? "" : "  v" + state.Version) +
                                 "   ·   " + Store.PlaytimeText(game.Id));
            }
            if (_games.Items.Count == 0) _games.Items.Add("Brak gier — zajrzyj do sklepu.");
        }

        private int CountInstalled()
        {
            var count = 0;
            foreach (var game in Store.Catalog)
            {
                if (Store.Current != null && Store.Current.Owns(game.Id) && Store.IsInstalled(game)) count++;
            }
            return count;
        }
    }
}
