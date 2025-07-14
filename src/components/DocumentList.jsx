import React from 'react';

export default function DocumentList({ documents, onOpen }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Open Document</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.filename}>
              <button onClick={() => onOpen(doc.filename)}>{doc.filename}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
