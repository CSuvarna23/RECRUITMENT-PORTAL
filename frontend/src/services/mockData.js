const STORAGE_KEY = "recruitment_portal_mock_db_v1";

const seed = {
  users: [
    {
      id: 1,
      name: "Demo Candidate",
      email: "candidate@example.com",
      password: "candidate123",
      role: "candidate",
    },
    {
      id: 2,
      name: "Demo HR",
      email: "hr@example.com",
      password: "hr12345",
      role: "hr",
    },
  ],
  jobs: [
    {
      job_id: 1,
      job_title: "Frontend Developer",
      description: "Build responsive recruitment experiences using React and modern JavaScript.",
      required_skills: "React, JavaScript, HTML, CSS",
      experience: "1+ years",
      location: "Bengaluru",
      created_by: 2,
      created_at: "2026-09-20T09:00:00.000Z",
    },
    {
      job_id: 2,
      job_title: "Python Developer",
      description: "Develop backend services and automation using Python, FastAPI and SQL.",
      required_skills: "Python, FastAPI, SQL, Git",
      experience: "1+ years",
      location: "Mangaluru",
      created_by: 2,
      created_at: "2026-09-21T09:00:00.000Z",
    },
    {
      job_id: 3,
      job_title: "Data Analyst",
      description: "Analyze business data and create useful reports and dashboards.",
      required_skills: "Python, SQL, Excel, Power BI",
      experience: "0+ years",
      location: "Bengaluru",
      created_by: 2,
      created_at: "2026-09-22T09:00:00.000Z",
    },
    {
      job_id: 4,
      job_title: "AI/ML Engineer",
      description: "Work on machine learning pipelines, NLP solutions and model evaluation.",
      required_skills: "Python, Machine Learning, NLP, TensorFlow",
      experience: "1+ years",
      location: "Hyderabad",
      created_by: 2,
      created_at: "2026-09-23T09:00:00.000Z",
    },
  ],
  resumes: [
    {
      resume_id: 1,
      user_id: 1,
      file_name: "demo-candidate-resume.pdf",
      file_type: "application/pdf",
      uploaded_at: "2026-09-20T10:00:00.000Z",
      is_current: true,
      skills: "React, JavaScript, HTML, CSS, Python, SQL, Machine Learning, NLP",
    },
  ],
  applications: [
    {
      application_id: 1,
      user_id: 1,
      job_id: 1,
      resume_id: 1,
      status: "Shortlisted",
      match_score: 100,
      matched_skills: ["React", "JavaScript", "HTML", "CSS"],
      missing_skills: [],
      applied_at: "2026-09-24T10:30:00.000Z",
    },
    {
      application_id: 2,
      user_id: 1,
      job_id: 4,
      resume_id: 1,
      status: "Under Review",
      match_score: 50,
      matched_skills: ["Python", "Machine Learning"],
      missing_skills: ["NLP", "TensorFlow"],
      applied_at: "2026-09-25T12:00:00.000Z",
    },
  ],
  counters: {
    user: 3,
    job: 5,
    resume: 2,
    application: 3,
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function getDb() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const initial = clone(seed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(saved);
  } catch {
    const initial = clone(seed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

export function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function resetMockData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clone(seed)));
  localStorage.removeItem("token");
}

export function getCurrentUserFromStorage() {
  const raw = localStorage.getItem("mock_current_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem("mock_current_user", JSON.stringify(user));
    localStorage.setItem("token", `mock-token-${user.id}`);
  } else {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("token");
  }
}

export function getUserById(id) {
  return getDb().users.find((user) => user.id === Number(id)) || null;
}

export function getUserByEmail(email) {
  return getDb().users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  ) || null;
}

export function getResumeForUser(userId) {
  return getDb().resumes.find(
    (resume) => resume.user_id === Number(userId) && resume.is_current
  ) || null;
}

export function getJobById(jobId) {
  return getDb().jobs.find((job) => job.job_id === Number(jobId)) || null;
}

export function getApplicationById(applicationId) {
  return getDb().applications.find(
    (application) => application.application_id === Number(applicationId)
  ) || null;
}

export function getRequiredSkills(job) {
  if (Array.isArray(job?.required_skills)) return job.required_skills;
  return (job?.required_skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export function calculateMatch(job, resume) {
  const resumeSkills = (resume?.skills || "")
    .split(",")
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);

  const required = getRequiredSkills(job);
  const matched = required.filter((skill) =>
    resumeSkills.includes(skill.toLowerCase())
  );
  const missing = required.filter(
    (skill) => !resumeSkills.includes(skill.toLowerCase())
  );
  const score = required.length
    ? Math.round((matched.length / required.length) * 100)
    : 0;

  return {
    match_score: score,
    matched_skills: matched,
    missing_skills: missing,
  };
}

export function mockDelay(result, ms = 120) {
  return new Promise((resolve) => setTimeout(() => resolve(clone(result)), ms));
}
