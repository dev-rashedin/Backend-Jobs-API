const express = require('express');
const { getAllJobs, createJob, updateJob, deleteJob, getSingleJob } = require('../controllers/jobs.controller');
const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getSingleJob);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);


module.exports = router;