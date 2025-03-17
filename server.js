require("dotenv").config({ path: "./utils/.env" }); // Load .env variables before anything else

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// Express App Initialization
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", require("./routes/userRoute"));

// MongoDB Connection
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is undefined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB!"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Routes
app.get("/", (req, res) => {
    res.send("<h1>✅ Server is Running</h1>");
});

// Port Configuration
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
