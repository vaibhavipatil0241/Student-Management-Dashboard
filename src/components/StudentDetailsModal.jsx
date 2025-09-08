import React from 'react';

const StudentDetailsModal = ({ student, onClose, onEdit }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="details-modal" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>
        
        {/* Header */}
        <div className="details-header">
          <span className="details-icon">👤</span>
          <h2>Student Details</h2>
        </div>
        
        {/* Student Info Section */}
        <div className="details-content">
          <div className="student-profile">
            <img 
              src={student.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4299e1&color=white`}
              alt={student.name}
              className="profile-image"
            />
            <div className="profile-info">
              <h3>{student.name}</h3>
              <span className={`status-badge ${student.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                {student.status || 'active'}
              </span>
            </div>
          </div>
          
          {/* Details List */}
          <div className="details-list">
            <div className="detail-item">
              <span className="detail-icon">✉️</span>
              <div className="detail-content">
                <label>Email</label>
                <span>{student.email}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📚</span>
              <div className="detail-content">
                <label>Course</label>
                <span>{student.course}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <div className="detail-content">
                <label>Enrollment Date</label>
                <span>{student.enrolledDate || 'August 15, 2024'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="details-actions">
          <button className="edit-btn" onClick={() => onEdit(student)}>
            ✏️ Edit Student
          </button>
          <button className="close-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
