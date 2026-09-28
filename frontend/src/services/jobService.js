import {
  getCurrentUserFromStorage,
  getDb,
  getJobById,
  mockDelay,
  saveDb,
} from "./mockData";

export async function getJobs() {
  return mockDelay(getDb().jobs);
}

export async function getJob(jobId) {
  const job = getJobById(jobId);
  if (!job) throw new Error("Job not found");
  return mockDelay(job);
}

export async function createJob(jobData) {
  const db = getDb();
  const user = getCurrentUserFromStorage();

  if (!user || user.role !== "hr") {
    throw new Error("HR access required");
  }

  const job = {
    job_id: db.counters.job++,
    job_title: jobData.job_title,
    description: jobData.description,
    required_skills: jobData.required_skills,
    experience: jobData.experience,
    location: jobData.location,
    created_by: user.id,
    created_at: new Date().toISOString(),
  };

  db.jobs.push(job);
  saveDb(db);
  return mockDelay({
    message: "Job created successfully",
    ...job,
  });
}

export async function updateJob(jobId, jobData) {
  const db = getDb();
  const user = getCurrentUserFromStorage();
  const job = db.jobs.find((item) => item.job_id === Number(jobId));

  if (!job) throw new Error("Job not found");
  if (!user || user.role !== "hr") throw new Error("HR access required");

  Object.assign(job, {
    job_title: jobData.job_title,
    description: jobData.description,
    required_skills: jobData.required_skills,
    experience: jobData.experience,
    location: jobData.location,
  });

  saveDb(db);
  return mockDelay({ message: "Job updated successfully", ...job });
}

export async function disableJob(jobId) {
  const db = getDb();
  const job = db.jobs.find((item) => item.job_id === Number(jobId));

  if (!job) throw new Error("Job not found");
  job.disabled = true;
  saveDb(db);
  return mockDelay({ message: "Job disabled successfully", job_id: job.job_id });
}
