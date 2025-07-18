import React from 'react';

interface SnackbarProps {
  open: boolean;
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ open, message }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-6 py-3 rounded shadow-lg z-[9999] animate-fadeIn">
      {message}
    </div>
  );
};

export default Snackbar; 