import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://resume-builder-kanak13.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.error("CORS blocked origin:", origin);
            return callback(
                new Error(`Origin ${origin} is not allowed by CORS`)
            );
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.send("Resume Builder server is live");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume Builder API is running",
    });
});

app.use("/api/user", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Return readable CORS and server errors
app.use((error, req, res, next) => {
    console.error(error.message);

    res.status(500).json({
        success: false,
        message: error.message,
    });
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();