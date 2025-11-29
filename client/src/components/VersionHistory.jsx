function VersionHistory({ versions }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/40 backdrop-blur-sm p-5">
      <h2 className="text-base font-semibold text-slate-50 mb-3">
        Version History
      </h2>

      {versions.length === 0 ? (
        <p className="text-xs text-slate-400">
          No versions yet. Save your first version to start the audit trail.
        </p>
      ) : (
        <ol className="relative border-s border-slate-700 pl-4 space-y-4 text-sm">
          {versions
            .slice()
            .reverse()
            .map((v, index) => (
              <li key={v.id} className="relative">
                <span className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full border border-slate-900 bg-indigo-400 shadow shadow-indigo-500/70" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-indigo-300">
                    {new Date(v.timestamp).toLocaleString()}
                  </span>
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                    v{versions.length - index}
                  </span>
                </div>

                <div className="mt-1 space-y-1.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
                      + {v.addedWords.length} added
                    </span>
                    <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] text-rose-300">
                      − {v.removedWords.length} removed
                    </span>
                  </div>

                  <p className="text-slate-400">
                    Length:{" "}
                    <span className="font-medium text-slate-100">
                      {v.oldLength}
                    </span>{" "}
                    →{" "}
                    <span className="font-medium text-slate-100">
                      {v.newLength}
                    </span>{" "}
                    words
                  </p>

                  {v.addedWords.length > 0 && (
                    <p className="text-slate-300">
                      <span className="font-semibold text-emerald-300">
                        Added:
                      </span>{" "}
                      {v.addedWords.join(", ")}
                    </p>
                  )}
                  {v.removedWords.length > 0 && (
                    <p className="text-slate-300">
                      <span className="font-semibold text-rose-300">
                        Removed:
                      </span>{" "}
                      {v.removedWords.join(", ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
        </ol>
      )}
    </section>
  );
}

export default VersionHistory;
