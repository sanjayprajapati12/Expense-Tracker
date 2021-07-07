const express = require('express');
const connectDB = require('./config/db')

// const { Server } = require('http');
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});

connectDB();

const users= require('./routes/user')
const app = express();
app.use(express.json());
app.use('/',users);

const PORT = process.env.PORT || 6000;
app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`));