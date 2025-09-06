/**
 * Form Validation Utilities
 */

/**
 * Email validation using regex
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Name validation - checks for reasonable name format
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;

  const trimmedName = name.trim();


// Allow letters, spaces, hyphens, periods, commas, apostrophes
  const nameRegex = /^[a-zA-Z\\s\\-\\.,']+$/;
  return trimmedName.length >= 2 && trimmedName.length <= 100 && nameRegex.test(trimmedName);
};



/**
 * URL validation for profile images
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return true; // Optional field

  try {
    const urlObj = new URL(url);

    // Check if it's http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }

    // Check if it looks like an image URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext =>
      urlObj.pathname.toLowerCase().includes(ext)
    );

    // Allow URLs without extensions if they contain 'image', 'avatar', or 'photo'
    const hasImageKeywords = ['image', 'avatar', 'photo', 'ui-avatars'].some(keyword =>
      url.toLowerCase().includes(keyword)
    );

    return hasImageExtension || hasImageKeywords;
  } catch {
    return false;
  }
};

/**
 * Main student form validation function
 */
export const validateStudentForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (!isValidName(formData.name)) {
    errors.name = 'Please enter a valid name (2-100 characters, letters only)';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Course validation
  if (!formData.enrolledCourse) {
    errors.enrolledCourse = 'Please select a course';
  }

  // Profile image validation (optional)
  if (formData.profileImage && !isValidImageUrl(formData.profileImage)) {
    errors.profileImage = 'Please enter a valid image URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Individual field validation
 */
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'name':
      if (!value) return 'Name is required';
      if (!isValidName(value)) return 'Please enter a valid name (2-100 characters, letters only)';
      return null;

    case 'email':
      if (!value) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email address';
      return null;

    case 'enrolledCourse':
      if (!value) return 'Please select a course';
      return null;

    case 'profileImage':
      if (value && !isValidImageUrl(value)) return 'Please enter a valid image URL';
      return null;

    default:
      return null;
  }
};

/**
 * Async validation for checking email uniqueness
 */
export const validateEmailUniqueness = async (email, currentStudentId) => {
  const studentId = currentStudentId || null;

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('students');
        const students = stored ? JSON.parse(stored) : [];

        const existingStudent = students.find(s =>
          s.email.toLowerCase() === email.toLowerCase() &&
          s.id !== studentId
        );

        if (existingStudent) {
          resolve({
            isValid: false,
            error: 'A student with this email already exists'
          });
        } else {
          resolve({
            isValid: true,
            error: null
          });
        }
      } catch {
        resolve({
          isValid: true,
          error: null
        });
      }
    }, 300);
  });
};
