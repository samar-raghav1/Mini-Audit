import { useEffect, useState } from "react";
import ContentEditor from "./components/ContentEditor";
import VersionHistory from "./components/VersionHistory";
import { fetchVersions, saveVersion } from "./api/versionApi";

function App() {
  const [content, setContent] = useState("");
  const [versions, setVersions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVersions()
      .then((data) => setVersions(data.versions || []))
      .catch((err) => setError(err.message || "Failed to load versions"));
  }, []);

  const handleSave = async () => {
    setError("");
    setIsSaving(true);
    try {
      const newVersion = await saveVersion(content);
      setVersions((prev) => [...prev, newVersion]);
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Mini Audit Trail Generator
            </h1>
            <p className="text-sm text-slate-300">
              Track every change you make to the editor in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-300 border border-slate-700/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 mr-1"></span>
            Connected
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[1.3fr_minmax(0,1fr)]">
          {/* Left: ContentEditor */}
          <ContentEditor
            content={content}
            onChange={setContent}
            onSave={handleSave}
            isSaving={isSaving}
          />

          {/* Right: VersionHistory */}
          <VersionHistory versions={versions} />
        </main>
      </div>
    </div>
  );
}

export default App;
