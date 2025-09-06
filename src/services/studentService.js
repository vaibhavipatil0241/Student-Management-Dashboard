// src/services/studentService.js

// Helper to simulate delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Get and parse students from localStorage
const getStoredStudents = () => {
  const raw = localStorage.getItem('students');
  return raw ? JSON.parse(raw) : [];
};

// Save students array to localStorage
const saveStoredStudents = arr => {
  localStorage.setItem('students', JSON.stringify(arr));
};

export const studentService = {
  async getAllStudents() {
    await delay(200);
    return getStoredStudents();
  },

  async createStudent(data) {
    await delay(200);
    const students = getStoredStudents();
    const newStudent = {
      id: Date.now().toString(),
      ...data
    };
    students.push(newStudent);
    saveStoredStudents(students);
    return newStudent;
  }
};
