import { useState } from "react";

export default function CandidateDetailView({ candidate, onBack }) {
  const [note, setNote] = useState("");
  const [action, setAction] = useState(null);
  if (!candidate) return null;
  const c = candidate;

  return (
    <div className="min-h-screen bg-surface font-body">
      <nav className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-black/10 bg-white sticky top-0 z-50">
        <span className="font-display text-lg md:text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <button className="btn btn-outline btn-sm" onClick={onBack}>
          ← Back to Candidates
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-10 py-6 md:py-8">
        {/* Header */}
        <div className="card p-5 md:p-7 mb-5 flex flex-col md:flex-row gap-4 md:gap-5 items-start">
          <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center font-display text-xl font-extrabold flex-shrink-0">
            {c.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-xl md:text-2xl font-extrabold mb-1">
              {c.name}
            </h1>
            <p className="text-sm text-ink-muted mb-0.5">
              {c.title} · {c.exp} experience
            </p>
            <p className="text-xs text-ink-muted mb-3">
              📍 {c.location} · Available in {c.available}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {c.skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center flex-shrink-0 w-full md:w-auto">
            <div className="font-display text-3xl md:text-4xl font-extrabold text-teal leading-none">
              {c.match}%
            </div>
            <div className="text-xs text-ink-muted uppercase tracking-wide mb-3">
              Role Match
            </div>
            <div className="flex flex-row md:flex-col gap-2 justify-center">
              <button
                onClick={() => setAction("shortlist")}
                className={`btn btn-sm ${action === "shortlist" ? "btn-accent" : "btn-outline"}`}
              >
                {action === "shortlist" ? "✓ Shortlisted" : "+ Shortlist"}
              </button>
              <button className="btn btn-outline btn-sm">📧 Message</button>
              <button
                onClick={() => setAction("reject")}
                className={`btn btn-ghost btn-sm ${action === "reject" ? "text-red-500" : ""}`}
              >
                {action === "reject" ? "✕ Rejected" : "✕ Pass"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
            <div className="card p-5 md:p-6">
              <div className="section-label">✨ AI Summary</div>
              <p className="text-sm leading-relaxed text-ink-soft">
                {c.name} is a {c.title} with {c.exp} of experience. Skilled in{" "}
                {c.skills.join(", ")}. Based in {c.location}, available{" "}
                {c.available}. A strong candidate for frontend and full-stack
                roles.
              </p>
            </div>

            <div className="card p-5 md:p-6">
              <div className="section-label">💼 Experience Highlights</div>
              <div className="flex items-baseline justify-between mb-2 mt-2">
                <strong className="text-sm">Senior Role · Tech Company</strong>
                <span className="text-xs text-ink-muted">2022 – Present</span>
              </div>
              <ul className="list-disc pl-4 flex flex-col gap-1">
                {[
                  "Led development of core product features used by 10k+ users",
                  "Mentored 2 junior developers",
                  "Reduced deployment time by 60% with CI/CD pipelines",
                ].map((b) => (
                  <li key={b} className="text-xs text-ink-soft">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5 md:p-6">
              <div className="section-label">📊 Skill Match</div>
              {[
                ["React", 95],
                ["Node.js", 88],
                ["TypeScript", 80],
                ["Communication", 90],
                ["Team Work", 92],
                ["Problem Solving", 87],
              ].map(([skill, val]) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 mb-2.5 last:mb-0"
                >
                  <span className="text-xs w-28 flex-shrink-0">{skill}</span>
                  <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                  <span className="text-xs text-ink-muted w-8 text-right">
                    {val}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            <div className="card p-5 md:p-6">
              <div className="section-label">📝 Notes</div>
              <textarea
                placeholder="Add private notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full border border-black/10 rounded-xl px-3 py-2.5 text-sm resize-none outline-none focus:border-accent transition-colors mb-3"
              />
              <button className="btn btn-outline btn-sm">Save Note</button>
            </div>

            <div className="card p-5 md:p-6">
              <div className="section-label">🔗 Quick Actions</div>
              <div className="flex flex-col gap-2">
                <button className="btn btn-outline btn-sm justify-start">
                  📄 Download PDF
                </button>
                <button className="btn btn-outline btn-sm justify-start">
                  📧 Interview Invite
                </button>
                <button className="btn btn-outline btn-sm justify-start">
                  👥 Compare
                </button>
              </div>
            </div>

            {action && (
              <div
                className={`rounded-xl px-4 py-3 text-sm font-semibold text-center ${
                  action === "shortlist"
                    ? "bg-teal-pale text-teal"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {action === "shortlist"
                  ? "✓ Added to shortlist!"
                  : "✕ Candidate passed."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
