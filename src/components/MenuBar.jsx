import React, { useState, useRef, useEffect } from 'react';

export default function MenuBar({ fileInputRef, setModal, editorRef, onExportPdf }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMenuAction = (action) => {
    setOpenDropdown(null);
    
    switch (action) {
      case 'upload':
        if (fileInputRef.current) fileInputRef.current.click();
        break;
      case 'open':
        setModal('Open');
        break;
      case 'save':
        setModal('Save');
        break;
      case 'commit':
        setModal('Commit');
        break;
      case 'export-pdf':
        if (onExportPdf) onExportPdf();
        break;
      case 'undo':
        if (editorRef.current) editorRef.current.execCommand('Undo');
        break;
      case 'redo':
        if (editorRef.current) editorRef.current.execCommand('Redo');
        break;
      case 'bold':
        if (editorRef.current) editorRef.current.execCommand('Bold');
        break;
      case 'italic':
        if (editorRef.current) editorRef.current.execCommand('Italic');
        break;
      case 'underline':
        if (editorRef.current) editorRef.current.execCommand('Underline');
        break;
      default:
        break;
    }
  };


  return (
    <div className="menu-container">
      <div className="document-container">
        <div className="menu-card">
          {/* Toolbar */}
          <div className="toolbar" style={{position: "relative"}}>
        {/* File Operations Group */}
        <div className="toolbar-group">
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('upload')}
            title="Upload Document (Ctrl+O)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('open')}
            title="Open Document"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('save')}
            title="Save Document (Ctrl+S)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('export-pdf')}
            title="Export as PDF"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Edit Operations Group */}
        <div className="toolbar-group">
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('undo')}
            title="Undo (Ctrl+Z)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('redo')}
            title="Redo (Ctrl+Y)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Formatting Group */}
        <div className="toolbar-group">
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('bold')}
            title="Bold (Ctrl+B)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h6a4.5 4.5 0 013.207 7.5A4.5 4.5 0 0110 18H4a1 1 0 01-1-1V4zm2 1v3h5a2.5 2.5 0 000-5H5zm0 5v4h5a2.5 2.5 0 000-5H5z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('italic')}
            title="Italic (Ctrl+I)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.832.445l2 3A1 1 0 0112 8h-1v4h1a1 1 0 01.832 1.555l-2 3A1 1 0 0110 17a1 1 0 01-.832-.445l-2-3A1 1 0 018 12h1V8H8a1 1 0 01-.832-1.555l2-3A1 1 0 0110 3z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            className="toolbar-button"
            onClick={() => handleMenuAction('underline')}
            title="Underline (Ctrl+U)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 3a1 1 0 000 2v6a4 4 0 108 0V5a1 1 0 100-2v6a6 6 0 11-12 0V3zM4 16a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

            <div className="toolbar-spacer"></div>
            
            {/* Document Info */}
            <div className="text-xs px-2" style={{color: "var(--office-gray-500)"}}>
              Open Office Web - Ready
            </div>
            
            {/* File Menu Button */}
            <button
              className="toolbar-button"
              onClick={() => handleDropdownToggle('file')}
              title="File Menu"
              style={{marginLeft: "0.5rem"}}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* File Dropdown */}
            {openDropdown === 'file' && (
              <div className="dropdown-menu" ref={dropdownRef} style={{position: "absolute", top: "100%", right: "0.5rem", zIndex: 50}}>
                <button 
                  className="dropdown-item" 
                  onClick={() => handleMenuAction('upload')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Upload Document
                  </span>
                  <span className="text-xs ml-auto" style={{color: "var(--office-gray-400)"}}>Ctrl+O</span>
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => handleMenuAction('open')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Open Document
                  </span>
                </button>
                <hr style={{margin: "0.25rem 0", borderColor: "var(--office-gray-200)"}} />
                <button 
                  className="dropdown-item" 
                  onClick={() => handleMenuAction('save')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    Save Document
                  </span>
                  <span className="text-xs ml-auto" style={{color: "var(--office-gray-400)"}}>Ctrl+S</span>
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => handleMenuAction('export-pdf')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Export as PDF
                  </span>
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => handleMenuAction('commit')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Commit Changes
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}