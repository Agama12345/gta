using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ArcaneSpire.Core
{
    /// <summary>Kolejka pobrań — jedna instalacja naraz, reszta czeka (jak w Steamie).</summary>
    public class DownloadManager
    {
        private readonly List<DownloadJob> _jobs = new List<DownloadJob>();
        private readonly SynchronizationContext _ui;
        private CancellationTokenSource _cts;
        private bool _workerRunning;

        public event EventHandler Changed;
        public event EventHandler<DownloadJob> JobFinished;

        public DownloadManager()
        {
            _ui = SynchronizationContext.Current;
        }

        public IList<DownloadJob> Jobs
        {
            get { lock (_jobs) return _jobs.ToList(); }
        }

        public bool IsBusy { get { return _workerRunning; } }

        private void RaiseChanged()
        {
            if (_ui != null && SynchronizationContext.Current != _ui)
                _ui.Post(_ => { var handler = Changed; if (handler != null) handler(this, EventArgs.Empty); }, null);
            else
            {
                var handler = Changed;
                if (handler != null) handler(this, EventArgs.Empty);
            }
        }

        public DownloadJob Enqueue(GameInfo game, string sha)
        {
            var job = new DownloadJob
            {
                GameId = game.Id,
                GameName = game.Name,
                Sha = sha ?? "",
                Status = "W kolejce"
            };
            lock (_jobs) _jobs.Add(job);
            RaiseChanged();
            StartWorkerIfIdle();
            return job;
        }

        public void Cancel(DownloadJob job)
        {
            if (job == null) return;
            job.Cancelled = true;
            job.Status = "Anulowano";
            if (_cts != null && !job.Finished) _cts.Cancel();
            RaiseChanged();
        }

        public void ClearFinished()
        {
            lock (_jobs) _jobs.RemoveAll(j => j.Finished || j.Cancelled || j.Failed);
            RaiseChanged();
        }

        private void StartWorkerIfIdle()
        {
            if (_workerRunning) return;
            _workerRunning = true;
            Task.Run(async () => await WorkerAsync().ConfigureAwait(false));
        }

        private async Task WorkerAsync()
        {
            try
            {
                while (true)
                {
                    DownloadJob job;
                    lock (_jobs)
                    {
                        job = _jobs.FirstOrDefault(j => !j.Finished && !j.Cancelled && !j.Failed && j.Status == "W kolejce");
                    }
                    if (job == null) break;

                    var game = Store.FindGame(job.GameId);
                    if (game == null)
                    {
                        job.Failed = true;
                        job.Status = "Nie znaleziono gry";
                        RaiseChanged();
                        continue;
                    }

                    _cts = new CancellationTokenSource();
                    job.Status = "Przygotowanie";
                    RaiseChanged();

                    try
                    {
                        if (game.Kind == "web")
                        {
                            await Installer.InstallWebGameAsync(game, job.Sha, job,
                                text => { job.Status = text; RaiseChanged(); }, _cts.Token).ConfigureAwait(false);
                        }
                        else if (game.Kind == "file")
                        {
                            await Installer.InstallFileGameAsync(game, job, text =>
                            {
                                job.Status = text;
                                RaiseChanged();
                            }, _cts.Token).ConfigureAwait(false);
                        }
                        else
                        {
                            // gra zewnętrzna — nie ma czego pobierać
                            Store.SaveState(game.Id, new GameState
                            {
                                Installed = DateTime.Now.ToString("o"),
                                Updated = DateTime.Now.ToString("o"),
                                Version = "online"
                            });
                            job.Progress = 1;
                            job.Status = "Gotowe";
                            job.Finished = true;
                        }
                    }
                    catch (OperationCanceledException)
                    {
                        job.Cancelled = true;
                        job.Status = "Anulowano";
                    }
                    catch (Exception ex)
                    {
                        job.Failed = true;
                        job.Error = ex;
                        job.Status = "Błąd: " + ex.Message;
                        AppPaths.Log(ex, "Download " + job.GameId);
                    }
                    finally
                    {
                        if (_cts != null) { _cts.Dispose(); _cts = null; }
                        RaiseChanged();
                        var handler = JobFinished;
                        if (handler != null) handler(this, job);
                    }
                }
            }
            finally
            {
                _workerRunning = false;
                RaiseChanged();
            }
        }
    }
}
