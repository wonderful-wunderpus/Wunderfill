import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser());


// global error handler
app.use((err, req, res, next) => {errorMiddleware(err, res)});

// add app.listen

module.exports = app;