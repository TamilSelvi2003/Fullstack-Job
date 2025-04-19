import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const CreateJob = ({ onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    salaryRange: '',
    jobType: 'FullTime',
    applicationDeadline: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fullstack-job-backend.onrender.com/api/jobs', formData);
      refreshJobs();
      // onClose();
    } catch (err) {
      console.error('Error creating job:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Job Opening</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="row">
            <input
              type="text"
              name="salaryRange"
              placeholder="Salary Range (e.g. 10LPA)"
              value={formData.salaryRange}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Job Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <div className="button-group">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="publish">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
