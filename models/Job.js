const { required } = require('joi');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
    minLength: [3, 'Job title must be at least 3 characters'],
    maxLength: [100, 'Job title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    trim: true,
    minLength: [3, 'Company name must be at least 3 characters'],
    maxLength: [100, 'Company name cannot exceed 100 characters']
  },
  location: {
    type: String,
    default: 'Remote',
    trim: true
  },
  salary: {
    type: Number,
    required: [true, 'Please provide a salary'],
    min: [0, 'Salary cannot be negative']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user who created this job']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);