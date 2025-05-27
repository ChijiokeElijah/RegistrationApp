const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connect_DB = require('./connectDB/connectDB');


const app = express()

app.use(cors());

app.use(morgan("dev"))

app.use(express.json())

app.use("/user", require("./UserRoutes/UserRoute"))


app.listen(process.env.PORT, async () =>{
await connect_DB()
console.log(`Server is up and running at port ${process.env.PORT}`)

})