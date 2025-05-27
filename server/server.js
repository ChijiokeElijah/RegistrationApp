const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connect_DB = require('./connectDB/connectDB');


const app = express()

const allowedOrigins = [
  "http://localhost:5175",
  "https://registration-app-kb3b.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Authorization",
    "X-CSRF-Token", 
    "X-Requested-With", 
    "Accept", 
    "Accept-Version", 
    "Content-Length", 
    "Content-MD5", 
    "Content-Type", 
    "Date", 
    "X-Api-Version"
  ]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(morgan("dev"))

app.use(express.json())

app.use("/user", require("./UserRoutes/UserRoute"))


app.listen(process.env.PORT, async () =>{
await connect_DB()

console.log(`Server is up and running at port ${process.env.PORT}`)

})