import React from 'react';

const StatsCards = ({ totalStudents, activeStudents, totalCourses }) => {
  return (
    <div className="stats-container">
      <div className="stat-card stat-blue">
        <div className="stat-content">
          <h3>Total Students</h3>
          <div className="stat-number">{totalStudents}</div>
        </div>
        <div className="stat-icon">
          👥
        </div>
      </div>
      
      <div className="stat-card stat-green">
        <div className="stat-content">
          <h3>Active Students</h3>
          <div className="stat-number">{activeStudents}</div>
        </div>
        <div className="stat-icon">
          📈
        </div>
      </div>
      
      <div className="stat-card stat-cyan">
        <div className="stat-content">
          <h3>Total Courses</h3>
          <div className="stat-number">{totalCourses}</div>
        </div>
        <div className="stat-icon">
          🎓
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
