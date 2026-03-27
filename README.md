# HireMe.ai — AI-Powered Recruitment Platform

> Replace resume uploads with intelligent, AI-guided profile building.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Groq AI](https://img.shields.io/badge/Groq-AI-black?style=flat-square)

---

## 🎯 Problem Statement

Traditional hiring is broken:

- Candidates waste hours formatting PDF resumes
- Recruiters receive hundreds of resumes and can't compare fairly
- Keyword-based parsing misses great candidates
- Bias creeps in through inconsistent resume formats

**HireMe.ai fixes this** by replacing the resume upload with an AI-guided conversation that builds a structured, professional profile automatically.

---

## ✨ What We Built

| Feature                  | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| 🧠 AI Profile Builder    | Candidates chat with Aria (Groq AI) to build their profile |
| ⚡ Smart Skill Detection | AI extracts and suggests skills from natural conversation  |
| 📊 Role Match Score      | Recruiters see a % match score per candidate               |
| 🔍 Recruiter Dashboard   | Filter, search, shortlist, and compare 60 candidates       |
| 📤 Export & Share        | Generate PDF resume or shareable profile link              |
| 💾 Auto-Save             | Profile saves automatically as you build                   |

---

## 🛠️ Tech Stack

### Frontend

| Tech             | Reason                                                    |
| ---------------- | --------------------------------------------------------- |
| **React 18**     | Component model ideal for multi-step conversational flows |
| **Vite**         | Fast dev server with instant HMR                          |
| **Tailwind CSS** | Utility-first styling with custom design tokens           |
| **Groq AI API**  | Powers Aria the AI profile builder (free, fast LLM)       |

### Backend

| Tech                  | Reason                          |
| --------------------- | ------------------------------- |
| **Node.js + Express** | Fast REST API, minimal setup    |
| **JWT**               | Stateless authentication        |
| **bcryptjs**          | Secure password hashing         |
| **dotenv**            | Environment variable management |

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+
- npm v9+
- A free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Clone the repo

```bash
git clone https://github.com/jaynuel10/hireme-ai.git
cd hireme-ai
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
PORT=5000
JWT_SECRET=hireme-secret-key-change-in-prod
GROQ_API_KEY=your-groq-api-key-here
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

You should see: `✅ HireMe.ai API running on port 5000`

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 How to Use

### As a Candidate

1. Click **Get Started**
2. Click **"Create account"** at the bottom of the sign in form
3. Fill in your name, email, password and select **Candidate**
4. Click **Create Account** — you go straight to the AI Profile Builder
5. Chat with Aria through 6 steps: Introduction, Experience, Skills, Projects, Education, Summary
6. Review your AI-generated profile and download as PDF

### As a Recruiter

1. Click **Get Started**
2. Click **"Create account"** and select **Recruiter**
3. Click **Create Account** — you go to the Recruiter Dashboard
4. Browse 60 candidates, search by skill or role, shortlist candidates
5. Click **View →** on any candidate to see their full profile

### Signing back in

After logging out, click **Get Started** — the page opens on **Sign In** by default. Enter your email and password to log back in.

---

## 📁 Project Structure

```
hireme-ai/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                    # Root router and state
│   │   ├── index.css                  # Tailwind + design system
│   │   ├── main.jsx                   # React entry point
│   │   └── pages/
│   │       ├── LandingPage.jsx        # Marketing homepage
│   │       ├── AuthPage.jsx           # Sign up / Sign in
│   │       ├── AIProfileBuilder.jsx   # 🌟 Core AI chat profile builder
│   │       ├── ProfilePreview.jsx     # Profile review + PDF export
│   │       ├── RecruiterDashboard.jsx # Candidate pool (60 candidates)
│   │       └── CandidateDetailView.jsx # Full candidate profile view
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/
│   ├── server.js                      # Express API + Groq AI proxy
│   ├── .env.example                   # Environment variable template
│   └── package.json
│
└── README.md
```

---

## 🧠 AI Interaction Design

The AI Profile Builder is the core of the product. It uses **Groq's LLaMA 3.3 70B** model via a secure backend proxy.

### 6-Step Guided Flow

1. **👋 Introduction** — Role, experience level, career goals
2. **💼 Experience** — Work history extracted from natural description
3. **🛠️ Skills** — AI detects skills from context + suggests missing ones
4. **🚀 Projects** — Project details structured automatically
5. **🎓 Education** — Quick academic background capture
6. **✨ Summary** — AI writes a compelling 3-sentence professional summary

### Example Interaction

```
User: "I built a React dashboard for a fintech startup with real-time data"
Aria: "Got it! I'm picking up: React, real-time systems, fintech domain,
       data visualization. Should I also add WebSockets to your skills?"
```

---

## 📊 Evaluation Criteria Coverage

| Criteria                    | Implementation                                                    |
| --------------------------- | ----------------------------------------------------------------- |
| UX Thinking (25%)           | 7-screen flow, role-based journeys, back navigation throughout    |
| AI Interaction Design (20%) | 6-step conversational builder, skill extraction, auto-summary     |
| Problem Solving (20%)       | Zero resume uploads, structured data from natural language        |
| Product Thinking (15%)      | Auto-save, progress tracking, PDF export, share link, match score |
| Visual Design (10%)         | Custom design system, Syne + DM Sans fonts, consistent theming    |
| Originality (10%)           | AI-native profile builder, no LinkedIn/Naukri UI patterns         |

---

## 🔐 Security Notes

- Passwords hashed with bcrypt (cost factor 10) for real users
- JWT tokens expire in 7 days
- Groq API key stored server-side only — never exposed to browser
- CORS configured to accept all origins for demo purposes

---

_Built for the Web Design Internship Assignment — HireMe.ai_
