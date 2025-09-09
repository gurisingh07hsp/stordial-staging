const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please enter your description'],
  },
  role: {
    type: String,
  },
  type:{
    type: String,
    required: true,
  },
  vacancies: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed']
  },
  enteries: {
    type: [
        {
            name: String,
            email: String,
            phone: String,
            experience: String,
            coverletter: String,
            appliedAt: { type: Date, default: Date.now }
        }
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema); 