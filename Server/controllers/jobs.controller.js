const Job = require('../models/Jobs.model');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
  res.send('get all jobs');
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
