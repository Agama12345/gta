using System;
using System.Drawing;
using System.Windows.Forms;
using ArcaneSpire.Core;

namespace ArcaneSpire.UI
{
    /// <summary>Okna dialogowe: logowanie, dodawanie gry, właściwości, zmiana hasła.</summary>
    public static class Dialogs
    {
        public static bool ShowLogin(IWin32Window owner)
        {
            if (Store.Current != null) return true;
            using (var dialog = new LoginDialog())
            {
                return dialog.ShowDialog(owner) == DialogResult.OK && Store.Current != null;
            }
        }

        public static void ShowAddGame(IWin32Window owner)
        {
            using (var dialog = new GameEditorDialog(null))
            {
                dialog.ShowDialog(owner);
            }
        }

        public static void ShowGameProperties(IWin32Window owner, GameInfo game)
        {
            if (game == null) return;
            using (var dialog = new GameEditorDialog(game))
            {
                dialog.ShowDialog(owner);
            }
        }

        public static void ShowChangePassword(IWin32Window owner)
        {
            using (var dialog = new PasswordDialog())
            {
                dialog.ShowDialog(owner);
            }
        }

        private class LoginDialog : Form
        {
            private readonly SpireTextBox _user;
            private readonly SpireTextBox _pass;
            private readonly SpireTextBox _pass2;
            private readonly SpireTextBox _email;
            private readonly Label _message;
            private readonly SpireButton _primary;
            private readonly LinkLabel _switch;
            private bool _registerMode;

            public LoginDialog()
            {
                ClientSize = new Size(420, 330);
                FormBorderStyle = FormBorderStyle.FixedDialog;
                StartPosition = FormStartPosition.CenterParent;
                MaximizeBox = false;
                MinimizeBox = false;
                BackColor = Theme.Panel;
                ForeColor = Theme.Text;
                Font = Theme.Body;
                Text = "Arcane Spire — konto";
                ShowInTaskbar = false;
                try
                {
                    var icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
                    if (icon != null) Icon = icon;
                }
                catch { }

                var header = new Label
                {
                    Text = "Zaloguj się do Arcane Spire",
                    ForeColor = Theme.Text,
                    Font = Theme.H2,
                    AutoSize = true,
                    Location = new Point(24, 22)
                };
                Controls.Add(header);

                var subtitle = new Label
                {
                    Text = "Konto jest lokalne — trzyma bibliotekę i czas gry na tym komputerze.",
                    ForeColor = Theme.Muted,
                    Font = Theme.Small,
                    Size = new Size(370, 32),
                    Location = new Point(24, 52)
                };
                Controls.Add(subtitle);

                _user = new SpireTextBox("nazwa użytkownika") { Location = new Point(24, 92), Width = 372 };
                _pass = new SpireTextBox("hasło", true) { Location = new Point(24, 138), Width = 372 };
                _pass2 = new SpireTextBox("powtórz hasło", true) { Location = new Point(24, 184), Width = 372, Visible = false };
                _email = new SpireTextBox("e-mail (opcjonalnie)") { Location = new Point(24, 230), Width = 372, Visible = false };
                Controls.Add(_user);
                Controls.Add(_pass);
                Controls.Add(_pass2);
                Controls.Add(_email);

                _message = new Label
                {
                    ForeColor = Theme.Bad,
                    Font = Theme.Small,
                    Location = new Point(24, 196),
                    Size = new Size(372, 20)
                };
                Controls.Add(_message);

                _primary = new SpireButton
                {
                    Text = "ZALOGUJ",
                    Style = ButtonStyle.Primary,
                    Size = new Size(180, 42),
                    Location = new Point(24, 232)
                };
                _primary.Click += (s, e) => Submit();
                Controls.Add(_primary);

                _switch = new LinkLabel
                {
                    Text = "Nie masz konta? Utwórz je",
                    LinkColor = Theme.Accent,
                    LinkBehavior = LinkBehavior.HoverUnderline,
                    AutoSize = true,
                    Location = new Point(216, 244)
                };
                _switch.LinkClicked += (s, e) => ToggleMode();
                Controls.Add(_switch);

                AcceptButton = _primary;
                CancelButton = null;
                KeyPreview = true;
                KeyDown += (s, e) => { if (e.KeyCode == Keys.Escape) DialogResult = DialogResult.Cancel; };
            }

            private void ToggleMode()
            {
                _registerMode = !_registerMode;
                _pass2.Visible = _registerMode;
                _email.Visible = _registerMode;
                _primary.Text = _registerMode ? "ZAREJESTRUJ" : "ZALOGUJ";
                _primary.Style = _registerMode ? ButtonStyle.Success : ButtonStyle.Primary;
                _switch.Text = _registerMode ? "Mam już konto — zaloguj" : "Nie masz konta? Utwórz je";
                ClientSize = new Size(420, _registerMode ? 400 : 330);
                _message.Text = "";
            }

