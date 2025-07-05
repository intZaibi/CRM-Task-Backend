import express from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import leadRoutes from './routes/leadRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import connectDB from './config/db.js'; 
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crm_db'; 
// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL, 
  credentials: true, // Allow credentials (cookies)
}));

// Routes
app.use('/api/leads', leadRoutes)
app.use('/api/users', userRoutes);

try {
  connectDB(MONGODB_URI);
    
  app.listen(PORT, () => {
    console.log(`Server running on https://crm-task-backend-1.onrender.com:${PORT}`);
  });
} catch (error) {
  console.log(error); 
}
