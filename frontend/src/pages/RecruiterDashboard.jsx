import { useState } from "react";

const CANDIDATES = [
  {
    id: 1,
    name: "Amara Osei",
    title: "Frontend Developer",
    exp: "3 yrs",
    match: 96,
    skills: ["React", "TypeScript", "Node.js"],
    status: "shortlisted",
    location: "Lagos, NG",
    available: "Immediately",
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Full Stack Engineer",
    exp: "5 yrs",
    match: 91,
    skills: ["React", "Python", "AWS"],
    status: "new",
    location: "Remote",
    available: "2 weeks",
  },
  {
    id: 3,
    name: "Kwame Asante",
    title: "UI/UX + Frontend",
    exp: "2 yrs",
    match: 88,
    skills: ["React", "Figma", "CSS"],
    status: "new",
    location: "Accra, GH",
    available: "Immediately",
  },
  {
    id: 4,
    name: "Sofia Mendes",
    title: "Backend Developer",
    exp: "4 yrs",
    match: 84,
    skills: ["Node.js", "PostgreSQL", "Docker"],
    status: "reviewed",
    location: "Remote",
    available: "1 month",
  },
  {
    id: 5,
    name: "Liam Carter",
    title: "React Native Dev",
    exp: "3 yrs",
    match: 79,
    skills: ["React Native", "Expo", "Firebase"],
    status: "new",
    location: "London, UK",
    available: "2 weeks",
  },
  {
    id: 6,
    name: "Fatima Al-Rashid",
    title: "Data Engineer",
    exp: "4 yrs",
    match: 87,
    skills: ["Python", "Spark", "Airflow"],
    status: "new",
    location: "Dubai, UAE",
    available: "1 month",
  },
  {
    id: 7,
    name: "Chidi Okeke",
    title: "DevOps Engineer",
    exp: "6 yrs",
    match: 93,
    skills: ["Kubernetes", "Terraform", "CI/CD"],
    status: "shortlisted",
    location: "Lagos, NG",
    available: "Immediately",
  },
  {
    id: 8,
    name: "Yuna Park",
    title: "Product Designer",
    exp: "3 yrs",
    match: 82,
    skills: ["Figma", "Prototyping", "User Research"],
    status: "reviewed",
    location: "Seoul, KR",
    available: "2 weeks",
  },
  {
    id: 9,
    name: "Marcus Silva",
    title: "Machine Learning Engineer",
    exp: "5 yrs",
    match: 90,
    skills: ["Python", "TensorFlow", "PyTorch"],
    status: "new",
    location: "São Paulo, BR",
    available: "1 month",
  },
  {
    id: 10,
    name: "Aisha Diallo",
    title: "Mobile Developer",
    exp: "3 yrs",
    match: 78,
    skills: ["Flutter", "Dart", "Firebase"],
    status: "new",
    location: "Dakar, SN",
    available: "Immediately",
  },
  {
    id: 11,
    name: "Ethan Brooks",
    title: "Backend Engineer",
    exp: "4 yrs",
    match: 85,
    skills: ["Java", "Spring Boot", "MySQL"],
    status: "reviewed",
    location: "Toronto, CA",
    available: "2 weeks",
  },
  {
    id: 12,
    name: "Zara Ahmed",
    title: "Frontend Engineer",
    exp: "2 yrs",
    match: 80,
    skills: ["Vue.js", "Tailwind CSS", "GraphQL"],
    status: "new",
    location: "Karachi, PK",
    available: "Immediately",
  },
  {
    id: 13,
    name: "Kofi Mensah",
    title: "Cloud Architect",
    exp: "7 yrs",
    match: 94,
    skills: ["AWS", "GCP", "Microservices"],
    status: "shortlisted",
    location: "Accra, GH",
    available: "1 month",
  },
  {
    id: 14,
    name: "Isabella Rossi",
    title: "Full Stack Developer",
    exp: "4 yrs",
    match: 89,
    skills: ["React", "Django", "PostgreSQL"],
    status: "new",
    location: "Milan, IT",
    available: "2 weeks",
  },
  {
    id: 15,
    name: "Tariq Hassan",
    title: "Cybersecurity Analyst",
    exp: "5 yrs",
    match: 76,
    skills: ["Penetration Testing", "SIEM", "Networking"],
    status: "new",
    location: "Cairo, EG",
    available: "1 month",
  },
  {
    id: 16,
    name: "Nina Volkov",
    title: "Data Scientist",
    exp: "4 yrs",
    match: 88,
    skills: ["Python", "R", "Tableau"],
    status: "reviewed",
    location: "Moscow, RU",
    available: "Immediately",
  },
  {
    id: 17,
    name: "Diego Reyes",
    title: "iOS Developer",
    exp: "3 yrs",
    match: 81,
    skills: ["Swift", "SwiftUI", "Xcode"],
    status: "new",
    location: "Mexico City, MX",
    available: "2 weeks",
  },
  {
    id: 18,
    name: "Blessing Adeyemi",
    title: "QA Engineer",
    exp: "3 yrs",
    match: 74,
    skills: ["Selenium", "Jest", "Cypress"],
    status: "new",
    location: "Abuja, NG",
    available: "Immediately",
  },
  {
    id: 19,
    name: "Sven Lindqvist",
    title: "Systems Architect",
    exp: "8 yrs",
    match: 92,
    skills: ["System Design", "Java", "Kafka"],
    status: "shortlisted",
    location: "Stockholm, SE",
    available: "1 month",
  },
  {
    id: 20,
    name: "Mei Lin",
    title: "Android Developer",
    exp: "4 yrs",
    match: 83,
    skills: ["Kotlin", "Jetpack Compose", "Android SDK"],
    status: "reviewed",
    location: "Shanghai, CN",
    available: "2 weeks",
  },
  {
    id: 21,
    name: "Olumide Adebayo",
    title: "Frontend Developer",
    exp: "2 yrs",
    match: 77,
    skills: ["React", "JavaScript", "SASS"],
    status: "new",
    location: "Lagos, NG",
    available: "Immediately",
  },
  {
    id: 22,
    name: "Hana Kimura",
    title: "UX Researcher",
    exp: "3 yrs",
    match: 79,
    skills: ["User Interviews", "Wireframing", "Usability Testing"],
    status: "new",
    location: "Tokyo, JP",
    available: "2 weeks",
  },
  {
    id: 23,
    name: "Ravi Patel",
    title: "Backend Developer",
    exp: "5 yrs",
    match: 86,
    skills: ["Go", "gRPC", "Redis"],
    status: "reviewed",
    location: "Bangalore, IN",
    available: "1 month",
  },
  {
    id: 24,
    name: "Amina Touré",
    title: "Product Manager",
    exp: "6 yrs",
    match: 91,
    skills: ["Roadmapping", "Agile", "Data Analysis"],
    status: "shortlisted",
    location: "Abidjan, CI",
    available: "Immediately",
  },
  {
    id: 25,
    name: "Felix Wagner",
    title: "Blockchain Developer",
    exp: "3 yrs",
    match: 75,
    skills: ["Solidity", "Web3.js", "Ethereum"],
    status: "new",
    location: "Berlin, DE",
    available: "2 weeks",
  },
  {
    id: 26,
    name: "Chioma Eze",
    title: "Full Stack Engineer",
    exp: "4 yrs",
    match: 87,
    skills: ["Next.js", "Node.js", "MongoDB"],
    status: "new",
    location: "Enugu, NG",
    available: "Immediately",
  },
  {
    id: 27,
    name: "Andrés García",
    title: "Data Analyst",
    exp: "3 yrs",
    match: 80,
    skills: ["SQL", "Power BI", "Excel"],
    status: "reviewed",
    location: "Bogotá, CO",
    available: "1 month",
  },
  {
    id: 28,
    name: "Lena Müller",
    title: "ML Engineer",
    exp: "4 yrs",
    match: 89,
    skills: ["Scikit-learn", "MLflow", "Docker"],
    status: "new",
    location: "Munich, DE",
    available: "2 weeks",
  },
  {
    id: 29,
    name: "Emeka Nwosu",
    title: "Software Engineer",
    exp: "5 yrs",
    match: 90,
    skills: ["C++", "Python", "Linux"],
    status: "shortlisted",
    location: "Port Harcourt, NG",
    available: "Immediately",
  },
  {
    id: 30,
    name: "Sara Johansson",
    title: "Frontend Developer",
    exp: "2 yrs",
    match: 76,
    skills: ["Angular", "TypeScript", "RxJS"],
    status: "new",
    location: "Gothenburg, SE",
    available: "2 weeks",
  },
  {
    id: 31,
    name: "Nnamdi Obi",
    title: "Cloud Engineer",
    exp: "4 yrs",
    match: 88,
    skills: ["Azure", "Terraform", "Python"],
    status: "reviewed",
    location: "Lagos, NG",
    available: "1 month",
  },
  {
    id: 32,
    name: "Valentina Cruz",
    title: "UI Designer",
    exp: "3 yrs",
    match: 78,
    skills: ["Figma", "Adobe XD", "Sketch"],
    status: "new",
    location: "Buenos Aires, AR",
    available: "Immediately",
  },
  {
    id: 33,
    name: "James Oduya",
    title: "DevOps Engineer",
    exp: "5 yrs",
    match: 91,
    skills: ["Jenkins", "Docker", "AWS"],
    status: "shortlisted",
    location: "Nairobi, KE",
    available: "2 weeks",
  },
  {
    id: 34,
    name: "Chloe Dubois",
    title: "Backend Engineer",
    exp: "3 yrs",
    match: 82,
    skills: ["PHP", "Laravel", "MySQL"],
    status: "new",
    location: "Paris, FR",
    available: "1 month",
  },
  {
    id: 35,
    name: "Tunde Fashola",
    title: "React Developer",
    exp: "3 yrs",
    match: 84,
    skills: ["React", "Redux", "REST APIs"],
    status: "reviewed",
    location: "Ibadan, NG",
    available: "Immediately",
  },
  {
    id: 36,
    name: "Akira Tanaka",
    title: "Game Developer",
    exp: "4 yrs",
    match: 72,
    skills: ["Unity", "C#", "Blender"],
    status: "new",
    location: "Osaka, JP",
    available: "2 weeks",
  },
  {
    id: 37,
    name: "Ngozi Okonkwo",
    title: "Data Engineer",
    exp: "5 yrs",
    match: 86,
    skills: ["dbt", "BigQuery", "Python"],
    status: "new",
    location: "Lagos, NG",
    available: "1 month",
  },
  {
    id: 38,
    name: "Pedro Alves",
    title: "Full Stack Developer",
    exp: "4 yrs",
    match: 85,
    skills: ["React", "Node.js", "PostgreSQL"],
    status: "shortlisted",
    location: "Lisbon, PT",
    available: "Immediately",
  },
  {
    id: 39,
    name: "Adaeze Obi",
    title: "Frontend Engineer",
    exp: "2 yrs",
    match: 79,
    skills: ["React", "CSS", "Figma"],
    status: "new",
    location: "Owerri, NG",
    available: "2 weeks",
  },
  {
    id: 40,
    name: "Kim Soo-Jin",
    title: "Software Engineer",
    exp: "6 yrs",
    match: 93,
    skills: ["Java", "Microservices", "Kafka"],
    status: "reviewed",
    location: "Busan, KR",
    available: "1 month",
  },
  {
    id: 41,
    name: "Abebe Girma",
    title: "Backend Developer",
    exp: "3 yrs",
    match: 81,
    skills: ["Python", "FastAPI", "PostgreSQL"],
    status: "new",
    location: "Addis Ababa, ET",
    available: "Immediately",
  },
  {
    id: 42,
    name: "Hannah Schmidt",
    title: "Product Designer",
    exp: "4 yrs",
    match: 83,
    skills: ["Figma", "Design Systems", "Prototyping"],
    status: "new",
    location: "Hamburg, DE",
    available: "2 weeks",
  },
  {
    id: 43,
    name: "Ifeanyi Chukwu",
    title: "Node.js Developer",
    exp: "3 yrs",
    match: 80,
    skills: ["Node.js", "Express", "MongoDB"],
    status: "reviewed",
    location: "Lagos, NG",
    available: "1 month",
  },
  {
    id: 44,
    name: "Lucia Fernández",
    title: "QA Automation Engineer",
    exp: "4 yrs",
    match: 77,
    skills: ["Selenium", "TestNG", "Java"],
    status: "new",
    location: "Madrid, ES",
    available: "Immediately",
  },
  {
    id: 45,
    name: "Tobias Eriksson",
    title: "Site Reliability Engineer",
    exp: "6 yrs",
    match: 92,
    skills: ["Kubernetes", "Prometheus", "Go"],
    status: "shortlisted",
    location: "Malmö, SE",
    available: "2 weeks",
  },
  {
    id: 46,
    name: "Chiamaka Nnadi",
    title: "Data Scientist",
    exp: "3 yrs",
    match: 85,
    skills: ["Python", "Pandas", "Scikit-learn"],
    status: "new",
    location: "Abuja, NG",
    available: "1 month",
  },
  {
    id: 47,
    name: "Omar Shaikh",
    title: "Full Stack Engineer",
    exp: "5 yrs",
    match: 88,
    skills: ["Vue.js", "Laravel", "MySQL"],
    status: "reviewed",
    location: "Lahore, PK",
    available: "Immediately",
  },
  {
    id: 48,
    name: "Nneka Okafor",
    title: "Mobile Developer",
    exp: "2 yrs",
    match: 74,
    skills: ["React Native", "JavaScript", "Firebase"],
    status: "new",
    location: "Lagos, NG",
    available: "2 weeks",
  },
  {
    id: 49,
    name: "Carlos Herrera",
    title: "Cloud Architect",
    exp: "7 yrs",
    match: 95,
    skills: ["AWS", "Serverless", "DevOps"],
    status: "shortlisted",
    location: "Monterrey, MX",
    available: "1 month",
  },
  {
    id: 50,
    name: "Yemi Adebisi",
    title: "Software Engineer",
    exp: "4 yrs",
    match: 87,
    skills: ["Python", "Django", "Redis"],
    status: "new",
    location: "Lagos, NG",
    available: "Immediately",
  },
  {
    id: 51,
    name: "Astrid Nilsson",
    title: "Frontend Developer",
    exp: "3 yrs",
    match: 81,
    skills: ["React", "Next.js", "Styled Components"],
    status: "new",
    location: "Oslo, NO",
    available: "2 weeks",
  },
  {
    id: 52,
    name: "Babatunde Afolabi",
    title: "DevOps Engineer",
    exp: "4 yrs",
    match: 86,
    skills: ["GitLab CI", "Docker", "Ansible"],
    status: "reviewed",
    location: "Lagos, NG",
    available: "1 month",
  },
  {
    id: 53,
    name: "Elena Popescu",
    title: "Backend Engineer",
    exp: "5 yrs",
    match: 89,
    skills: ["C#", ".NET", "SQL Server"],
    status: "new",
    location: "Bucharest, RO",
    available: "Immediately",
  },
  {
    id: 54,
    name: "Taiwo Ogunleye",
    title: "React Developer",
    exp: "2 yrs",
    match: 76,
    skills: ["React", "JavaScript", "Bootstrap"],
    status: "new",
    location: "Abeokuta, NG",
    available: "2 weeks",
  },
  {
    id: 55,
    name: "Hiroshi Yamamoto",
    title: "AI Engineer",
    exp: "5 yrs",
    match: 92,
    skills: ["Python", "LangChain", "OpenAI API"],
    status: "shortlisted",
    location: "Kyoto, JP",
    available: "1 month",
  },
  {
    id: 56,
    name: "Adaora Ibe",
    title: "UX Designer",
    exp: "3 yrs",
    match: 78,
    skills: ["Figma", "User Research", "Wireframing"],
    status: "new",
    location: "Lagos, NG",
    available: "Immediately",
  },
  {
    id: 57,
    name: "Mateus Costa",
    title: "Full Stack Developer",
    exp: "4 yrs",
    match: 84,
    skills: ["React", "Node.js", "GraphQL"],
    status: "reviewed",
    location: "Recife, BR",
    available: "2 weeks",
  },
  {
    id: 58,
    name: "Grace Owusu",
    title: "Data Analyst",
    exp: "3 yrs",
    match: 79,
    skills: ["SQL", "Tableau", "Excel"],
    status: "new",
    location: "Kumasi, GH",
    available: "1 month",
  },
  {
    id: 59,
    name: "Viktor Petrov",
    title: "Backend Developer",
    exp: "6 yrs",
    match: 91,
    skills: ["Rust", "Go", "gRPC"],
    status: "shortlisted",
    location: "Kyiv, UA",
    available: "Immediately",
  },
  {
    id: 60,
    name: "Sade Olamide",
    title: "Frontend Engineer",
    exp: "3 yrs",
    match: 82,
    skills: ["React", "TypeScript", "Tailwind CSS"],
    status: "new",
    location: "Lagos, NG",
    available: "2 weeks",
  },
];

