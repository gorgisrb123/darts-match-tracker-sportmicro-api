export function StatusPill({ count, loading }: { count: number; loading: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200">
      <span className={`h-2.5 w-2.5 rounded-full ${loading ? 'bg-amber-400' : 'bg-emerald-400'}`} />
      <span>{loading ? 'Refreshing live data' : `${count} matches shown`}</span>
    </div>
  );
}
