import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AIProfileBuilder from "./pages/AIProfileBuilder";
import ProfilePreview from "./pages/ProfilePreview";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDetailView from "./pages/CandidateDetailView";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [history, setHistory] = useState(["landing"]);

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
    const saved = localStorage.getItem(`hm_profile_${u.id}`);
    if (saved) setProfileData(JSON.parse(saved));
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

  return (
    <div className="app">
      {page === "landing" && (
        <LandingPage onGetStarted={() => navigate("auth")} />
      )}
      {page === "auth" && <AuthPage onAuth={handleAuth} onBack={goBack} />}
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
          onSubmit={() => {
            navigate("landing");
          }}
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
