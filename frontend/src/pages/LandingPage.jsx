const stats = [
  { value: "3x", label: "Faster Screening" },
  { value: "91%", label: "Match Accuracy" },
  { value: "0", label: "Resume Uploads" },
];

const features = [
  {
    icon: "🧠",
    title: "AI Conversation Builder",
    desc: "Just talk. Our AI turns your words into a structured, professional profile automatically.",
  },
  {
    icon: "⚡",
    title: "Smart Skill Mapping",
    desc: "AI detects your skills from context and suggests ones you might have missed.",
  },
  {
    icon: "🎯",
    title: "Role-Based Fit Score",
    desc: "Get matched to roles based on your actual profile, not keyword luck.",
  },
  {
    icon: "📤",
    title: "Export Anywhere",
    desc: "Generate a PDF resume or share a live profile link — your profile, your way.",
  },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-surface font-body">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-black/10">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <div className="flex gap-3 items-center">
          <button className="btn btn-ghost btn-sm" onClick={onGetStarted}>
            Log in
          </button>
          <button className="btn btn-accent btn-sm" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-10 pt-20 pb-16 text-center animate-fade-up">
        <span className="tag tag-accent mb-5 inline-flex">
          ✦ AI-Powered Hiring
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight mb-5">
          Your career story,
          <br />
          <span className="text-accent italic">told by AI.</span>
        </h1>
        <p className="text-ink-muted text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          No resume uploads. No formatting headaches. Just a conversation — and
          AI builds your complete professional profile in minutes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-14">
          <button className="btn btn-accent btn-lg" onClick={onGetStarted}>
            Build My Profile Free
          </button>
          <button className="btn btn-outline btn-lg" onClick={onGetStarted}>
            I'm a Recruiter →
          </button>
        </div>
        <div className="flex gap-12 justify-center border-t border-black/10 pt-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block font-display text-3xl font-extrabold">
                {s.value}
              </span>
              <span className="text-xs text-ink-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Demo chat */}
      <section className="max-w-2xl mx-auto px-10 pb-20">
        <div className="bg-ink rounded-3xl p-8">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-5">
            See it in action
          </p>
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm px-4 py-3.5 text-sm leading-relaxed max-w-xl">
              Hi! I'm your AI profile builder. Tell me — what have you been
              working on lately?
            </div>
            <div className="bg-accent text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm self-end max-w-md">
              I just finished a React dashboard for a fintech startup with
              real-time updates.
            </div>
            <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm px-4 py-3.5 text-sm leading-relaxed max-w-xl">
              <strong>Nice!</strong> I'm picking up: React, data visualization,
              real-time systems, fintech domain.
              <br />
              <br />
              Shall I also add WebSockets and charting libraries to your skills?
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-10 pb-24">
        <h2 className="font-display text-4xl font-extrabold text-center mb-12">
          Everything you need,
          <br />
          <em className="text-accent not-italic">nothing you don't.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-7">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display text-base font-bold mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white text-center py-20 px-10">
        <h2 className="font-display text-4xl font-extrabold mb-3">
          Ready to ditch the resume?
        </h2>
        <p className="text-white/60 mb-8">
          Join thousands of candidates getting hired smarter.
        </p>
        <button className="btn btn-accent btn-lg" onClick={onGetStarted}>
          Start Building →
        </button>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-10 py-6 border-t border-black/10">
        <span className="font-display text-lg font-extrabold">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <span className="text-ink-muted text-sm">
          © 2026 HireMe.ai. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
