import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md flex flex-col items-center gap-5">
        <div className="p-4 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full animate-bounce">
          <FiAlertCircle size={48} />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-zinc-100">404 - Not Found</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
            The page you are looking for does not exist or has been moved. Check the URL spelling and try again.
          </p>
        </div>

        <Button 
          variant="primary" 
          icon={FiArrowLeft}
          onClick={() => navigate('/')} 
          className="mt-2"
        >
          Back to Safety
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
