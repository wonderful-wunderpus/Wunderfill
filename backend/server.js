import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())