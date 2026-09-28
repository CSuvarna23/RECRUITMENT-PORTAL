# Job Recruitment Portal - Vercel Static Demo

This frontend has been converted to a **Vercel-only demo**. It no longer calls the Railway/FastAPI backend.

## Demo accounts

- Candidate: `candidate@example.com` / `candidate123`
- HR: `hr@example.com` / `hr12345`

## What is stored

The application uses browser `localStorage` as a small mock database. Jobs, registrations, applications, statuses and resume metadata therefore persist in the same browser.

## Vercel

Deploy the `frontend` folder as the Vercel project root.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

No `VITE_API_URL` variable is required.

## Important limitation

This is a frontend demonstration mode. There is no server/database. Data is local to the browser, authentication is demo-only, and uploaded resumes are represented by metadata/static preview rather than being sent to a backend.
