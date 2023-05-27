import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())