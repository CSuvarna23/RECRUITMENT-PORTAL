// The production demo is fully static and does not require Railway or another backend.
// This file is kept so existing imports remain compatible.
export const API_URL = "";

export async function apiRequest() {
  throw new Error("This demo no longer uses backend API requests.");
}
