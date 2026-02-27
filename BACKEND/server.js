require('dotenv').config();
const app = require('./src/app');
const connectDB = require("./src/database/db");

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("FATAL ERROR: MONGO_URI or JWT_SECRET is missing. Server crashing now.");
    process.exit(1);
}

connectDB()
app.listen(3000, () => {
    console.log("Backend Started 🚀");
})