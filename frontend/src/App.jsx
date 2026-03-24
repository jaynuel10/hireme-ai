import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
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

  // Navigate to a new page, pushing to history stack
  const navigate = (p, data = {}) => {
    setPage(p);
    setHistory((prev) => [...prev, p]);
    if (data.candidate) setSelectedCandidate(data.candidate);
  };

  // Go back one page
  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    const prevPage = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setPage(prevPage);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("hm_user", JSON.stringify(userData));

    // Load saved profile for candidates
    const savedProfile = localStorage.getItem(`hm_profile_${userData.id}`);
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }

    // Route strictly by role — no exceptions
    if (userData.role === "recruiter") {
      navigate("recruiter-dashboard");
    } else {
      navigate("ai-builder");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hm_user");
    localStorage.removeItem("token");
    setUser(null);
    setProfileData({});
    setHistory(["landing"]);
    setPage("landing");
  };

  const handleSetProfileData = (data) => {
    setProfileData(data);
    // Save per-user so different accounts don't share profiles
    if (user?.id) {
      localStorage.setItem(`hm_profile_${user.id}`, JSON.stringify(data));
    }
  };

  return (
    <div className="app">
      {page === "landing" && (
        <LandingPage
          onGetStarted={() => navigate("auth")}
          user={null} // Never show logged-in state on landing — user must log in each session
        />
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
            alert("✅ Profile submitted successfully!");
            navigate("landing");
          }}
        />
      )}
      {page === "recruiter-dashboard" && (
        <RecruiterDashboard
          user={user}
          onHome={() => {
            setHistory(["landing"]);
            setPage("landing");
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
