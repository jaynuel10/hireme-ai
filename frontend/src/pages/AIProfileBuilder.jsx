import { useState, useRef, useEffect } from "react";

const STEPS = [
  { key: "intro", label: "Introduction", icon: "👋" },
  { key: "experience", label: "Experience", icon: "💼" },
  { key: "skills", label: "Skills", icon: "🛠️" },
  { key: "projects", label: "Projects", icon: "🚀" },
  { key: "education", label: "Education", icon: "🎓" },
  { key: "summary", label: "Summary", icon: "✨" },
];

const STEP_PROMPTS = {
  intro: `You are Aria, a warm and helpful AI career assistant helping users build professional profiles — no resume upload needed.
Your job is to have a real back-and-forth conversation to collect the user's professional information.

For this INTRODUCTION step, find out:
- Their current job title or what they do
- How many years of experience they have
- What kind of opportunities they are looking for

IMPORTANT RULES:
- Read what the user actually typed and respond to it directly
- If they type gibberish or something unclear, politely ask them to clarify
- If they go off-topic, gently steer them back
- Never repeat the same response twice
- Keep responses under 80 words
- End every response with a follow-up question`,

  experience: `You are Aria, an AI career assistant helping a user build their professional profile.

For this EXPERIENCE step, collect:
- Job titles and company names
- How long they worked there
- Key responsibilities and achievements

IMPORTANT RULES:
- Read and respond to exactly what the user typed — don't give a generic response
- If their input is unclear or too vague, ask for more specific details
- If they type nonsense, ask them what they meant
- When you have enough detail, summarize it back in a structured format
- Never repeat the same message`,

  skills: `You are Aria, an AI career assistant helping a user build their professional profile.

For this SKILLS step:
- Look at everything the user has told you so far in this conversation
- Suggest specific skills based on what they actually mentioned
- Ask them to confirm, correct or add more
- Organize into: Technical Skills, Soft Skills, Tools & Platforms

IMPORTANT RULES:
- Base suggestions on what they actually told you — don't guess randomly
- If they type something unrelated or unclear, ask them to clarify
- Respond differently each time based on their actual input`,

  projects: `You are Aria, an AI career assistant helping a user build their professional profile.

For this PROJECTS step, collect:
- Project name
- Technologies or tools used
- Their specific role in the project
- The result or impact

IMPORTANT RULES:
- Respond to what the user actually typed, not a generic script
- If they describe a real project, ask follow-up questions about it specifically
- If their input is vague or unclear, ask for specifics
- Never give the same response regardless of input`,

  education: `You are Aria, an AI career assistant helping a user build their professional profile.

For this EDUCATION step, collect:
- Degree or certification name
- Institution or school
- Year of graduation
- Any notable achievements or relevant coursework

IMPORTANT RULES:
- Keep it conversational and brief
- Respond directly to what the user types
- If they type something irrelevant or unclear, ask them to clarify
- This step should be completed in 2-3 exchanges maximum`,

  summary: `You are Aria, an AI career assistant helping a user build their professional profile.

For this SUMMARY step:
- Review everything the user has shared throughout this entire conversation
- Write a compelling 3-sentence professional summary that captures their experience, skills, and goals
- Present it clearly and ask if they'd like any changes

IMPORTANT RULES:
- The summary must be based on what the user actually told you — not generic filler
- If you don't have enough information, ask for the missing pieces first
- Respond to any edit requests the user makes
- Once they approve, congratulate them and tell them their profile is ready`,
};

const API_BASE = "";

