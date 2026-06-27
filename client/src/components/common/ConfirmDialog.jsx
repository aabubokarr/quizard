import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  variant = 'danger' // danger, primary, success
}) => {
  const confirmVariants = {
    danger: 'danger',
    primary: 'primary',
    success: 'success'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`p-3 rounded-full ${
          variant === 'danger' 
            ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600' 
            : 'bg-brand-50 dark:bg-brand-950/30 text-brand-600'
        }`}>
          <FiAlertTriangle size={32} />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">{message}</p>
        </div>

        <div className="flex gap-3 w-full mt-4">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="flex-1"
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button 
            variant={confirmVariants[variant]} 
            onClick={onConfirm} 
            loading={loading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
