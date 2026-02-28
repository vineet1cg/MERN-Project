const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
    'https://mern-project-vineet.netlify.app',
    process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined/null values

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle OPTIONS preflight for ALL routes BEFORE other middleware
app.options('/{*path}', cors(corsOptions));
app.use(cors(corsOptions));

const { protect } = require('./middleware/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

// basic route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Running :D"
    });
});

// routes
app.use('/api/auth', authRoutes);

app.use(protect); // Global protection

app.use('/api/posts', postRoutes);

// centralized error middleware
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Server Error"
    });
});

module.exports = app;