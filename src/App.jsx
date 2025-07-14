import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from './components/MenuBar';
import EditorPanel from './components/EditorPanel';
import SaveModal from './components/SaveModal';
import OpenModal from './components/OpenModal';
import CommitModal from './components/CommitModal';

export default function App() {
  const editorRef = useRef(null);
  const fileInputRef = useRef();
  const [content, setContent] = useState('<p>Welcome to Open Office Web! Start typing your document here...</p>');
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [modal, setModal] = useState(null);
  const [saveFilename, setSaveFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [documentHistory, setDocumentHistory] = useState([]);

  // Load documents on startup
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/list');
      setDocuments(res.data.documents);
    } catch (err) {
      showError('Failed to load documents');
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000); // Auto-hide after 5 seconds
  };

  const showSuccess = (message) => {
    // In a real app, you'd have a success toast/notification
    console.log('Success:', message);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContent(res.data.content);
      setCurrentDoc(null);
      if (editorRef.current) {
        editorRef.current.setContent(res.data.content);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
      setModal(null);
      showSuccess('Document uploaded successfully');
    } catch (err) {
      showError('Failed to upload document. Please check the file format and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = async (e) => {
    const filename = e.target.value;
    if (!filename) return;
    
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/open/${filename}`);
      setContent(res.data.content);
      setCurrentDoc(filename);
      if (editorRef.current) {
        editorRef.current.setContent(res.data.content);
      }
      setModal(null);
      showSuccess(`Opened ${filename}`);
    } catch (err) {
      showError('Failed to open document. The file might be corrupted or deleted.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!saveFilename.trim()) {
      throw new Error('Please enter a filename.');
    }
    
    try {
      const filename = saveFilename.endsWith('.html') ? saveFilename : saveFilename + '.html';
      await axios.post('http://localhost:5000/api/save', {
        content,
        filename,
      });
      
      setCurrentDoc(filename);
      setSaveFilename('');
      
      // Refresh document list
      await loadDocuments();
      showSuccess(`Document saved as ${filename}`);
    } catch (err) {
      throw new Error('Failed to save document. Please try again.');
    }
  };

  const handleCommit = async (commitMessage) => {
    try {
      // In a real app, this would save to a version control system
      const timestamp = new Date().toISOString();
      const commitData = {
        message: commitMessage,
        content,
        timestamp,
        document: currentDoc || 'untitled'
      };
      
      setDocumentHistory(prev => [commitData, ...prev]);
      showSuccess(`Changes committed: ${commitMessage}`);
    } catch (err) {
      throw new Error('Failed to commit changes. Please try again.');
    }
  };

  const handleExportPdf = async () => {
    if (!content.trim()) {
      showError('No content to export');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/export/pdf', {
        content,
        filename: currentDoc || 'document'
      }, {
        responseType: 'blob'
      });

      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = currentDoc ? 
        currentDoc.replace(/\.[^/.]+$/, '.pdf') : 
        `document_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showSuccess('PDF exported successfully');
    } catch (err) {
      showError('Failed to export PDF. Please try again.');
      console.error('Export error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = () => {
    setModal('Save');
  };

  return (
    <div className="app-container">
      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <div className="error-content">
            <div className="error-message">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError('')}
              className="error-close"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Menu Bar */}
      <MenuBar
        fileInputRef={fileInputRef}
        setModal={setModal}
        editorRef={editorRef}
        onExportPdf={handleExportPdf}
      />

      {/* Main Content */}
      <EditorPanel
        editorRef={editorRef}
        content={content}
        setContent={setContent}
        handleFileUpload={handleFileUpload}
        fileInputRef={fileInputRef}
        onSave={onSave}
      />

      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center">
          <span>{isLoading ? 'Processing...' : 'Ready'}</span>
          {currentDoc && (
            <span className="ml-auto">Current: {currentDoc}</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-3">{documents.length} documents</span>
          <span>{content.length} characters</span>
        </div>
      </div>

      {/* Modals */}
      <OpenModal
        open={modal === 'Open'}
        onClose={() => setModal(null)}
        documents={documents}
        currentDoc={currentDoc}
        handleOpen={handleOpen}
      />
      
      <SaveModal
        open={modal === 'Save'}
        onClose={() => { 
          setModal(null); 
          setSaveFilename(''); 
        }}
        saveFilename={saveFilename}
        setSaveFilename={setSaveFilename}
        handleSave={handleSave}
      />
      
      <CommitModal
        open={modal === 'Commit'}
        onClose={() => setModal(null)}
        onCommit={handleCommit}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <svg className="loading-spinner" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}