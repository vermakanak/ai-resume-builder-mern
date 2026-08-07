# Resume Builder

An AI-assisted full-stack resume builder that helps users create, manage, and improve professional resumes from one modern web application.

> Built as a learning project to explore a complete MERN-style workflow: responsive React UI, REST APIs, secure authentication, database persistence, file uploads, PDF text extraction, and AI integration.

## Features

- Create and manage resume information in a clean web interface.
- Secure user authentication with password hashing and JSON Web Tokens.
- Store user and application data in MongoDB.
- Upload files through the Express API, with ImageKit support for media handling.
- Extract text from PDF resumes in the client.
- Use OpenAI-powered functionality to support resume-related workflows.
- Receive clear feedback through toast notifications and responsive UI states.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, React Router, Redux Toolkit |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JWT and bcrypt |
| File & AI services | Multer, ImageKit, OpenAI |
| HTTP & UI tools | Axios, Lucide React, React Hot Toast |

## Project Structure

```text
Resume_builder/
├── client/                 # React + Vite frontend
│   ├── public/
│   └── src/
└── server/                 # Express API
    ├── configs/
    ├── controllers/
    ├── middlewares/
    ├── models/
    └── routes/
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB database (MongoDB Atlas or local MongoDB)
- API credentials for any enabled OpenAI and ImageKit features

### 1. Clone the repository

```bash
git clone https://github.com/vermakanak/Resume_builder.git
cd Resume_builder
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` and add the values required by your server configuration. Typical values include:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
OPENAI_API_KEY=your_openai_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the API:

```bash
npm run server
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Vite will display the local application URL, usually `http://localhost:5173`.

## Available Scripts

### Client

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

### Server

```bash
npm run server   # Start the API with nodemon
npm start        # Start the API with Node.js
```

## Environment & Security Notes

- Never commit `.env` files or API keys.
- Use a strong, unique value for `JWT_SECRET`.
- Ensure the frontend API base URL matches the running backend before deployment.
- Add production CORS origins before publishing the application.

## Roadmap

- Add resume templates and live previews.
- Add PDF export and download.
- Improve validation and error handling.
- Add tests and a deployed demo link.

## Contributing

Contributions, suggestions, and bug reports are welcome. Please open an issue first for substantial changes.

## Author

Created by [Kanak Verma](https://github.com/vermakanak).
