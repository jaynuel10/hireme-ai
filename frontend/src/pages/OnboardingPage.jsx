const steps = [
  {
    icon: "💬",
    title: "Just talk to AI",
    desc: "Answer a few natural questions — no forms, no formatting.",
  },
  {
    icon: "✨",
    title: "AI structures it",
    desc: "Your answers become a polished, recruiter-ready profile.",
  },
  {
    icon: "🚀",
    title: "Get discovered",
    desc: "Share your profile link or export a PDF resume anytime.",
  },
];

export default function OnboardingPage({ user, onStart, onBack }) {
  return (
    <div className="min-h-screen bg-surface font-body">
      <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10 bg-white">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back
        </button>
      </nav>

      <div className="flex justify-center px-5 py-16">
        <div className="w-full max-w-lg animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-gold-pale text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            👋 Welcome, {user?.name || "there"}!
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight mb-4">
            Meet your AI
            <br />
            <span className="text-accent italic">profile builder</span>
          </h1>
          <p className="text-ink-muted text-base leading-relaxed mb-8">
            Forget resumes. In the next few minutes, I'll ask you some simple
            questions and build a complete professional profile — automatically.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 bg-white border border-black/10 rounded-xl"
              >
                <span className="text-2xl mt-0.5 flex-shrink-0">{s.icon}</span>
                <div>
                  <strong className="font-display text-sm block mb-0.5">
                    {s.title}
                  </strong>
                  <p className="text-xs text-ink-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 items-start bg-ink text-white rounded-2xl p-5 mb-8">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              ✦
            </div>
            <div className="text-sm leading-relaxed">
              <strong className="block mb-1">
                Hi! I'm Aria, your AI career assistant.
              </strong>
              I'll guide you through building your profile step by step. Just be
              honest and natural — I'll handle the rest.
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-outline" onClick={onBack}>
              ← Back
            </button>
            <button
              className="btn btn-accent btn-lg flex-1 justify-center"
              onClick={onStart}
            >
              Let's Build My Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
