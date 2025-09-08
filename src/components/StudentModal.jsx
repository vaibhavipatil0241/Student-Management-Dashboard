import React, { useState, useEffect } from 'react';

const StudentModal = ({ student, courses, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    profileImage: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  // Set form data when editing existing student or reset for new student
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        course: student.course || '',
        profileImage: student.profileImage || '',
        status: student.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        course: '',
        profileImage: '',
        status: 'active'
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create the final student data object
      const finalData = {
        ...formData,
        // Keep the original ID if editing
        id: student ? student.id : undefined,
        // Keep original enrollment date if editing
        enrolledDate: student ? student.enrolledDate : new Date().toLocaleDateString('en-US')
      };
      
      onSubmit(finalData);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter student name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="student@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select
              value={formData.course}
              onChange={(e) => handleChange('course', e.target.value)}
              className={errors.course ? 'error' : ''}
            >
              <option value="">-- Select a Course --</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course && <span className="error-text">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              type="url"
              value={formData.profileImage}
              onChange={(e) => handleChange('profileImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
