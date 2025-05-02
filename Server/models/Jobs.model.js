const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: [true, 'Please provide a job title'],
  //   trim: true,
  //   minLength: [3, 'Job title must be at least 3 characters'],
  //   maxLength: [100, 'Job title cannot exceed 100 characters'],
  // },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxLength: [50, 'Company name cannot exceed 100 characters'],
  },
  position: {
    type: String,
    required: [true, 'Please provide a job type'],
    trim: true,
  },
  location: {
    type: String,
    default: 'Remote',
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, 'Please provide a salary'],
    min: [0, 'Salary cannot be negative'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user who created this job'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);