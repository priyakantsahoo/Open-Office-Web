import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorPanel({ editorRef, content, setContent, handleFileUpload, fileInputRef, onSave }) {
  return (
    <div className="editor-container">
      <div className="document-container">
        <div className="editor-card">
          <Editor
            tinymceScriptSrc={'/node_modules/tinymce/tinymce.min.js'}
            onInit={(evt, editor) => {
              editorRef.current = editor;
              editor.on('SaveContent', () => onSave());
            }}
            value={content}
            onEditorChange={setContent}
            init={{
              license_key: 'gpl',
              base_url: '/node_modules/tinymce',
              suffix: '.min',
              promotion: false,
              branding: false,
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'save', 'autosave'
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | save',
              menubar: false,
              height: '900px',
              min_height: 900,
              resize: false,
              statusbar: true,
              elementpath: false,
              autosave_interval: '30s',
              autosave_retention: '2m',
              content_style: `
                html, body {
                  background: #fff;
                  margin: 0;
                  padding: 20px;
                  box-sizing: border-box;
                  font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', sans-serif;
                  color: #323130;
                  font-size: 14px;
                  line-height: 1.6;
                  height: 100%;
                }
                
                .mce-content-body {
                  max-width: 100%;
                  margin: 0;
                  background: white;
                  padding: 40px;
                  min-height: 500px;
                  height: auto;
                }
                
                @media screen and (max-width: 768px) {
                  .mce-content-body {
                    max-width: 100%;
                    padding: 1cm;
                    box-shadow: none;
                  }
                  
                  html, body {
                    padding: 20px;
                  }
                }
                
                .tox-promotion, .tox-statusbar__branding { 
                  display: none !important; 
                }
                
                /* Professional typography */
                h1 { font-size: 24px; font-weight: 600; margin: 0 0 16px 0; color: #323130; }
                h2 { font-size: 20px; font-weight: 600; margin: 0 0 14px 0; color: #323130; }
                h3 { font-size: 18px; font-weight: 600; margin: 0 0 12px 0; color: #323130; }
                h4 { font-size: 16px; font-weight: 600; margin: 0 0 10px 0; color: #323130; }
                h5 { font-size: 14px; font-weight: 600; margin: 0 0 8px 0; color: #323130; }
                h6 { font-size: 12px; font-weight: 600; margin: 0 0 6px 0; color: #323130; }
                
                p { margin: 0 0 12px 0; }
                
                ul, ol { 
                  margin: 0 0 12px 0; 
                  padding-left: 24px;
                }
                
                li { margin-bottom: 4px; }
                
                table { 
                  border-collapse: collapse; 
                  width: 100%; 
                  margin: 12px 0;
                }
                
                table td, table th { 
                  border: 1px solid #D2D0CE; 
                  padding: 8px 12px; 
                  text-align: left;
                }
                
                table th { 
                  background-color: #F3F2F1; 
                  font-weight: 600;
                  color: #323130;
                }
                
                blockquote {
                  border-left: 4px solid #0078D4;
                  margin: 12px 0;
                  padding: 8px 16px;
                  background-color: #F0F6FF;
                  font-style: italic;
                }
                
                code {
                  background-color: #F3F2F1;
                  padding: 2px 4px;
                  border-radius: 3px;
                  font-family: 'Cascadia Code', 'Consolas', 'Courier New', monospace;
                  font-size: 13px;
                }
                
                pre {
                  background-color: #F3F2F1;
                  padding: 12px;
                  border-radius: 4px;
                  overflow-x: auto;
                  margin: 12px 0;
                }
                
                pre code {
                  background: none;
                  padding: 0;
                }
              `,
            }}
          />
          
          {/* Hidden file input for Upload */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}
