// src/hooks/useStudentManager.js
import { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';

export function useStudentManager() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    studentService.getAllStudents().then(setStudents);
  }, []);

  const addStudent = async data => {
    const created = await studentService.createStudent(data);
    setStudents(prev => [...prev, created]);
  };

  return { students, addStudent };
}