            private void Submit()
            {
                string error;
                if (_registerMode)
                    error = Store.Register(_user.Text, _pass.Box.Text, _pass2.Box.Text, _email.Text);
                else
                    error = Store.Login(_user.Text, _pass.Box.Text, true);

                if (error != null)
                {
                    _message.Text = error;
                    return;
                }
                DialogResult = DialogResult.OK;
                Close();
            }
        }

        private class PasswordDialog : Form
        {
            public PasswordDialog()
            {
                ClientSize = new Size(400, 250);
                FormBorderStyle = FormBorderStyle.FixedDialog;
                StartPosition = FormStartPosition.CenterParent;
                MaximizeBox = false;
                MinimizeBox = false;
                BackColor = Theme.Panel;
                ForeColor = Theme.Text;
                Font = Theme.Body;
                Text = "Zmiana hasła";
                ShowInTaskbar = false;

                var oldPass = new SpireTextBox("stare hasło", true) { Location = new Point(20, 20), Width = 352 };
                var newPass = new SpireTextBox("nowe hasło", true) { Location = new Point(20, 68), Width = 352 };
                var newPass2 = new SpireTextBox("powtórz nowe hasło", true) { Location = new Point(20, 116), Width = 352 };
                Controls.Add(oldPass);
                Controls.Add(newPass);
                Controls.Add(newPass2);

                var message = new Label { ForeColor = Theme.Bad, Font = Theme.Small, Location = new Point(20, 154), Size = new Size(352, 20) };
                Controls.Add(message);

                var save = new SpireButton
                {
                    Text = "ZAPISZ",
                    Style = ButtonStyle.Primary,
                    Size = new Size(150, 38),
                    Location = new Point(20, 182)
                };
                save.Click += (s, e) =>
                {
                    var error = Store.ChangePassword(oldPass.Box.Text, newPass.Box.Text, newPass2.Box.Text);
                    if (error != null) { message.Text = error; return; }
                    MessageBox.Show(this, "Hasło zmienione.", "Arcane Spire", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    DialogResult = DialogResult.OK;
                    Close();
                };
                Controls.Add(save);

                var cancel = new SpireButton { Text = "ANULUJ", Style = ButtonStyle.Ghost, Size = new Size(120, 38), Location = new Point(178, 182) };
                cancel.Click += (s, e) => { DialogResult = DialogResult.Cancel; Close(); };
                Controls.Add(cancel);
            }
        }

        private class GameEditorDialog : Form
        {
            private readonly GameInfo _game;
            private readonly SpireTextBox _name;
            private readonly SpireTextBox _tagline;
            private readonly SpireTextBox _repo;
            private readonly SpireTextBox _branch;
            private readonly SpireTextBox _subPath;
            private readonly SpireTextBox _url;
            private readonly SpireTextBox _genre;
            private readonly ComboBox _kind;
            private readonly Label _message;

            public GameEditorDialog(GameInfo game)
            {
                _game = game ?? new GameInfo();
                var editing = game != null;

                ClientSize = new Size(560, 520);
                FormBorderStyle = FormBorderStyle.FixedDialog;
                StartPosition = FormStartPosition.CenterParent;
                MaximizeBox = false;
                MinimizeBox = false;
                BackColor = Theme.Panel;
                ForeColor = Theme.Text;
                Font = Theme.Body;
                Text = editing ? "Właściwości — " + _game.Name : "Dodaj grę do biblioteki";
                ShowInTaskbar = false;
                try
                {
                    var icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
                    if (icon != null) Icon = icon;
                }
                catch { }

                AddLabel("Nazwa gry", 20, 18);
                _name = new SpireTextBox("np. OreRush") { Location = new Point(20, 40), Width = 520, Text = _game.Name };
                Controls.Add(_name);

                AddLabel("Krótki opis (jedna linia)", 20, 84);
                _tagline = new SpireTextBox("np. zręcznościówka o kopaniu rudy") { Location = new Point(20, 106), Width = 520, Text = _game.Tagline };
                Controls.Add(_tagline);

                AddLabel("Typ źródła", 20, 150);
                _kind = new ComboBox
                {
                    DropDownStyle = ComboBoxStyle.DropDownList,
                    Location = new Point(20, 172),
                    Width = 520,
                    BackColor = Theme.Panel2,
                    ForeColor = Theme.Text,
                    FlatStyle = FlatStyle.Flat
                };
                _kind.Items.AddRange(new object[]
                {
                    "web — paczka HTML z repozytorium GitHub (auto-aktualizacja)",
                    "file — pojedynczy plik do pobrania (np. instalator)",
                    "external — istniejąca strona/gra w internecie"
                });
                _kind.SelectedIndex = _game.Kind == "file" ? 1 : _game.Kind == "external" ? 2 : 0;
                Controls.Add(_kind);

                AddLabel("Repozytorium GitHub (właściciel/nazwa)", 20, 212);
                _repo = new SpireTextBox("np. Agama12345/gta") { Location = new Point(20, 234), Width = 250, Text = _game.Repo };
                Controls.Add(_repo);

                AddLabel("Gałąź", 290, 212);
                _branch = new SpireTextBox("main") { Location = new Point(290, 234), Width = 110, Text = _game.Branch };
                Controls.Add(_branch);

                AddLabel("Katalog paczki", 410, 212);
                _subPath = new SpireTextBox("releases/gra") { Location = new Point(410, 234), Width = 130, Text = _game.SubPath };
                Controls.Add(_subPath);

                AddLabel("Link bezpośredni / adres gry", 20, 278);
                _url = new SpireTextBox("https://…") { Location = new Point(20, 300), Width = 520, Text = _game.Url };
                Controls.Add(_url);

                AddLabel("Gatunek", 20, 344);
                _genre = new SpireTextBox("RPG") { Location = new Point(20, 366), Width = 250, Text = _game.Genre };
                Controls.Add(_genre);

                _message = new Label { ForeColor = Theme.Bad, Font = Theme.Small, Location = new Point(20, 434), Size = new Size(520, 20) };
                Controls.Add(_message);

                var save = new SpireButton
                {
                    Text = editing ? "ZAPISZ" : "DODAJ",
                    Style = ButtonStyle.Primary,
                    Size = new Size(160, 40),
                    Location = new Point(20, 462)
                };
                save.Click += (s, e) => Save();
                Controls.Add(save);

                var cancel = new SpireButton { Text = "ANULUJ", Style = ButtonStyle.Ghost, Size = new Size(120, 40), Location = new Point(188, 462) };
                cancel.Click += (s, e) => { DialogResult = DialogResult.Cancel; Close(); };
                Controls.Add(cancel);

                if (editing && game.Kind == "external" && string.IsNullOrWhiteSpace(game.Url))
                {
                    _message.ForeColor = Theme.Warn;
                    _message.Text = "Wpisz adres gry — bez niego launcher nie ma czego uruchomić.";
                }
            }

