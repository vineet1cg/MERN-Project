const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const corsOptions = {
    origin: [
        'http://localhost:5173', // Local frontend
        'https://mern-project-vineet.netlify.app', // Replace with your actual frontend deployment URL
        process.env.FRONTEND_URL // Dynamic generic fallback
    ],
    credentials: true,
};

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