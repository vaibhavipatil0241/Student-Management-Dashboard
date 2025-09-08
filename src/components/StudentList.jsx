import React, { useState } from 'react';
import StudentDetailsModal from './StudentDetailsModal';

const StudentList = ({ students, onEdit, onDelete }) => {
  const [viewingStudent, setViewingStudent] = useState(null);

  const handleViewDetails = (student) => {
    setViewingStudent(student);
  };

  const handleCloseDetails = () => {
    setViewingStudent(null);
  };

  const handleEditFromCard = (student) => {
    onEdit(student); // This should open the edit form
  };

  const handleEditFromDetails = (student) => {
    setViewingStudent(null); // Close details modal
    onEdit(student); // Open edit form
  };

  const handleDelete = (student, e) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id); // Pass the ID, not the whole student object
    }
  };

  return (
    <>
      <div className="student-grid">
        {students.map(student => (
          <div key={student.id} className="student-card">
            {/* Student Avatar */}
            <div className="student-avatar">
              <img 
                src={student.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4299e1&color=white`}
                alt={student.name}
              />
            </div>
            
            {/* Student Info */}
            <div className="student-header">
              <h3 className="student-name">{student.name}</h3>
              <span className={`status-badge ${student.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                {student.status || 'active'}
              </span>
            </div>
            
            {/* Student Details */}
            <div className="student-details">
              <div className="detail-row">
                <span className="icon">✉️</span>
                <span className="detail-text">{student.email}</span>
              </div>
              
              <div className="detail-row">
                <span className="icon">📚</span>
                <span className="detail-text">{student.course}</span>
              </div>
              
              <div className="detail-row">
                <span className="icon">📅</span>
                <span className="detail-text">
                  Enrolled: {student.enrolledDate}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="student-actions">
              <button 
                className="btn-view" 
                onClick={() => handleViewDetails(student)}
              >
                View Details
              </button>
              <button 
                className="btn-edit" 
                onClick={() => handleEditFromCard(student)}
                title="Edit Student"
              >
                ✏️
              </button>
              <button 
                className="btn-delete" 
                onClick={(e) => handleDelete(student, e)}
                title="Delete Student"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Student Details Modal */}
      {viewingStudent && (
        <StudentDetailsModal
          student={viewingStudent}
          onClose={handleCloseDetails}
          onEdit={handleEditFromDetails}
        />
      )}
    </>
  );
};

export default StudentList;
