const mongoose = require('mongoose');

const workingHoursSchema = new mongoose.Schema({
  start: String,
  end: String,
  isWorking: {
    type: Boolean,
    default: true
  }
});

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  specialties: [{
    type: String
  }],
  workingHours: {
    monday: workingHoursSchema,
    tuesday: workingHoursSchema,
    wednesday: workingHoursSchema,
    thursday: workingHoursSchema,
    friday: workingHoursSchema,
    saturday: workingHoursSchema,
    sunday: workingHoursSchema
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Barber', barberSchema); 