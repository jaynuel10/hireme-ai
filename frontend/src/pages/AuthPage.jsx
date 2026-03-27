import { useState } from "react";

export default function AuthPage({ onAuth, onBack }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("candidate");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }
      const registered = JSON.parse(
        localStorage.getItem("hm_registered") || "[]",
      );
      if (registered.find((u) => u.email === form.email)) {
        setError("Email already registered. Please sign in.");
        setLoading(false);
        return;
      }
      const newUser = {
        id: `user-${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password,
        role,
      };
      registered.push(newUser);
      localStorage.setItem("hm_registered", JSON.stringify(registered));
      setLoading(false);
      onAuth(newUser);
    } else {
      const registered = JSON.parse(
        localStorage.getItem("hm_registered") || "[]",
      );
      const found = registered.find(
        (u) =>
          u.email.toLowerCase().trim() === form.email.toLowerCase().trim() &&
          u.password === form.password,
      );
      if (!found) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      setLoading(false);
      onAuth(found);
    }
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
        <div className="card w-full max-w-md p-9">
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

          {mode === "signup" && (
            <div className="flex gap-2 bg-surface-2 p-1 rounded-full mb-6">
              {["candidate", "recruiter"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
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
                  required
                  placeholder="Ada Lovelace"
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
                required
                placeholder="you@example.com"
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
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-accent btn-lg w-full justify-center mt-1 disabled:opacity-60"
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
        </div>
      </div>
    </div>
  );
}
