# Vercel-only deployment

The `frontend` has been converted to demo/static mode and no longer depends on the FastAPI/Railway backend.

## Deploy

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Set the Vercel **Root Directory** to `frontend`.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. No `VITE_API_URL` environment variable is needed.

## Demo login

Candidate: `candidate@example.com` / `candidate123`

HR: `hr@example.com` / `hr12345`

## How the static demo works

The frontend services in `frontend/src/services/` now use browser `localStorage` instead of HTTP API requests. This provides demo versions of authentication, jobs, applications, HR status updates, job creation/editing, and resume metadata/preview.

Because there is no backend, data is stored only in the current browser. Clearing site data resets the application. Uploaded PDF files are not sent to a server; only their filename/metadata is stored and the UI opens a static resume preview.