            private void AddLabel(string text, int x, int y)
            {
                Controls.Add(new Label
                {
                    Text = text,
                    ForeColor = Theme.Muted,
                    Font = Theme.Small,
                    AutoSize = true,
                    Location = new Point(x, y)
                });
            }

            private void Save()
            {
                if (string.IsNullOrWhiteSpace(_name.Text))
                {
                    _message.Text = "Podaj nazwę gry.";
                    return;
                }
                var kind = _kind.SelectedIndex == 1 ? "file" : _kind.SelectedIndex == 2 ? "external" : "web";
                if (kind == "web" && string.IsNullOrWhiteSpace(_repo.Text))
                {
                    _message.Text = "Dla paczki z GitHuba podaj repozytorium (właściciel/nazwa).";
                    return;
                }
                if (kind != "web" && string.IsNullOrWhiteSpace(_url.Text))
                {
                    _message.Text = "Podaj link do pliku lub adres gry.";
                    return;
                }

                _game.Name = _name.Text.Trim();
                _game.Tagline = _tagline.Text.Trim();
                _game.Kind = kind;
                _game.Repo = _repo.Text.Trim();
                _game.Branch = string.IsNullOrWhiteSpace(_branch.Text) ? "main" : _branch.Text.Trim();
                _game.SubPath = _subPath.Text.Trim().Trim('/');
                _game.Url = _url.Text.Trim();
                _game.Genre = string.IsNullOrWhiteSpace(_genre.Text) ? "Gra" : _genre.Text.Trim();
                if (string.IsNullOrWhiteSpace(_game.Id))
                {
                    _game.Id = Slug(_game.Name);
                    _game.Emblem = Initials(_game.Name);
                    _game.Accent = "#7FB2F0";
                    _game.Price = "Darmowa";
                    _game.Developer = "Dodane ręcznie";
                    _game.Description = _game.Tagline;
                }

                Store.AddOrUpdateCustom(_game);
                if (Store.Current != null) Store.Grant(_game.Id);
                AppPaths.Log("Zapisano grę: " + _game.Id);
                DialogResult = DialogResult.OK;
                Close();
            }

            private static string Slug(string text)
            {
                var builder = new System.Text.StringBuilder();
                foreach (var ch in (text ?? "").ToLowerInvariant())
                {
                    if (char.IsLetterOrDigit(ch)) builder.Append(ch);
                    else if (builder.Length > 0 && builder[builder.Length - 1] != '-') builder.Append('-');
                }
                var slug = builder.ToString().Trim('-');
                return string.IsNullOrEmpty(slug) ? "gra-" + DateTime.Now.Ticks % 100000 : slug;
            }

            private static string Initials(string text)
            {
                var parts = (text ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length == 0) return "GR";
                if (parts.Length == 1) return parts[0].Substring(0, Math.Min(2, parts[0].Length)).ToUpperInvariant();
                return (parts[0].Substring(0, 1) + parts[1].Substring(0, 1)).ToUpperInvariant();
            }
        }
    }
}