async function callAI(system, messages) {
  const response = await fetch(`${API_BASE}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages }),
  });
  const data = await response.json();
  if (!response.ok) {
    console.error("AI error response:", data);
    throw new Error(data.error || "AI request failed");
  }
  return data.text || "";
}

export default function AIProfileBuilder({
  user,
  profileData,
  setProfileData,
  onComplete,
  onBack,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  // conversationHistory holds ALL messages across ALL steps for full context
  const [conversationHistory, setConversationHistory] = useState([]);
  // displayMessages holds only what's shown in the current step's chat window
  const [displayMessages, setDisplayMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [stepComplete, setStepComplete] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const autoSaveTimer = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  useEffect(() => {
    startStep(0, []);
  }, []);

  // Auto-save
  useEffect(() => {
    if (displayMessages.length > 0) {
      clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => {
        setProfileData((prev) => ({
          ...prev,
          step: currentStep,
          conversation: conversationHistory,
        }));
        setSavedAt(new Date().toLocaleTimeString());
      }, 1500);
    }
    return () => clearTimeout(autoSaveTimer.current);
  }, [displayMessages]);

  const startStep = async (stepIndex, existingHistory) => {
    setIsLoading(true);
    setStepComplete(false);
    setError(null);
    setDisplayMessages([]);

    const systemPrompt = STEP_PROMPTS[STEPS[stepIndex].key];

    // Build the opening message for this step
    // Pass existing history so AI knows what was already discussed
    const contextNote =
      existingHistory.length > 0
        ? `Here is what the user has shared so far in previous steps:\n\n${existingHistory
            .filter((m) => m.role === "user")
            .map((m) => `- ${m.content}`)
            .join("\n")}\n\nNow start the ${STEPS[stepIndex].label} section.`
        : `Please start the ${STEPS[stepIndex].label} section of the profile builder.`;

    try {
      const text = await callAI(systemPrompt, [
        { role: "user", content: contextNote },
      ]);

      const aiMessage = { role: "ai", text };
      setDisplayMessages([aiMessage]);

      // Add to full conversation history
      const newHistory = [
        ...existingHistory,
        { role: "user", content: contextNote },
        { role: "assistant", content: text },
      ];
      setConversationHistory(newHistory);
    } catch (err) {
      setError(
        "Could not reach AI. Make sure backend is running and GEMINI_API_KEY is set in backend/.env",
      );
      setDisplayMessages([
        {
          role: "ai",
          text: `Let's talk about your ${STEPS[stepIndex].label}. What can you tell me?`,
        },
      ]);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput("");
    setError(null);

    // Add user message to display
    const newDisplayMessages = [
      ...displayMessages,
      { role: "user", text: userText },
    ];
    setDisplayMessages(newDisplayMessages);
    setIsLoading(true);

    // Build full API message history for this step's conversation
    // so AI remembers everything said in this step
    const stepApiMessages = newDisplayMessages.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    const systemWithSignal =
      STEP_PROMPTS[STEPS[currentStep].key] +
      `\n\nCRITICAL: You MUST read the user's latest message carefully and respond to it specifically.
If it's gibberish or unclear, say so politely and ask them to clarify.
If it's off-topic, gently redirect them.
NEVER give a generic or repeated response — always address what the user actually wrote.

When you have genuinely collected enough information for this section, add [STEP_READY] at the very end of your message. Do not add it prematurely.`;

    try {
      const raw = await callAI(systemWithSignal, stepApiMessages);
      const isReady = raw.includes("[STEP_READY]");
      const aiText = raw.replace("[STEP_READY]", "").trim();

      setDisplayMessages([...newDisplayMessages, { role: "ai", text: aiText }]);

      // Update full conversation history
      const updatedHistory = [
        ...conversationHistory,
        { role: "user", content: userText },
        { role: "assistant", content: aiText },
      ];
      setConversationHistory(updatedHistory);

      // Save step data
      setProfileData((prev) => ({
        ...prev,
        [STEPS[currentStep].key]: {
          aiSummary: aiText,
          conversationLength: newDisplayMessages.length,
        },
      }));

      if (isReady) setStepComplete(true);
    } catch (err) {
      setError(`AI error: ${err.message}`);
      setDisplayMessages([
        ...newDisplayMessages,
        { role: "ai", text: "I had trouble responding. Please try again." },
      ]);
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      startStep(next, conversationHistory);
    } else {
      // Pass the full profileData back so App.jsx can save it
      onComplete(profileData);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col font-body bg-surface">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10 bg-white sticky top-0 z-50">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back
        </button>
        <span className="text-xs font-medium text-teal">
          {savedAt ? `✓ Saved at ${savedAt}` : "Auto-saving..."}
        </span>
      </nav>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 61px)" }}
      >
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-black/10 flex flex-col p-6 overflow-y-auto flex-shrink-0">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">
            Profile Builder
          </p>
          <div className="w-full h-0.5 bg-surface-3 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {STEPS.map((s, i) => (
              <div
                key={s.key}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  i === currentStep
                    ? "bg-accent-pale text-accent font-semibold"
                    : i < currentStep
                      ? "text-teal"
                      : "text-ink-muted"
                }`}
              >
                <span className="w-5 text-center text-base">
                  {i < currentStep ? "✓" : s.icon}
                </span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-surface-2 rounded-xl p-4 text-xs text-ink-muted leading-relaxed">
            <strong className="text-ink">💡 Tip:</strong> Be specific — the more
            detail you share, the better your profile!
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-4 border-b border-black/10 bg-white">
            <div className="flex items-center gap-2 font-display font-bold text-base">
              <span>{STEPS[currentStep].icon}</span>
              <span>{STEPS[currentStep].label}</span>
              <span className="ml-auto text-xs font-normal text-ink-muted">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
          </div>

          {/* Welcome banner — only on first step */}
          {currentStep === 0 && (
            <div className="mx-8 mt-6 bg-ink text-white rounded-2xl p-5 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs flex-shrink-0">
                ✦
              </div>
              <div className="text-sm leading-relaxed">
                <strong className="block mb-1">
                  👋 Welcome, {user?.name || "there"}!
                </strong>
                I'm Aria, your AI career assistant. I'll guide you through
                building your professional profile step by step — no resume
                needed. Just answer my questions naturally and I'll handle the
                rest!
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mx-8 mt-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-4">
            {displayMessages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {m.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✦
                  </div>
                )}
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap px-4 py-3 rounded-2xl ${
                    m.role === "ai"
                      ? "bg-ink text-white rounded-bl-sm max-w-xl"
                      : "bg-surface-2 text-ink rounded-br-sm max-w-lg"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs flex-shrink-0">
                  ✦
                </div>
                <div className="bg-ink text-white rounded-2xl rounded-bl-sm px-4 py-3.5 flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-black/10 bg-white px-8 py-4 flex flex-col gap-3">
            {stepComplete && (
              <div className="flex items-center justify-between bg-teal-pale rounded-xl px-4 py-2.5">
                <span className="text-sm font-medium text-teal">
                  ✓ Great! Ready to move on?
                </span>
                <button className="btn btn-accent btn-sm" onClick={nextStep}>
                  {currentStep < STEPS.length - 1
                    ? `Next: ${STEPS[currentStep + 1].label} →`
                    : "Review Profile →"}
                </button>
              </div>
            )}
            <div className="flex gap-3 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer here..."
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 border border-black/10 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-accent transition-colors"
              />
              <button
                className="btn btn-accent px-5 py-3 self-end disabled:opacity-50"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
            <p className="text-xs text-ink-muted">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
