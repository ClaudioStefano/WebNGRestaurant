import React from 'react';

function ToastNotification({ toast }) {
  if (!toast.show) return null;

  return (
    <div className={`ngr-toast-notification toast-${toast.type} animate-slide-up`}>
      <div className="toast-content-box">
        <i className={`fa-solid ${
          toast.type === 'success' ? 'fa-circle-check text-green animate-bounce' : 
          toast.type === 'info' ? 'fa-circle-info text-blue' : 'fa-circle-exclamation text-yellow'
        } toast-icon`}></i>
        <span className="toast-message-text">{toast.message}</span>
      </div>
      <div className="toast-progress-bar"></div>
    </div>
  );
}

export default ToastNotification;
