import { useState, useCallback } from 'react';
import { validateField, validateStudentForm, validateEmailUniqueness } from '../utils/validation';

/**
 * Custom Form Validation Hook
 */
export const useFormValidation = (formData, validationRules = validateStudentForm) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Validate a single field
   */
  const validateSingleField = useCallback(async (fieldName) => {
    console.log(`🔍 Validating field: ${fieldName}`);
    
    const fieldError = validateField(fieldName, formData[fieldName], formData);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));

    // Special async validation for email
    if (fieldName === 'email' && formData.email && !fieldError) {
      setIsValidating(true);
      try {
        const emailValidation = await validateEmailUniqueness(formData.email);
        setErrors(prev => ({
          ...prev,
          email: emailValidation.isValid ? null : emailValidation.error
        }));
      } catch (error) {
        console.warn('Email uniqueness validation failed:', error);
      } finally {
        setIsValidating(false);
      }
    }

    return fieldError === null;
  }, [formData]);

  /**
   * Validate all fields
   */
  const validateAllFields = useCallback(async () => {
    console.log('🔍 Validating all fields');
    setIsValidating(true);

    try {
      // Run standard validation
      const validation = validationRules(formData);
      let finalErrors = { ...validation.errors };

      // Run async email validation if email is valid
      if (formData.email && !validation.errors.email) {
        const emailValidation = await validateEmailUniqueness(formData.email);
        if (!emailValidation.isValid) {
          finalErrors.email = emailValidation.error;
        }
      }

      setErrors(finalErrors);

      const isValid = Object.keys(finalErrors).length === 0;
      console.log(`✅ Validation complete. Valid: ${isValid}`);

      return {
        isValid,
        errors: finalErrors
      };
    } catch (error) {
      console.error('Validation error:', error);
      return {
        isValid: false,
        errors: { general: 'Validation failed. Please try again.' }
      };
    } finally {
      setIsValidating(false);
    }
  }, [formData, validationRules]);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    console.log('🧹 Clearing validation errors');
    setErrors({});
  }, []);

  /**
   * Check if form is currently valid
   */
  const isValid = Object.keys(errors).length === 0 && !isValidating;

  return {
    errors,
    isValid,
    isValidating,
    validateField: validateSingleField,
    validateAllFields,
    clearErrors
  };
};
