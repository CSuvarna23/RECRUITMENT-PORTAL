
# Recruitment Portal

A web-based Recruitment Portal that connects candidates and recruiters through a centralized platform for job posting, job applications, candidate management, and application tracking.

## Features

### Candidate Features

- Candidate registration and login
- Candidate dashboard
- Browse available job postings
- Search and filter jobs
- View job details
- Apply for jobs
- Track job applications
- View application status
- View job match score
- Upload and view resume
- Manage candidate profile

### HR / Recruiter Features

- HR registration and login
- HR dashboard
- Create and manage job postings
- View posted jobs
- View applicants
- Review candidate applications
- View candidate information
- Update application status
- Shortlist or reject candidates

## Application Screenshots

### 1. Login Page

User login interface for accessing the Recruitment Portal.


<img width="1917" height="1025" alt="Screenshot 2026-09-28 091652" src="https://github.com/user-attachments/assets/bd9aebb0-be69-4d57-b874-669cc4ff3e22" />


### 2. Candidate Registration

Candidate registration page for creating a new account.

<img width="1917" height="938" alt="Screenshot 2026-09-28 091704" src="https://github.com/user-attachments/assets/ec8839bf-5584-4b25-860b-98aa9ce87cf9" />


### 3. Candidate Dashboard

Candidate dashboard displaying applications, resume information, and available job postings.

<img width="1917" height="937" alt="Screenshot 2026-09-28 091809" src="https://github.com/user-attachments/assets/72121f87-cc54-4fb3-b716-95e9a16ea21b" />

### 4. Job Listings

Job search and filtering interface for browsing available opportunities.

<img width="1897" height="943" alt="Screenshot 2026-09-28 091903" src="https://github.com/user-attachments/assets/98bfe023-3795-4c31-b8f7-e93c45b26062" />


### 5. My Applications

Candidate application tracking page showing application status and match score.

<img width="1917" height="563" alt="Screenshot 2026-09-28 091913" src="https://github.com/user-attachments/assets/f374f90c-90f5-45a4-8026-d5031bd138d9" />


### 6. Candidate Profile

Candidate profile page displaying personal information and account details.

<img width="1917" height="898" alt="Screenshot 2026-09-28 091928" src="https://github.com/user-attachments/assets/866fe5f2-3025-481c-b7d7-427d684c5b7f" />

## Key Features

The Recruitment Portal is a web-based application designed to simplify the recruitment process for HR users. It provides features for creating and managing job postings, reviewing applicants, analyzing candidate matches, and managing HR profiles.

### 1. HR Dashboard
<img width="1917" height="928" alt="Screenshot 2026-09-28 092010" src="https://github.com/user-attachments/assets/c49ebaa3-60b2-48df-b53e-dde61affce68" />

The HR dashboard provides an overview of the recruitment activities, including:

- Total number of job postings
- Total applications received
- Applications under review
- Shortlisted candidates
- Quick access to create a new job
- Overview of existing job postings

### 2. Job Creation
<img width="1907" height="976" alt="Screenshot 2026-09-28 092024" src="https://github.com/user-attachments/assets/ad0e9410-64f6-4422-afbe-4b4325494ac4" />
HR users can create new job postings by providing:

- Job title
- Job description
- Required skills
- Required experience
- Job location

Once created, the job becomes available in the job management section.

### 3. Job Management

<img width="1072" height="957" alt="Screenshot 2026-09-28 092059" src="https://github.com/user-attachments/assets/deb247de-15a5-403e-9f57-edce73407cb3" />

The Manage Jobs section allows HR users to:

- Search for jobs
- Filter jobs based on location, experience, and skills
- View job details
- Edit existing job postings
- Enable or disable job postings
- View the number of applicants for each job

### 4. Applicant Management

<img width="817" height="928" alt="Screenshot 2026-09-28 092148" src="https://github.com/user-attachments/assets/0294f676-0c41-4e7f-84b8-e2542d2f3552" />

HR users can view all candidates who have applied for a particular job.

The applicant section displays:

- Candidate name and email
- Match score
- Application status
- Application date
- Resume
- Applicant details

The system also provides a visual comparison of candidates based on their match scores.

### 5. Candidate Match Analysis
<img width="1912" height="947" alt="Screenshot 2026-09-28 092256" src="https://github.com/user-attachments/assets/133a9bb1-8a80-43a8-8136-c484cf0f8f2b" />


The system analyzes the candidate's resume against the required job skills and generates a match score.

For example, the applicant details page displays:

- Overall match percentage
- Matched skills
- Missing skills
- Uploaded resume
- Current application status

This helps HR users quickly understand how closely a candidate's profile matches the job requirements.

### 6. Application Status Management
<img width="1896" height="971" alt="Screenshot 2026-09-28 092307" src="https://github.com/user-attachments/assets/04a4ebc8-833c-4515-a840-ec38b0dc0fef" />
HR users can update the status of an application based on the recruitment process.

Possible statuses include:

- Under Review
- Shortlisted
- Rejected

### 7. HR Profile Management

The profile section allows HR users to view and manage their account information, including:

- Full name
- Email address
- Account type
- Profile information
- Logout option

## Technology Stack
![Uploading Screenshot 2026-09-28 092010.png…]()



## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend

- FastAPI
- Python

### Database

- MySQL

### Deployment

- Vercel

## Project Structure

```text
Recruitment-Portal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
