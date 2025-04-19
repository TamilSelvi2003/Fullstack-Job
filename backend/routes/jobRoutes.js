const express = require('express');
const Job = require('../models/Job.js');

const router = express.Router();

// Create a new job
router.post('/', async (req, res) => {
  const { jobTitle, companyName, location, salaryRange, jobType, description, applicationDeadline } = req.body;

  const newJob = new Job({
    jobTitle,
    companyName,
    location,
    salaryRange,
    jobType,
    description,
    applicationDeadline,
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
