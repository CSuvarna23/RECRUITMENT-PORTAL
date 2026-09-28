import {
  calculateMatch,
  getApplicationById,
  getCurrentUserFromStorage,
  getDb,
  getJobById,
  getResumeForUser,
  getUserById,
  mockDelay,
  saveDb,
} from "./mockData";

function applicationForCandidate(application, db) {
  const job = getJobById(application.job_id);
  const resume = db.resumes.find((item) => item.resume_id === application.resume_id);

  return {
    application_id: application.application_id,
    job_id: job.job_id,
    job_title: job.job_title,
    company: "AI Recruitment Portal",
    status: application.status,
    match_score: Number(application.match_score),
    resume_id: resume?.resume_id,
    resume_name: resume?.file_name,
    applied_at: application.applied_at,
  };
}

export async function applyForJob(jobId) {
  const db = getDb();
  const user = getCurrentUserFromStorage();
  const job = db.jobs.find((item) => item.job_id === Number(jobId));

  if (!user || user.role !== "candidate") throw new Error("Candidate access required");
  if (!job) throw new Error("Job not found");

  const resume = getResumeForUser(user.id);
  if (!resume) throw new Error("Please upload a resume before applying");

  if (db.applications.some(
    (application) => application.user_id === user.id && application.job_id === Number(jobId)
  )) {
    throw new Error("You have already applied for this job");
  }

  const match = calculateMatch(job, resume);
  const application = {
    application_id: db.counters.application++,
    user_id: user.id,
    job_id: Number(jobId),
    resume_id: resume.resume_id,
    status: "Under Review",
    match_score: match.match_score,
    matched_skills: match.matched_skills,
    missing_skills: match.missing_skills,
    applied_at: new Date().toISOString(),
  };

  db.applications.push(application);
  saveDb(db);

  return mockDelay({
    message: "Application submitted successfully",
    application_id: application.application_id,
    job_id: job.job_id,
    job_title: job.job_title,
    resume_id: resume.resume_id,
    resume_name: resume.file_name,
    ...match,
    status: application.status,
  });
}

export async function getMyApplications() {
  const db = getDb();
  const user = getCurrentUserFromStorage();
  if (!user) throw new Error("Please login");

  return mockDelay(
    db.applications
      .filter((application) => application.user_id === user.id)
      .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
      .map((application) => applicationForCandidate(application, db))
  );
}

export async function getApplication(applicationId) {
  const db = getDb();
  const user = getCurrentUserFromStorage();
  const application = getApplicationById(applicationId);

  if (!application || application.user_id !== user?.id) {
    throw new Error("Application not found");
  }

  const job = getJobById(application.job_id);
  const resume = db.resumes.find((item) => item.resume_id === application.resume_id);

  return mockDelay({
    application_id: application.application_id,
    job,
    status: application.status,
    match_score: Number(application.match_score),
    matched_skills: application.matched_skills,
    missing_skills: application.missing_skills,
    resume: {
      resume_id: resume?.resume_id,
      file_name: resume?.file_name,
      uploaded_at: resume?.uploaded_at,
    },
    applied_at: application.applied_at,
  });
}

export async function getApplicants(jobId) {
  const db = getDb();
  const applications = db.applications
    .filter((application) => application.job_id === Number(jobId))
    .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));

  return mockDelay(
    applications.map((application) => {
      const user = getUserById(application.user_id);
      const resume = db.resumes.find((item) => item.resume_id === application.resume_id);
      return {
        application_id: application.application_id,
        candidate_name: user?.name,
        candidate_email: user?.email,
        match_score: Number(application.match_score),
        status: application.status,
        resume_id: resume?.resume_id,
        resume_name: resume?.file_name,
        matched_skills: application.matched_skills,
        missing_skills: application.missing_skills,
        applied_at: application.applied_at,
      };
    })
  );
}

export async function getApplicantDetails(jobId, applicationId) {
  const db = getDb();
  const application = getApplicationById(applicationId);

  if (!application || application.job_id !== Number(jobId)) {
    throw new Error("Application not found");
  }

  const candidate = getUserById(application.user_id);
  const job = getJobById(application.job_id);
  const resume = db.resumes.find((item) => item.resume_id === application.resume_id);

  return mockDelay({
    application_id: application.application_id,
    candidate: {
      id: candidate?.id,
      name: candidate?.name,
      email: candidate?.email,
    },
    job: {
      job_id: job?.job_id,
      job_title: job?.job_title,
    },
    status: application.status,
    match_score: Number(application.match_score),
    matched_skills: application.matched_skills,
    missing_skills: application.missing_skills,
    resume: {
      resume_id: resume?.resume_id,
      file_name: resume?.file_name,
      uploaded_at: resume?.uploaded_at,
    },
    applied_at: application.applied_at,
  });
}

export async function updateApplication(applicationId, status) {
  const db = getDb();
  const allowed = ["Under Review", "Shortlisted", "Rejected"];
  if (!allowed.includes(status)) throw new Error("Invalid status");

  const application = db.applications.find(
    (item) => item.application_id === Number(applicationId)
  );
  if (!application) throw new Error("Application not found");

  application.status = status;
  saveDb(db);

  return mockDelay({
    message: "Application status updated successfully",
    application_id: application.application_id,
    status,
  });
}

export async function viewApplicationResume(applicationId) {
  const db = getDb();
  const application = getApplicationById(applicationId);
  if (!application) throw new Error("Application or resume not found");

  const candidate = getUserById(application.user_id);
  const resume = db.resumes.find((item) => item.resume_id === application.resume_id);
  openResumePreview(candidate, resume);
}

function openResumePreview(candidate, resume) {
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Please allow pop-ups to view the resume");

  popup.document.write(`<!doctype html><html><head><title>${escapeHtml(resume?.file_name || "Resume")}</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6}h1{margin-bottom:4px}.tag{display:inline-block;background:#eef2ff;padding:5px 9px;border-radius:12px;margin:3px}</style></head><body><h1>${escapeHtml(candidate?.name || "Candidate")}</h1><p>${escapeHtml(candidate?.email || "")}</p><hr><h2>Resume Preview</h2><p><strong>File:</strong> ${escapeHtml(resume?.file_name || "Resume")}</p><h3>Skills</h3><p>${(resume?.skills || "").split(",").map((skill) => `<span class="tag">${escapeHtml(skill.trim())}</span>`).join(" ")}</p><p>This is a static demo resume preview. The original PDF remains on your local machine and is not uploaded to a backend.</p></body></html>`);
  popup.document.close();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
