import React from 'react';

const SearchBar = ({ searchValue, onSearchChange, onAddClick }) => {
  return (
    <div className="search-section">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search students by name, email, or course..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <button className="add-student-btn" onClick={onAddClick}>
        <span className="plus-icon">+</span>
        Add Student
      </button>
    </div>
  );
};

export default SearchBar;
