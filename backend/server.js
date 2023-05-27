import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db
import errorMiddleware from './middleware/errorMiddleware';


dotenv.config()

connectDB()

const app = express()

app.use(express.json())



// global error handler
app.use((err, req, res, next) => {errorMiddleware(err, res)});