const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connect_DB = require('./connectDB/connectDB');

const app = express()

const corsOptions = {
  credentials: true,
  origin: "*",
  methods: "POST",
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

const apiRoutes = [
require("./UserRoutes/UserRoute")]

apiRoutes.array.forEach(router => {
    app.use('/api', router)
});


app.listen(process.env.PORT, async () =>{
await connect_DB()

console.log(`Server is up and running at port ${process.env.PORT}`)

})