import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import StudentModal from './components/StudentModal';
import { useStudentManager } from './hooks/useStudentManager';
import { coursesService } from './services/coursesService';
import './App.css';

export default function App() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudentManager();
  const [editingStudent, setEditingStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load courses when component mounts
  useEffect(() => {
    async function fetchCourses() {
      try {
        const coursesData = await coursesService.getAllCourses();
        setCourses(coursesData);
      } catch (err) {
        console.error('Error loading courses:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Filter students based on search
  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    return student.name.toLowerCase().includes(term) || 
           student.email.toLowerCase().includes(term) ||
           student.course.toLowerCase().includes(term);
  });

  // Calculate active students
  const activeStudents = students.filter(s => s.status === 'active').length;

  // Handle Add New Student
  const handleAddNew = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  // Handle Edit Student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  // Handle Form Submit (Add/Edit)
  const handleFormSubmit = (studentData) => {
    if (editingStudent) {
      // Update existing student
      updateStudent(editingStudent.id, studentData);
    } else {
      // Add new student
      addStudent(studentData);
    }
    setShowModal(false);
    setEditingStudent(null);
  };

  // Handle Delete Student
  const handleDeleteStudent = (studentId) => {
    deleteStudent(studentId);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  return (
    <div className="app">
      {/* Header section */}
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1 className="main-title">Student Management Dashboard</h1>
            <p className="subtitle">Manage and track student information efficiently</p>
          </div>
          <div className="header-stats">
            <span>Total: {students.length} students</span>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Statistics cards */}
        <StatsCards 
          totalStudents={students.length}
          activeStudents={activeStudents}
          totalCourses={courses.length}
        />

        {/* Search and add button */}
        <SearchBar 
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleAddNew}
        />

        {/* Student cards grid */}
        <div className="students-section">
          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <p>No students found</p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <StudentList
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          )}
        </div>
      </main>

      {/* Modal for adding/editing students */}
      {showModal && (
        <StudentModal
          student={editingStudent}
          courses={courses}
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
