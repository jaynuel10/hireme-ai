require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "hireme-secret-key-change-in-prod";

// ─── In-memory store (replace with DB in production) ────────────────────────
let users = [
  {
    id: "demo-1",
    name: "Demo Candidate",
    email: "hire-me@anshumat.org",
    password: bcrypt.hashSync("HireMe@2026!", 10),
    role: "candidate",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Demo Recruiter",
    email: "recruiter@anshumat.org",
    password: bcrypt.hashSync("HireMe@2026!", 10),
    role: "recruiter",
    createdAt: new Date().toISOString(),
  },
];

let profiles = {};

let candidates = [
  {
    id: "c1",
    userId: "demo-1",
    name: "Amara Osei",
    title: "Frontend Developer",
    exp: "3 yrs",
    match: 96,
    skills: ["React", "TypeScript", "Node.js"],
    status: "shortlisted",
    location: "Lagos, NG",
    available: "Immediately",
    summary:
      "Experienced frontend developer with a passion for clean code and great UX.",
    shortlisted: true,
  },
  {
    id: "c2",
    userId: "u2",
    name: "Priya Sharma",
    title: "Full Stack Engineer",
    exp: "5 yrs",
    match: 91,
    skills: ["React", "Python", "AWS"],
    status: "new",
    location: "Remote",
    available: "2 weeks",
    summary: "Full-stack engineer specializing in cloud-native applications.",
    shortlisted: false,
  },
  {
    id: "c3",
    userId: "u3",
    name: "Kwame Asante",
    title: "UI/UX + Frontend",
    exp: "2 yrs",
    match: 88,
    skills: ["React", "Figma", "CSS"],
    status: "new",
    location: "Accra, GH",
    available: "Immediately",
    summary: "Designer-developer hybrid with strong eye for detail.",
    shortlisted: false,
  },
];

// ─── Middleware: Auth ─────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: "All fields required" });

  if (users.find((u) => u.email === email))
    return res.status(409).json({ error: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hash,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);

  const token = jwt.sign({ id: user.id, email, role }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token, user: { id: user.id, name, email, role } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ─── Profile Routes ───────────────────────────────────────────────────────────
app.get("/api/profile", auth, (req, res) => {
  const profile = profiles[req.user.id] || {};
  res.json(profile);
});

app.put("/api/profile", auth, (req, res) => {
  profiles[req.user.id] = {
    ...profiles[req.user.id],
    ...req.body,
    userId: req.user.id,
    updatedAt: new Date().toISOString(),
  };
  res.json({ success: true, profile: profiles[req.user.id] });
});

app.post("/api/profile/autosave", auth, (req, res) => {
  profiles[req.user.id] = {
    ...profiles[req.user.id],
    ...req.body,
    userId: req.user.id,
    savedAt: new Date().toISOString(),
  };
  res.json({ success: true, savedAt: profiles[req.user.id].savedAt });
});

// Export profile as JSON (frontend uses this to generate PDF)
app.get("/api/profile/export", auth, (req, res) => {
  const profile = profiles[req.user.id];
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  const user = users.find((u) => u.id === req.user.id);
  res.json({ ...profile, name: user?.name, email: user?.email });
});

// Public profile link
app.get("/api/profile/:userId/public", (req, res) => {
  const profile = profiles[req.params.userId];
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  const user = users.find((u) => u.id === req.params.userId);
  // Strip sensitive data
  res.json({ ...profile, name: user?.name });
});

// ─── Candidates Routes (Recruiter) ───────────────────────────────────────────
app.get("/api/candidates", auth, (req, res) => {
  if (req.user.role !== "recruiter")
    return res.status(403).json({ error: "Recruiter access only" });

  const { search, status, limit = 20 } = req.query;
  let result = candidates;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q)),
    );
  }
  if (status && status !== "all") {
    result = result.filter(
      (c) => c.status === status || (status === "shortlisted" && c.shortlisted),
    );
  }

  res.json(result.slice(0, Number(limit)));
});

app.get("/api/candidates/:id", auth, (req, res) => {
  const candidate = candidates.find((c) => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ error: "Candidate not found" });
  res.json(candidate);
});

app.patch("/api/candidates/:id/shortlist", auth, (req, res) => {
  if (req.user.role !== "recruiter")
    return res.status(403).json({ error: "Recruiter access only" });

  const idx = candidates.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  candidates[idx].shortlisted = !candidates[idx].shortlisted;
  candidates[idx].status = candidates[idx].shortlisted
    ? "shortlisted"
    : "reviewed";
  res.json(candidates[idx]);
});

// ─── AI Proxy Route (Groq - Free) ────────────────────────────────────────────
app.post("/api/ai/chat", async (req, res) => {
  const { system, messages } = req.body;

  console.log("🤖 AI request received");
  console.log("   Messages count:", messages?.length);

  if (!system || !messages || !Array.isArray(messages)) {
    console.log("❌ Missing system or messages");
    return res.status(400).json({ error: "Missing system or messages" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log("❌ GROQ_API_KEY not set in .env");
    return res.status(500).json({ error: "GROQ_API_KEY not set in .env" });
  }

  console.log("✅ API key found, calling Groq...");

  try {
    // Groq uses OpenAI-compatible format
    const groqMessages = [
      { role: "system", content: system },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Groq API error:", JSON.stringify(data, null, 2));
      return res
        .status(response.status)
        .json({ error: data?.error?.message || "Groq API error" });
    }

    const text = data.choices?.[0]?.message?.content || "";
    console.log("✅ Groq responded, length:", text.length);
    res.json({ text });
  } catch (err) {
    console.error("❌ AI proxy error:", err.message);
    res.status(500).json({ error: err.message || "Failed to reach Groq API" });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ HireMe.ai API running on port ${PORT}`));
