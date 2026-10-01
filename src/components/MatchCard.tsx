import type { SportmicroMatch } from '../lib/sportmicroClient';

export function MatchCard({ match }: { match: SportmicroMatch }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-400/40 hover:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{match.tournament}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{match.homeTeam} vs {match.awayTeam}</h3>
        </div>
        <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">
          {match.status}
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="space-y-2 text-sm text-slate-300">
          <p>Home score: <span className="font-semibold text-white">{match.homeScore}</span></p>
          <p>Away score: <span className="font-semibold text-white">{match.awayScore}</span></p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p>Match ID</p>
          <p className="font-mono text-slate-300">{match.id}</p>
        </div>
      </div>

      {match.startTime && <p className="mt-4 text-xs text-slate-400">Updated/start time reference: {match.startTime}</p>}
    </article>
  );
}
