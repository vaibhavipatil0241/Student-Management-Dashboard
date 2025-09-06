/**
 * Courses Service - Mock API
 */

// Mock courses data
const mockCourses = [
  { id: 1, name: "HTML Basics" },
  { id: 2, name: "CSS Mastery" },
  { id: 3, name: "JavaScript Pro" },
  { id: 4, name: "React In Depth" },
  { id: 5, name: "Node.js Backend" },
  { id: 6, name: "Python Programming" },
  { id: 7, name: "Data Structures" },
  { id: 8, name: "Web Security" }
];

/**
 * Courses Service API
 */
export const coursesService = {
  /**
   * Get all available courses
   */
  async getAllCourses() {
    console.log('📡 API: Fetching courses...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('✅ API: Courses fetched successfully:', mockCourses.length, 'courses');
    return mockCourses;
  },

  /**
   * Get course by ID
   */
  async getCourseById(id) {
    console.log('📡 API: Fetching course by ID:', id);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const course = mockCourses.find(c => c.id === parseInt(id));
    
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    
    console.log('✅ API: Course retrieved:', course);
    return course;
  }
};
