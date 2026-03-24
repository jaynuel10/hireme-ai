import { useRef, useState } from "react";

export default function ProfilePreview({
  user,
  profileData,
  onEdit,
  onSubmit,
  onLogout,
}) {
  const [justSaved, setJustSaved] = useState(false);
  const printRef = useRef();

  const name = user?.name || "Your Name";
  const email = user?.email || "your@email.com";

  const introData = profileData?.intro?.aiSummary || "";
  const experienceData = profileData?.experience?.aiSummary || "";
  const skillsData = profileData?.skills?.aiSummary || "";
  const projectsData = profileData?.projects?.aiSummary || "";
  const educationData = profileData?.education?.aiSummary || "";
  const summaryData = profileData?.summary?.aiSummary || "";

  // Parse skills into tags
  const parseSkills = (text) => {
    if (!text) return [];
    const matches = text.match(/\*\*([^*]+)\*\*|`([^`]+)`/g) || [];
    if (matches.length > 2) {
      return matches
        .map((m) => m.replace(/\*\*|`/g, "").trim())
        .filter((s) => s.length > 1 && s.length < 40);
    }
    return text
      .split(/[,\n•\-–]/)
      .map((s) => s.replace(/[*`]/g, "").trim())
      .filter((s) => s.length > 1 && s.length < 40)
      .slice(0, 16);
  };

  const skills = parseSkills(skillsData);

  const sections = [
    introData,
    experienceData,
    skillsData,
    projectsData,
    educationData,
    summaryData,
  ];
  const filled = sections.filter((s) => s && s.length > 10).length;
  const completion = Math.round((filled / sections.length) * 100);

  // Save profile to localStorage manually
  const handleSave = () => {
    localStorage.setItem("hm_profile", JSON.stringify(profileData));
    localStorage.setItem("hm_user", JSON.stringify(user));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  // PDF download via browser print
  const handleDownloadPDF = () => {
    const style = `
      <style>
        body { font-family: Arial, sans-serif; color: #0A0A0F; padding: 40px; max-width: 800px; margin: 0 auto; font-size: 13px; line-height: 1.6; }
        h1 { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
        h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #888; border-bottom: 1px solid #eee; padding-bottom: 4px; margin: 18px 0 10px; }
        .meta { color: #666; font-size: 12px; margin-bottom: 16px; }
        .skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
        .skill { background: #f0f0f0; padding: 2px 10px; border-radius: 100px; font-size: 11px; }
        .section p { white-space: pre-wrap; margin: 0; }
        .badge { background: #FFF0EB; color: #FF4F1F; font-size: 10px; padding: 2px 8px; border-radius: 100px; font-weight: 600; display: inline-block; margin-bottom: 6px; }
      </style>
    `;

    const content = `
      <h1>${name}</h1>
      <div class="meta">📧 ${email}</div>
      ${summaryData ? `<h2>Professional Summary</h2><div class="badge">AI Written</div><div class="section"><p>${summaryData}</p></div>` : ""}
      ${experienceData ? `<h2>Experience</h2><div class="section"><p>${experienceData}</p></div>` : ""}
      ${projectsData ? `<h2>Projects</h2><div class="section"><p>${projectsData}</p></div>` : ""}
      ${skills.length > 0 ? `<h2>Skills</h2><div class="skills">${skills.map((s) => `<span class="skill">${s}</span>`).join("")}</div>` : ""}
      ${educationData ? `<h2>Education</h2><div class="section"><p>${educationData}</p></div>` : ""}
      ${introData ? `<h2>About</h2><div class="section"><p>${introData}</p></div>` : ""}
    `;

    const win = window.open("", "_blank");
    win.document.write(
      `<html><head><title>${name} - Resume</title>${style}</head><body>${content}</body></html>`,
    );
    win.document.close();
    win.focus();
    win.print();
  };

  // Copy share link
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Profile link copied to clipboard!"));
  };

  return (
    <div className="min-h-screen bg-surface font-body">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-black/10">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <div className="flex gap-2 flex-wrap justify-end">
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            🏠 Home
          </button>
          <button className="btn btn-outline btn-sm" onClick={onEdit}>
            ✏️ Edit
          </button>
          <button
            className={`btn btn-sm ${justSaved ? "btn-accent" : "btn-outline"}`}
            onClick={handleSave}
          >
            {justSaved ? "✓ Saved!" : "💾 Save Profile"}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleShare}>
            🔗 Share
          </button>
          <button className="btn btn-accent btn-sm" onClick={handleDownloadPDF}>
            ⬇ Download PDF
          </button>
        </div>
      </nav>

      {/* Saved toast */}
      {justSaved && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium animate-fade-up">
          ✓ Profile saved! You can come back anytime.
        </div>
      )}

      <div className="max-w-5xl mx-auto px-10 py-8">
        <div id="profile-print-area" ref={printRef}>
          {/* Header */}
          <div className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 bg-surface-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-teal whitespace-nowrap">
                {completion}% complete
              </span>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center font-display text-2xl font-extrabold flex-shrink-0">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="font-display text-2xl font-extrabold mb-1">
                  {name}
                </h1>
                <p className="text-ink-muted text-xs mb-3">📧 {email}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="tag tag-teal">✓ Open to Work</span>
                  <span className="tag">🌍 Remote Friendly</span>
                  <span className="tag">💼 Full-time</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Main */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {summaryData && (
                <div className="card p-6">
                  <div className="section-label">✨ Professional Summary</div>
                  <span className="inline-flex bg-accent-pale text-accent text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                    AI Written
                  </span>
                  <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                    {summaryData}
                  </p>
                </div>
              )}
              {experienceData && (
                <div className="card p-6">
                  <div className="section-label">💼 Experience</div>
                  <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                    {experienceData}
                  </p>
                </div>
              )}
              {projectsData && (
                <div className="card p-6">
                  <div className="section-label">🚀 Projects</div>
                  <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                    {projectsData}
                  </p>
                </div>
              )}
              {introData && (
                <div className="card p-6">
                  <div className="section-label">👋 About</div>
                  <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                    {introData}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {(skills.length > 0 || skillsData) && (
                <div className="card p-6">
                  <div className="section-label">🛠️ Skills</div>
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s, i) => (
                        <span key={i} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-ink-muted leading-relaxed whitespace-pre-wrap">
                      {skillsData}
                    </p>
                  )}
                </div>
              )}
              {educationData && (
                <div className="card p-6">
                  <div className="section-label">🎓 Education</div>
                  <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                    {educationData}
                  </p>
                </div>
              )}

              {/* Profile strength */}
              <div className="card p-6">
                <div className="section-label">📊 Profile Strength</div>
                {[
                  ["Introduction", introData],
                  ["Experience", experienceData],
                  ["Skills", skillsData],
                  ["Projects", projectsData],
                  ["Education", educationData],
                  ["Summary", summaryData],
                ].map(([label, val]) => {
                  const pct =
                    val && val.length > 10
                      ? Math.min(100, Math.round((val.length / 300) * 100) + 40)
                      : 0;
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-3 mb-2.5 last:mb-0"
                    >
                      <span className="text-xs w-20 flex-shrink-0">
                        {label}
                      </span>
                      <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background:
                              pct > 60
                                ? "#00C2A8"
                                : pct > 0
                                  ? "#FF4F1F"
                                  : "#E4E1DC",
                          }}
                        />
                      </div>
                      <span className="text-xs text-ink-muted w-8 text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Submit bar */}
        <div className="card flex items-center justify-between px-7 py-5">
          <div>
            <span className="tag tag-teal mr-3">✓ Profile Ready</span>
            <span className="text-xs text-ink-muted">
              Profile is auto-saved to your browser
            </span>
          </div>
          <button className="btn btn-accent btn-lg" onClick={onSubmit}>
            Submit Profile →
          </button>
        </div>
      </div>
    </div>
  );
}
