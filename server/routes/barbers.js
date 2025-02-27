const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');
const auth = require('../middleware/auth');

// Get all barbers
router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available slots for a barber
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    
    const barber = await Barber.findById(id);
    const appointments = await Appointment.find({
      barber: id,
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      }
    });

    // Calculate available slots based on working hours and existing appointments
    // This is a simplified version - you'll need to implement the actual logic
    const availableSlots = calculateAvailableSlots(barber.workingHours, appointments);
    
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 