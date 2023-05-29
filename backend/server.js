import express from 'express';
import errorMiddleware from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
const path = require('path');
// import connectDB from './db/db.js';
// import dotenv from 'dotenv';
// dotenv.config()
// connectDB()

const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

// Global error handler
app.use((err, req, res, next) => {errorMiddleware(err, res)});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});