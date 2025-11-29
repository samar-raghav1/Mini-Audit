const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchVersions() {
  const res = await fetch(`${API_BASE}/versions`);
  if (!res.ok) throw new Error("Failed to load versions");
  return res.json();
}

export async function saveVersion(content) {
  const res = await fetch(`${API_BASE}/save-version`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });
  if (!res.ok) throw new Error("Failed to save version");
  return res.json();
}
