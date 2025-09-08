import React from 'react';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onEdit, onDelete }) => {
  return (
    <div className="student-grid">
      {students.map(student => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentGrid;