const STATUS_CLS = {
  shortlisted: "tag-teal",
  new: "tag-accent",
  reviewed: "tag-gold",
};

export default function RecruiterDashboard({
  user,
  onViewCandidate,
  onHome,
  onLogout,
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [shortlisted, setShortlisted] = useState(
    new Set([1, 7, 13, 19, 24, 29, 33, 38, 45, 49, 55, 59]),
  );

  const filtered = CANDIDATES.filter((c) => {
    const matchesFilter =
      filter === "all" ||
      c.status === filter ||
      (filter === "shortlisted" && shortlisted.has(c.id));
    const q = search.toLowerCase();
    return (
      matchesFilter &&
      (!q ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q)))
    );
  });

  const toggleShortlist = (id) =>
    setShortlisted((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="min-h-screen bg-surface font-body">
      <nav className="flex items-center justify-between px-10 py-4 border-b border-black/10 bg-white sticky top-0 z-50">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Hire<span className="text-accent">Me</span>.ai
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-muted">Recruiter Dashboard</span>
          <button className="btn btn-outline btn-sm" onClick={onHome}>
            🏠 Home
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            Log out
          </button>
          <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center font-display font-bold text-sm">
            {(user?.name || "R").charAt(0)}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-10 py-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl font-extrabold mb-0.5">
              Candidate Pool
            </h2>
            <p className="text-sm text-ink-muted">
              {filtered.length} of {CANDIDATES.length} candidates ·{" "}
              {shortlisted.size} shortlisted
            </p>
          </div>
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent w-72 transition-colors"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {["all", "new", "reviewed", "shortlisted"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border transition-all ${
                filter === f
                  ? "bg-ink text-white border-ink"
                  : "border-black/20 text-ink-muted hover:bg-surface-2"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "shortlisted" && (
                <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  {shortlisted.size}
                </span>
              )}
              {f === "all" && (
                <span className="bg-surface-3 text-ink-muted text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  {CANDIDATES.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="card flex gap-4 items-center px-5 py-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-full bg-surface-3 text-ink flex items-center justify-center font-display font-bold text-base flex-shrink-0">
                {c.name.charAt(0)}
              </div>
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => onViewCandidate(c)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-sm">{c.name}</strong>
                  <span className={`tag ${STATUS_CLS[c.status] || ""}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-2 flex-wrap">
                  <span>{c.title}</span>
                  <span className="opacity-40">·</span>
                  <span>{c.exp} exp</span>
                  <span className="opacity-40">·</span>
                  <span>📍 {c.location}</span>
                  <span className="opacity-40">·</span>
                  <span>🕐 {c.available}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="text-center">
                  <span className="block font-display text-xl font-extrabold text-teal leading-none">
                    {c.match}%
                  </span>
                  <span className="text-xs text-ink-muted uppercase tracking-wide">
                    match
                  </span>
                </div>
                <button
                  onClick={() => toggleShortlist(c.id)}
                  className={`btn btn-sm ${shortlisted.has(c.id) ? "btn-accent" : "btn-outline"}`}
                >
                  {shortlisted.has(c.id) ? "✓ Shortlisted" : "+ Shortlist"}
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => onViewCandidate(c)}
                >
                  View →
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-ink-muted">
              No candidates match your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
