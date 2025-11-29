import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory store of versions
let versions = [];
let lastContent = "";

// Utility: split text into words (simple tokenizer)
function getWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// Core diff logic: compute added/removed words
function diffWords(oldText, newText) {
  const oldWords = getWords(oldText);
  const newWords = getWords(newText);

  const oldCounts = {};
  const newCounts = {};

  oldWords.forEach((w) => {
    const key = w.toLowerCase();
    oldCounts[key] = (oldCounts[key] || 0) + 1;
  });

  newWords.forEach((w) => {
    const key = w.toLowerCase();
    newCounts[key] = (newCounts[key] || 0) + 1;
  });

  const addedWords = [];
  const removedWords = [];

  const allKeys = new Set([...Object.keys(oldCounts), ...Object.keys(newCounts)]);

  allKeys.forEach((key) => {
    const oldCount = oldCounts[key] || 0;
    const newCount = newCounts[key] || 0;

    if (newCount > oldCount) {
      const diff = newCount - oldCount;
      for (let i = 0; i < diff; i++) {
        addedWords.push(key);
      }
    } else if (oldCount > newCount) {
      const diff = oldCount - newCount;
      for (let i = 0; i < diff; i++) {
        removedWords.push(key);
      }
    }
  });

  return { addedWords, removedWords, oldLength: oldWords.length, newLength: newWords.length };
}

// GET /versions - return full history
app.get("/versions", (req, res) => {
  res.json({ versions });
});

// POST /save-version - save a new version and compute diff
app.post("/save-version", (req, res) => {
  const { content } = req.body;

  if (typeof content !== "string") {
    return res.status(400).json({ error: "content must be a string" });
  }

  const { addedWords, removedWords, oldLength, newLength } = diffWords(lastContent, content);

  const versionEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    addedWords,
    removedWords,
    oldLength,
    newLength,
    content
  };

  versions.push(versionEntry);
  lastContent = content;

  res.status(201).json(versionEntry);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
