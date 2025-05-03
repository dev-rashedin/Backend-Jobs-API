const Job = require('../models/Jobs.model');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('-createdAt')
 
  res.status(StatusCodes.OK).json({success: true, message: 'Jobs fetched successfully', jobs}); 
};

const getSingleJob = async (req, res) => {
  res.send('get single job');
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ 
    success: true,
    message: 'Job created successfully',
    job
   });
};

const updateJob = async (req, res) => {
  res.send('update job');
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};


module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
