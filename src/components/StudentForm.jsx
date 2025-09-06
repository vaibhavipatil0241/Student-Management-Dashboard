import React, { useState, useEffect, useRef } from 'react';
import './StudentForm.css';

export default function StudentForm({ courses = [], onSubmit, onCancel, editingStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrolledCourse: '',
    profileImage: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        email: editingStudent.email || '',
        enrolledCourse: editingStudent.enrolledCourse || '',
        profileImage: editingStudent.profileImage || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        enrolledCourse: '',
        profileImage: ''
      });
    }
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.enrolledCourse) newErrors.enrolledCourse = 'Select a course';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAvatar = () => {
    if (!formData.name.trim()) return;
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name.trim())}&background=random&size=128`;
    setFormData(prev => ({ ...prev, profileImage: url }));
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2>{editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
        <p className="form-subtitle">{editingStudent ? 'Update student information' : 'Fill in details to add a new student'}</p>
      </div>

      <form onSubmit={handleSubmit} className="student-form" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name *</label>
          <input
            id="name"
            name="name"
            ref={nameInputRef}
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter student's full name"
            disabled={isSubmitting}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="student@example.com"
            disabled={isSubmitting}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="enrolledCourse" className="form-label">Course *</label>
          <select
            id="enrolledCourse"
            name="enrolledCourse"
            value={formData.enrolledCourse}
            onChange={handleChange}
            className={`form-select ${errors.enrolledCourse ? 'error' : ''}`}
            disabled={isSubmitting}
            required
          >
            <option value="">-- Select a Course --</option>
            {courses.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
          {errors.enrolledCourse && <span className="error-message">{errors.enrolledCourse}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="profileImage" className="form-label">Profile Image URL (optional)</label>
          <div className="image-input-group">
            <input
              id="profileImage"
              name="profileImage"
              type="url"
              value={formData.profileImage}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={generateAvatar}
              className="generate-image-btn"
              disabled={!formData.name.trim() || isSubmitting}
              title="Generate avatar from name"
            >
              🎨 Generate
            </button>
          </div>
        </div>

        {formData.profileImage && (
          <div className="image-preview">
            <img
              src={formData.profileImage}
              alt="Profile preview"
              className="preview-image"
              onError={e => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (editingStudent ? 'Updating...' : 'Adding...') : (editingStudent ? 'Update Student' : 'Add Student')}
          </button>
        </div>
      </form>
    </div>
  );
}
