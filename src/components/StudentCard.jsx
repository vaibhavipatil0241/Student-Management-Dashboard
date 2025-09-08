import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    return status === 'active' ? 'status-active' : 'status-inactive';
  };

  return (
    <div className="student-card">
      <div className="student-avatar">
        <img 
          src={student.profileImage || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
          alt={student.name}
        />
      </div>
      
      <div className="student-info">
        <h3 className="student-name">{student.name}</h3>
        
        <div className={`status-badge ${getStatusBadge(student.status)}`}>
          {student.status || 'active'}
        </div>
      </div>
      
      <div className="student-details">
        <div className="detail-item">
          <i className="icon-mail"></i>
          <span>{student.email}</span>
        </div>
        
        <div className="detail-item">
          <i className="icon-book-open"></i>
          <span>{student.course}</span>
        </div>
        
        <div className="detail-item">
          <i className="icon-calendar"></i>
          <span>Enrolled: {student.enrolledDate || '9/1/2024'}</span>
        </div>
      </div>
      
      <div className="student-actions">
        <button className="btn-view">View Details</button>
        <button className="btn-edit" onClick={() => onEdit(student)}>
          <i className="icon-edit"></i>
        </button>
        <button className="btn-delete" onClick={() => onDelete(student.id)}>
          <i className="icon-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
