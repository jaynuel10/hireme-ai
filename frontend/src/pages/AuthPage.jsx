import { useState } from "react";

const API_BASE = "";

export default function AuthPage({ onAuth, onBack }) {
  const [mode, setMode] = useState("signup");
  const [role, setRole] = useState("candidate");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint =
        mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body =
        mode === "signup"
          ? {
              name: form.name,
              email: form.email,
              password: form.password,
              role,
            }
          : { email: form.email, password: form.password };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Save token to localStorage for future requests
      localStorage.setItem("token", data.token);
      onAuth({ ...data.user });
    } catch (err) {
      setError(
        "Cannot connect to server. Make sure your backend is running on port 5000 and CORS is enabled.",
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface font-body">
      <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back
        </button>
      </nav>

      <div className="flex justify-center items-center px-5 py-16">
        <div className="card w-full max-w-md p-9 animate-fade-up">
          <div className="text-center mb-7">
            <h2 className="font-display text-2xl font-extrabold mb-1.5">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-ink-muted text-sm">
              {mode === "signup"
                ? "Start building your AI profile"
                : "Sign in to continue"}
            </p>
          </div>

          {/* Role tabs — only show on signup */}
          {mode === "signup" && (
            <div className="flex gap-2 bg-surface-2 p-1 rounded-full mb-6">
              {["candidate", "recruiter"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    role === r
                      ? "bg-white text-ink shadow-sm"
                      : "text-ink-muted"
                  }`}
                >
                  {r === "candidate" ? "👤 Candidate" : "🔍 Recruiter"}
                </button>
              ))}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Ada Lovelace"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <button
              className="btn btn-accent btn-lg w-full justify-center mt-1 disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </span>
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-ink-muted">
            {mode === "signup" ? "Already have an account? " : "New here? "}
            <button
              className="text-accent font-medium underline"
              onClick={() => {
                setMode(mode === "signup" ? "login" : "signup");
                setError(null);
              }}
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </p>

          <div className="mt-5 bg-surface-2 rounded-lg px-4 py-3 text-xs text-ink-muted text-center">
            <span className="font-semibold text-ink">🔑 Demo:</span>{" "}
            hire-me@anshumat.org / HireMe@2026!
          </div>
        </div>
      </div>
    </div>
  );
}
