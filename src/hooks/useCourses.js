import { useState, useEffect } from 'react';
import { coursesService } from '../services/coursesService';

/**
 * Custom hook for managing courses data
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Async function within useEffect
     */
    const fetchCourses = async () => {
      try {
        console.log('📚 Fetching courses...');
        setLoading(true);
        setError(null);
        
        // Fetch courses from API
        const data = await coursesService.getAllCourses();
        
        console.log('✅ Courses fetched successfully:', data.length, 'courses');
        setCourses(data);
      } catch (err) {
        console.error('❌ Error fetching courses:', err);
        setError(err.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array - run once on mount

  return {
    courses,
    loading,
    error
  };
};
