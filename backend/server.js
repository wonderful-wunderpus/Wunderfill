const express = require('express')
const dotenv = require('dotenv')
import connectDB from './db/db.js'
import errorMiddleware from './middleware/errorMiddleware.js';


dotenv.config()

connectDB()

const app = express()

app.use(express.json())



// global error handler
app.use((err, req, res, next) => {errorMiddleware(err, res)});