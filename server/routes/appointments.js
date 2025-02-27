const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Get all appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('barber')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    client: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    },
    barber: req.body.selectedBarber || null,
    date: req.body.selectedSlot,
    service: req.body.service,
    notes: req.body.notes
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update appointment status
router.put('/:id/:action', auth, async (req, res) => {
  try {
    const { id, action } = req.params;
    const { barberId } = req.body;

    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (action === 'approve') {
      appointment.status = 'approved';
      appointment.barber = barberId;
    } else if (action === 'reject') {
      appointment.status = 'rejected';
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 