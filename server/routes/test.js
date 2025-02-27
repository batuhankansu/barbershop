const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// Test route to create a sample barber
router.post('/create-test-barber', async (req, res) => {
  try {
    const testBarber = new Barber({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      specialties: ['Haircut', 'Shave'],
      workingHours: {
        monday: { start: '09:00', end: '17:00', isWorking: true },
        tuesday: { start: '09:00', end: '17:00', isWorking: true },
        wednesday: { start: '09:00', end: '17:00', isWorking: true },
        thursday: { start: '09:00', end: '17:00', isWorking: true },
        friday: { start: '09:00', end: '17:00', isWorking: true },
        saturday: { start: '09:00', end: '13:00', isWorking: true },
        sunday: { start: '', end: '', isWorking: false }
      }
    });

    await testBarber.save();
    res.status(201).json(testBarber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Test route to get all barbers
router.get('/barbers', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this at the top of your existing test.js file
router.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

module.exports = router; 