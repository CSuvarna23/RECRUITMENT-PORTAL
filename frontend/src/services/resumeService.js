import {
  getCurrentUserFromStorage,
  getDb,
  getResumeForUser,
  mockDelay,
  saveDb,
} from "./mockData";

export async function uploadResume(file) {
  const user = getCurrentUserFromStorage();
  if (!user || user.role !== "candidate") {
    throw new Error("Candidate access required");
  }

  if (!file) throw new Error("Please select a file");
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed");
  }

  const db = getDb();
  db.resumes.forEach((resume) => {
    if (resume.user_id === user.id) resume.is_current = false;
  });

  const resume = {
    resume_id: db.counters.resume++,
    user_id: user.id,
    file_name: file.name,
    file_type: file.type,
    uploaded_at: new Date().toISOString(),
    is_current: true,
    skills: "React, JavaScript, Python, SQL, HTML, CSS",
  };

  db.resumes.push(resume);
  saveDb(db);

  return mockDelay({
    message: "Resume uploaded successfully",
    resume_id: resume.resume_id,
    file_name: resume.file_name,
    is_current: true,
  });
}

export async function getCurrentResume() {
  const user = getCurrentUserFromStorage();
  const resume = user ? getResumeForUser(user.id) : null;
  if (!resume) throw new Error("No resume found");

  return mockDelay({
    resume_id: resume.resume_id,
    file_name: resume.file_name,
    file_type: resume.file_type,
    uploaded_at: resume.uploaded_at,
    is_current: resume.is_current,
  });
}

export async function getResumeUrl(resumeId) {
  return `#mock-resume-${resumeId}`;
}

export async function viewResume(resumeId) {
  const db = getDb();
  const resume = db.resumes.find((item) => item.resume_id === Number(resumeId));
  if (!resume) throw new Error("Resume not found");

  const user = db.users.find((item) => item.id === resume.user_id);
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Please allow pop-ups to view the resume");

  popup.document.write(`<html><head><title>${escapeHtml(resume.file_name)}</title></head><body style="font-family:Arial;max-width:800px;margin:40px auto;line-height:1.6"><h1>${escapeHtml(user?.name || "Candidate")}</h1><p>${escapeHtml(user?.email || "")}</p><hr><h2>Resume Preview</h2><p><b>File:</b> ${escapeHtml(resume.file_name)}</p><p><b>Skills:</b> ${escapeHtml(resume.skills)}</p><p>This is a static Vercel demo preview.</p></body></html>`);
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
