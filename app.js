import dotenv from 'dotenv' 
dotenv.config();
import express from 'express'
import connectDB from './config/db.js'
import cityRoutes from './routes/cityRoutes.js'
import rateRoutes from './routes/rateRoutes.js'

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api', cityRoutes);
app.use('/api', rateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
