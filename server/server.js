require('dotenv').config(); // MUST BE FIRST LINE

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connect_DB = require('./connectDB/connectDB');

