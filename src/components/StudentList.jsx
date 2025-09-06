import React from 'react';
import './StudentList.css';

export default function StudentList({ students, onEdit }) {
  if (!students.length) {
    return <div className="student-list-container">No students found.</div>;
  }

  return (
    <div className="student-list-container">
      <ul>
        {students.map(student => (
          <li key={student.id} className="student-item">
            <span className="student-name"><strong>Name:</strong> {student.name}</span>
            <span className="student-email"><strong>Email:</strong> {student.email}</span>
            <span className="student-course"><strong>Course:</strong> {student.enrolledCourse}</span>
            {onEdit && (
              <button
                className="edit-btn"
                onClick={() => onEdit(student)}
                aria-label={`Edit details of ${student.name}`}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
