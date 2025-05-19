import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ jobTitle, location });
  };

  return (
    <div className="search-container">
      <h1 className="search-heading">Find Your Dream Job</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="UX Designer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fa fa-map-marker"></i>
          <input
            type="text"
            placeholder="San Francisco, USA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;