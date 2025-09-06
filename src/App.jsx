import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { useStudentManager } from './hooks/useStudentManager';
import { coursesService } from './services/coursesService';
import './App.css';  // Make sure this file contains the CSS discussed

export default function App() {
  const { students, addStudent } = useStudentManager();
  const [editingStudent, setEditingStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await coursesService.getAllCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  const handleSubmit = async studentData => {
    await addStudent(studentData);
    setEditingStudent(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
        Student Management Dashboard
      </h1>

      <div className="dashboard-grid">
        <div className="form-container">
          <StudentForm
            courses={courses}
            editingStudent={editingStudent}
            onSubmit={handleSubmit}
            onCancel={() => setEditingStudent(null)}
          />
        </div>

        <div className="list-container">
          <div className="student-count">
            Total Students: {students.length}
          </div>

          <StudentList
            students={students}
            onEdit={(student) => setEditingStudent(student)}
          />
        </div>
      </div>
    </div>
  );
}
