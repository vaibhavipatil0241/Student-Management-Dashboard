import React from 'react';
import './ErrorMessage.css';

/**
 * ErrorMessage Component
 */
const ErrorMessage = ({ message, onRetry, type = 'error' }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'error':
      default: return '❌';
    }
  };

  return (
    <div className={`error-message ${type}`}>
      <div className="error-content">
        <div className="error-icon">{getIcon()}</div>
        <div className="error-text">
          <h3>Something went wrong</h3>
          <p>{message}</p>
        </div>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          🔄 Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
