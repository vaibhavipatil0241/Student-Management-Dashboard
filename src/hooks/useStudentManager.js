import { useState, useEffect } from 'react';

export const useStudentManager = () => {
  const [students, setStudents] = useState([]);

  // Load students from localStorage when component mounts
  useEffect(() => {
    const savedStudents = localStorage.getItem('studentManagementData');
    
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
      } catch (error) {
        console.error('Error loading saved students:', error);
        loadInitialData();
      }
    } else {
      loadInitialData();
    }
  }, []);

  // Load initial sample data
  const loadInitialData = () => {
    const initialStudents = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@university.edu',
        course: 'Computer Science',
        status: 'active',
        enrolledDate: '9/1/2024',
        profileImage: null
      },
      {
        id: 2,
        name: 'Carol Davis',
        email: 'carol.davis@university.edu',
        course: 'Physics',
        status: 'inactive',
        enrolledDate: '7/20/2024',
        profileImage: null
      }
    ];
    setStudents(initialStudents);
    saveToStorage(initialStudents);
  };

  // Save students to localStorage
  const saveToStorage = (studentsData) => {
    try {
      localStorage.setItem('studentManagementData', JSON.stringify(studentsData));
    } catch (error) {
      console.error('Error saving students:', error);
    }
  };

  // Add new student
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now() + Math.random(), // Generate unique ID
      status: studentData.status || 'active',
      enrolledDate: studentData.enrolledDate || new Date().toLocaleDateString('en-US')
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    saveToStorage(updatedStudents);
    
    console.log('Student added:', newStudent);
  };

  // Update existing student
  const updateStudent = (id, updatedData) => {
    const updatedStudents = students.map(student => 
      student.id === id 
        ? { ...student, ...updatedData }
        : student
    );
    
    setStudents(updatedStudents);
    saveToStorage(updatedStudents);
    
    console.log('Student updated:', updatedData);
  };

  // Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    
    setStudents(updatedStudents);
    saveToStorage(updatedStudents);
    
    console.log('Student deleted, ID:', id);
  };

  // Clear all data (for testing)
  const clearAllData = () => {
    setStudents([]);
    localStorage.removeItem('studentManagementData');
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    clearAllData
  };
};
