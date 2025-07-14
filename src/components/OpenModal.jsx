import React, { useState, useEffect } from 'react';
import Modal from './Modal';

export default function OpenModal({ open, onClose, documents, currentDoc, handleOpen }) {
  const [selectedDoc, setSelectedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentDoc) {
      setSelectedDoc(currentDoc);
    }
  }, [currentDoc]);

  const onOpenDocument = async () => {
    if (!selectedDoc) {
      setError('Please select a document to open');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await handleOpen({ target: { value: selectedDoc } });
      onClose();
    } catch (err) {
      setError('Failed to open document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError('');
      setSelectedDoc('');
      onClose();
    }
  };

  const formatFileSize = (filename) => {
    // Mock file size - in real app, this would come from API
    return '1.2 KB';
  };

  const formatDate = (filename) => {
    // Mock date - in real app, this would come from API  
    return new Date().toLocaleDateString();
  };

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-office-gray-50 px-6 py-4 border-b border-office-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-office-blue-100 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-office-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 id="modal-title" className="text-lg font-semibold text-office-gray-800">
                Open Document
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
        <div className="p-6">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-office-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-office-gray-500">No documents found</p>
              <p className="text-sm text-office-gray-400 mt-1">Create and save a document first</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-office-gray-700 mb-2">
                  Recent Documents
                </label>
                <div className="max-h-64 overflow-y-auto border border-office-gray-200 rounded-md bg-office-gray-50">
                  {documents.map((doc, index) => (
                    <div
                      key={doc.filename}
                      className={`flex items-center p-3 cursor-pointer border-b border-office-gray-200 last:border-b-0 hover:bg-white transition-colors ${
                        selectedDoc === doc.filename ? 'bg-office-blue-50 border-office-blue-200' : ''
                      }`}
                      onClick={() => {
                        setSelectedDoc(doc.filename);
                        if (error) setError('');
                      }}
                    >
                      <input
                        type="radio"
                        name="document"
                        value={doc.filename}
                        checked={selectedDoc === doc.filename}
                        onChange={() => setSelectedDoc(doc.filename)}
                        className="w-4 h-4 text-office-blue-600 border-office-gray-300 focus:ring-office-blue-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-office-gray-900">
                              {doc.filename}
                            </p>
                            <p className="text-xs text-office-gray-500">
                              Modified {formatDate(doc.filename)} • {formatFileSize(doc.filename)}
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-office-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-sm text-error-600 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-office-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="btn btn-secondary disabled:opacity-50"
            >
              Cancel
            </button>
            {documents.length > 0 && (
              <button
                type="button"
                onClick={onOpenDocument}
                disabled={isLoading || !selectedDoc}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Opening...
                  </span>
                ) : (
                  'Open Document'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}