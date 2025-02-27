const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber'
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 30 // duration in minutes
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  service: {
    type: String,
    required: true
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema); 