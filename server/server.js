require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const appointmentRoutes = require('./routes/appointments');
const barberRoutes = require('./routes/barbers');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 