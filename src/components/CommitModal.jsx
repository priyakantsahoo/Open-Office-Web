import React, { useState } from 'react';
import Modal from './Modal';

export default function CommitModal({ open, onClose, onCommit }) {
  const [commitMessage, setCommitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCommit = async (e) => {
    e.preventDefault();
    
    if (!commitMessage.trim()) {
      setError('Please enter a commit message');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      if (onCommit) {
        await onCommit(commitMessage.trim());
      }
      onClose();
      setCommitMessage('');
    } catch (err) {
      setError('Failed to commit changes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError('');
      setCommitMessage('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} size="md">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-office-gray-50 px-6 py-4 border-b border-office-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success-100 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 id="modal-title" className="text-lg font-semibold text-office-gray-800">
                Commit Changes
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-1 text-office-gray-400 hover:text-office-gray-600 hover:bg-office-gray-200 rounded transition-colors disabled:opacity-50"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <form onSubmit={handleCommit} className="p-6">
          <div className="mb-4">
            <div className="bg-office-blue-50 border border-office-blue-200 rounded-md p-4 mb-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-office-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="text-office-blue-800 font-medium">About Committing Changes</p>
                  <p className="text-office-blue-700 mt-1">
                    This will create a snapshot of your current document with a descriptive message for future reference.
                  </p>
                </div>
              </div>
            </div>

            <label htmlFor="commit-message" className="block text-sm font-medium text-office-gray-700 mb-2">
              Commit message *
            </label>
            <textarea
              id="commit-message"
              rows={3}
              placeholder="Describe the changes you made (e.g., 'Added new section on project timeline')"
              className={`input resize-none ${error ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={commitMessage}
              onChange={(e) => {
                setCommitMessage(e.target.value);
                if (error) setError('');
              }}
              disabled={isLoading}
              autoFocus
              required
            />
            <p className="text-xs text-office-gray-500 mt-1">
              Be descriptive about what changes were made to help track document history
            </p>
            
            {error && (
              <p className="text-sm text-error-600 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <div className="bg-office-gray-50 border border-office-gray-200 rounded-md p-3 mb-4">
            <p className="text-xs font-medium text-office-gray-700 mb-1">Changes to be committed:</p>
            <div className="flex items-center text-xs text-office-gray-600">
              <span className="w-2 h-2 bg-success-500 rounded-full mr-2"></span>
              Current document content
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-office-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="btn btn-secondary disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !commitMessage.trim()}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Committing...
                </span>
              ) : (
                'Commit Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}