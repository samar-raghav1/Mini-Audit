function ContentEditor({ content, onChange, onSave, isSaving }) {
  return (
    <section className="content-editor rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/40 backdrop-blur-sm p-5 space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-50">
          Content Editor
        </h2>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-300">
          Live diff
        </span>
      </header>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 shadow-inner outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/60 transition"
        placeholder="Type content here, then hit “Save Version” to record a snapshot..."
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Tip: Save often to see a rich version history.
        </p>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/40 hover:bg-indigo-400 disabled:bg-slate-600 disabled:text-slate-200 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 transition"
        >
          {isSaving && (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
          )}
          <span>{isSaving ? "Saving..." : "Save Version"}</span>
        </button>
      </div>
    </section>
  );
}

export default ContentEditor;
