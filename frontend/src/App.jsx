import React, { useState } from 'react';
import JobListing from './components/job/JobListing';
import Navbar from './components/nav/Navbar';
import CreateJob from './components/job/JobCreate';
import { useDispatch } from 'react-redux';
import { fetchJobs } from './redux/slice/JobSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salary: [25000, 280000],
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    dispatch(fetchJobs()); 
  };

  return (
    <div className="app">
      <Navbar onFilterChange={setFilters} onCreateClick={handleCreateClick} />
      <JobListing filters={filters} />
      {showCreateModal && (
        <CreateJob onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
