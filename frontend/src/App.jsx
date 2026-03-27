import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AIProfileBuilder from "./pages/AIProfileBuilder";
import ProfilePreview from "./pages/ProfilePreview";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDetailView from "./pages/CandidateDetailView";
import "./index.css";

const DEMO_USERS = [
  {
    id: "demo-1",
    name: "Demo Candidate",
    email: "hire-me@anshumat.org",
    password: "HireMe@2025!",
    role: "candidate",
  },
  {
    id: "demo-2",
    name: "Demo Recruiter",
    email: "recruiter@anshumat.org",
    password: "HireMe@2025!",
    role: "recruiter",
  },
];

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [history, setHistory] = useState(["landing"]);
  const [authError, setAuthError] = useState("");

  const navigate = (p, data = {}) => {
    setPage(p);
    setHistory((prev) => [...prev, p]);
    if (data.candidate) setSelectedCandidate(data.candidate);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setPage(newHistory[newHistory.length - 1]);
  };

  const handleAuth = (userData) => {
    const u = { ...userData, role: userData.role || "candidate" };
    setUser(u);
    localStorage.setItem("hm_user", JSON.stringify(u));
    try {
      const saved = localStorage.getItem(`hm_profile_${u.id}`);
      if (saved) setProfileData(JSON.parse(saved));
    } catch (e) {
      console.log("No saved profile");
    }
    if (u.role === "recruiter") {
      setPage("recruiter-dashboard");
    } else {
      setPage("ai-builder");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hm_user");
    setUser(null);
    setProfileData({});
    setPage("landing");
    setHistory(["landing"]);
  };

  const handleSetProfileData = (data) => {
    setProfileData(data);
    if (user?.id) {
      localStorage.setItem(`hm_profile_${user.id}`, JSON.stringify(data));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const registered = JSON.parse(
      localStorage.getItem("hm_registered") || "[]",
    );
    const allUsers = [...DEMO_USERS, ...registered];
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    );
    if (found) {
      handleAuth(found);
    } else {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setAuthError("");
    const name = e.target.uname.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const role = e.target.role.value || "candidate";
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    const registered = JSON.parse(
      localStorage.getItem("hm_registered") || "[]",
    );
    const allUsers = [...DEMO_USERS, ...registered];
    if (allUsers.find((u) => u.email.toLowerCase() === email)) {
      setAuthError("Email already registered. Please sign in.");
      return;
    }
    const newUser = { id: `user-${Date.now()}`, name, email, password, role };
    registered.push(newUser);
    localStorage.setItem("hm_registered", JSON.stringify(registered));
    handleAuth(newUser);
  };

  return (
    <div className="app">
      {page === "landing" && (
        <LandingPage
          onGetStarted={() => {
            setAuthError("");
            navigate("auth");
          }}
        />
      )}

      {page === "auth" && (
        <div className="min-h-screen bg-surface font-body">
          <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10">
            <span className="font-display text-xl font-extrabold tracking-tight">
              Hire<span className="text-accent">Me</span>.ai
            </span>
            <button className="btn btn-ghost btn-sm" onClick={goBack}>
              ← Back
            </button>
          </nav>
          <div className="flex justify-center items-center px-5 py-16">
            <div className="card w-full max-w-md p-9">
              <div className="text-center mb-7">
                <h2 className="font-display text-2xl font-extrabold mb-1.5">
                  Welcome back
                </h2>
                <p className="text-ink-muted text-sm">Sign in to continue</p>
              </div>
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">
                  ⚠️ {authError}
                </div>
              )}
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-accent btn-lg w-full justify-center mt-1"
                >
                  Sign In
                </button>
              </form>
              <p className="text-center mt-5 text-sm text-ink-muted">
                New here?{" "}
                <button
                  className="text-accent font-medium underline"
                  onClick={() => {
                    setAuthError("");
                    navigate("signup");
                  }}
                >
                  Create account
                </button>
              </p>
              <div className="mt-5 bg-surface-2 rounded-lg px-4 py-3 text-xs text-ink-muted text-center leading-relaxed">
                <strong className="text-ink block mb-1">🔑 Demo Login</strong>
                Candidate: hire-me@anshumat.org / HireMe@2025!
                <br />
                Recruiter: recruiter@anshumat.org / HireMe@2025!
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "signup" && (
        <div className="min-h-screen bg-surface font-body">
          <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10">
            <span className="font-display text-xl font-extrabold tracking-tight">
              Hire<span className="text-accent">Me</span>.ai
            </span>
            <button className="btn btn-ghost btn-sm" onClick={goBack}>
              ← Back
            </button>
          </nav>
          <div className="flex justify-center items-center px-5 py-16">
            <div className="card w-full max-w-md p-9">
              <div className="text-center mb-7">
                <h2 className="font-display text-2xl font-extrabold mb-1.5">
                  Create your account
                </h2>
                <p className="text-ink-muted text-sm">
                  Start building your AI profile
                </p>
              </div>
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">
                  ⚠️ {authError}
                </div>
              )}
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div
                  id="role-selector"
                  className="flex gap-2 bg-surface-2 p-1 rounded-full"
                >
                  {["candidate", "recruiter"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={(e) => {
                        document.getElementById("role-val").value = r;
                        e.currentTarget.parentNode
                          .querySelectorAll("button")
                          .forEach(
                            (b) =>
                              (b.className =
                                "flex-1 py-2 rounded-full text-sm font-medium text-ink-muted transition-all"),
                          );
                        e.currentTarget.className =
                          "flex-1 py-2 rounded-full text-sm font-medium bg-white text-ink shadow-sm transition-all";
                      }}
                      className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${r === "candidate" ? "bg-white text-ink shadow-sm" : "text-ink-muted"}`}
                    >
                      {r === "candidate" ? "👤 Candidate" : "🔍 Recruiter"}
                    </button>
                  ))}
                </div>
                <input
                  id="role-val"
                  name="role"
                  type="hidden"
                  defaultValue="candidate"
                />
                <div>
                  <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="uname"
                    type="text"
                    placeholder="Ada Lovelace"
                    required
                    className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    required
                    className="w-full border border-black/10 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-accent btn-lg w-full justify-center mt-1"
                >
                  Create Account
                </button>
              </form>
              <p className="text-center mt-5 text-sm text-ink-muted">
                Already have an account?{" "}
                <button
                  className="text-accent font-medium underline"
                  onClick={() => {
                    setAuthError("");
                    navigate("auth");
                  }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {page === "ai-builder" && (
        <AIProfileBuilder
          user={user}
          profileData={profileData}
          setProfileData={handleSetProfileData}
          onComplete={() => navigate("profile-preview")}
          onBack={goBack}
        />
      )}
      {page === "profile-preview" && (
        <ProfilePreview
          user={user}
          profileData={profileData}
          onEdit={() => navigate("ai-builder")}
          onLogout={handleLogout}
          onBack={goBack}
          onSubmit={() => navigate("landing")}
        />
      )}
      {page === "recruiter-dashboard" && (
        <RecruiterDashboard
          user={user}
          onHome={() => {
            setPage("landing");
            setHistory(["landing"]);
          }}
          onLogout={handleLogout}
          onViewCandidate={(c) =>
            navigate("candidate-detail", { candidate: c })
          }
        />
      )}
      {page === "candidate-detail" && (
        <CandidateDetailView candidate={selectedCandidate} onBack={goBack} />
      )}
    </div>
  );
}
