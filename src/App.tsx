import { useEffect, useMemo, useState } from 'react';
import { SportmicroClient, type SportmicroMatch } from './lib/sportmicroClient';
import { MatchCard } from './components/MatchCard';
import { StatusPill } from './components/StatusPill';
import { SearchBar } from './components/SearchBar';

const client = new SportmicroClient({
  baseUrl: 'https://darts.sportmicro.com',
  apiKey: import.meta.env.SPORTMICRO_API_KEY || ''
});

export function App() {
  const [matches, setMatches] = useState<SportmicroMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await client.getLiveMatches();
        if (!cancelled) {
          setMatches(data);
          setHasLoaded(true);
          setError(data.length === 0 ? 'No live matches found' : null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error while loading live matches.');
          setHasLoaded(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const interval = window.setInterval(load, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return matches;
    return matches.filter((match) => [match.homeTeam, match.awayTeam, match.status].some((value) => value.toLowerCase().includes(term)));
  }, [matches, query]);

  const missingKey = !import.meta.env.SPORTMICRO_API_KEY;
  const showLoading = loading && !missingKey;
  const showEmpty = hasLoaded && !showLoading && !error && filtered.length === 0;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Powered by Sportmicro</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Darts Match Tracker</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Live darts scores, event status, and match summaries from the Sportmicro API. Search and inspect the latest updates with a developer-friendly interface.
            </p>
          </div>
          <StatusPill count={filtered.length} loading={showLoading} />
        </div>

        <SearchBar value={query} onChange={setQuery} />

        {missingKey && <StateMessage title="Missing API key" body="Add SPORTMICRO_API_KEY to your .env file, then restart the dev server." tone="error" />}
        {showLoading && <StateMessage title="Loading live matches" body="Fetching the latest Sportmicro darts events…" />}
        {!showLoading && error && <StateMessage title="Unable to load matches" body={error} tone="error" />}
        {showEmpty && <StateMessage title="No live matches found" body="Try a different search term or refresh later when a live event is available." />}

        {!showLoading && !error && filtered.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StateMessage({ title, body, tone = 'default' }: { title: string; body: string; tone?: 'default' | 'error' }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-100' : 'border-slate-800 bg-slate-950/60 text-slate-200'}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{body}</p>
    </div>
  );
}
