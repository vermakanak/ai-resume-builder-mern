# AI Resume Builder

An AI-powered full-stack resume builder that helps users create, edit, and download professional resumes with a live preview and AI-assisted content enhancement.

## Live Demo

**[Try the application](https://resume-builder-two-sooty.vercel.app)**

> The Render API uses a free instance and may take up to a minute to wake up on the first request.

## Features

- Secure sign-up and login with JWT authentication.
- Create and manage multiple resumes.
- Edit personal details, professional summaries, experience, education, skills, and projects.
- See changes in a live resume preview.
- Enhance professional content with AI assistance.
- Select resume templates and accent colors.
- Upload profile images and download resumes.
- Share public resumes with a link.

## Screenshots

### Sign Up

![Sign-up screen](./screenshots/sign-up.jpg)

### AI-Enhanced Professional Summary

![AI-enhanced professional summary and live preview](./screenshots/ai-summary.jpg)

### Resume Editor and Live Preview

![Resume editor and live preview](./screenshots/resume-editor.jpg)

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Redux Toolkit, React Router |
| Backend | Node.js, Express |
| Database | MongoDB and Mongoose |
| Authentication | JSON Web Tokens and bcrypt |
| AI & media | OpenAI, ImageKit, Multer |
| Deployment | Vercel and Render |

## Run Locally

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB database connection string
- OpenAI and ImageKit credentials for the related features

### 1. Clone the project

```bash
git clone https://github.com/vermakanak/ai-resume-builder-mern.git
cd ai-resume-builder-mern
```

### 2. Start the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=your_openai_base_url
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

Start the app:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Environment Notes

- Never commit `.env` files or expose API keys.
- For production, set `VITE_BASE_URL` to your deployed backend URL without `/api`.
- Set `CLIENT_URL` on the backend to the exact deployed frontend URL to allow CORS requests.

## Author

Created by [Kanak Verma](https://github.com/vermakanak).
