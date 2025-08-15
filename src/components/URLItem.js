import React, { useState } from 'react';
import '../styles/components/URLItem.css';

const URLItem = ({ url, onDelete }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch {}
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="url-item">
      <div className="url-content">
        <div className="url-section">
          <label className="url-label">Original URL:</label>
          <p className="url-text original">{url.original}</p>
        </div>
        <div className="url-section">
          <label className="url-label">Shortened URL:</label>
          <p className="url-text shortened">{url.shortened}</p>
        </div>
      </div>
      <div className="url-actions">
        <div className="action-buttons">
          <button
            onClick={() => copyToClipboard(url.shortened)}
            className={`copy-btn ${copySuccess ? 'success' : ''}`}
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={onDelete} className="delete-btn">
            Delete
          </button>
        </div>
        <span className="created-date">Created: {url.createdAt}</span>
      </div>
    </div>
  );
};

export default URLItem;
