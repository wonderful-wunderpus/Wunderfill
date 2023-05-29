import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import colors from 'colors';
import errorMiddleware from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';


if (process.env.NODE_ENV !== 'production') {
  switch (true) {
  case (!process.env.NODE_ENV):
    console.log('WARNING: Please add NODE_ENV variable to root .env. NODE_ENV: '.yellow.bold, process.env.NODE_ENV);
  case (!process.env.MONGO_URI):
    console.log('ERROR: Please add MONGO_URI variable to root .env. MONGO_URI: '.red.bold, process.env.MONGO_URI);
  case (!process.env.PORT):
    console.log('WARNING: Please add PORT variable to root .env. PORT: '.yellow.bold, process.env.PORT);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

// Global error handler
app.use((err, req, res, next) => errorMiddleware(err, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
