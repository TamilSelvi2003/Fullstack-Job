import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slice/JobSlice';
import CreateJob from './JobCreate';
import './style.css';
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';


const getColorFromName = (name) => {
  const colors = [
    "#ff6f61", "#6a67ce", "#1e88e5", "#00bfa5", "#f9a825",
    "#ab47bc", "#ef5350", "#26c6da", "#5c6bc0", "#43a047"
  ];
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const JobListing = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const jobStatus = useSelector((state) => state.jobs.status);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 700000]);

  useEffect(() => {
    if (jobStatus === 'idle') {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const searchMatch = search
      ? job.jobTitle.toLowerCase().includes(search.toLowerCase())
      : true;
    const locationMatch = location
      ? job.location.toLowerCase() === location.toLowerCase()
      : true;
    const jobTypeMatch = jobType
      ? job.jobType.toLowerCase().includes(jobType.toLowerCase())
      : true;

    const salaryNumbers = job.salaryRange?.match(/\d+/g)?.map(Number);
    const averageSalary = salaryNumbers
      ? salaryNumbers.reduce((a, b) => a + b, 0) / salaryNumbers.length
      : null;
    const salaryMatch =
      salaryRange[1] < 700000 && averageSalary !== null
        ? averageSalary >= salaryRange[0] && averageSalary <= salaryRange[1]
        : true;

    return searchMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  return (
    <div className="job-listings-container">
      <div className="filters">
        <div className="input-icon">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="input-icon">
          <FiMapPin className="icon" />
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Preferred Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Cuddalore">Cuddalore</option>
            <option value="Villupuram">Villupuram</option>
            <option value="Pondicherry">Pondicherry</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <div className="input-icon">
          <FiBriefcase className="icon" />
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Job type</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="FullTime">FullTime</option>
            <option value="Part Time">Part Time</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        <div className="salary-range">
          <div className="salary-label-row">
            <label>Salary Per Month</label>
            <span className='span'>₹{(salaryRange[0] / 1000).toFixed(0)}k - ₹{(salaryRange[1] / 1000).toFixed(0)}k</span>
          </div>
          <input
            type="range"
            min="0"
            max="700000"
            value={salaryRange[1]}
            onChange={(e) => setSalaryRange([0, parseInt(e.target.value)])}
          />
        </div>
      </div>

      <div className="job-listings">
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <div
                  className="logo-circle"
                  style={{ backgroundColor: getColorFromName(job.companyName || '?') }}
                >
                  {job.companyName ? job.companyName.charAt(0) : '?'}
                </div>
                <span className="posted-time">24h Ago</span>
              </div>

              <div className="job-title">{job.jobTitle}</div>
              <div className="job-info">
  <span><FiMapPin style={{ marginRight: '4px' }} />{job.location}</span>
  <span><FiBriefcase style={{ marginRight: '4px' }} />{job.jobType}</span>
  <span><FiDollarSign style={{ marginRight: '4px' }} />{job.salaryRange}</span>
</div>

              <div className="job-desc">{job.description.slice(0, 100)}...</div>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateJob
          onClose={() => setShowCreateModal(false)}
          refreshJobs={() => dispatch(fetchJobs())}
        />
      )}
    </div>
  );
};

export default JobListing;
