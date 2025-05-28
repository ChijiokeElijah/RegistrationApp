require('dotenv').config(); // MUST BE FIRST LINE

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connect_DB = require('./connectDB/connectDB');

const app = express();

app.use(cors({
  origin: ['http://localhost:5174', '*', 'https://client-ognw04vuv-james-kalus-projects.vercel.app'], 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


app.use(morgan("dev"));
app.use(express.json());

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use("/user", require("./UserRoutes/UserRoute"));


const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await connect_DB();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
});

module.exports = app;