import React from 'react';
import URLItem from './URLItem';
import '../styles/components/URLList.css';

const URLList = ({ urls, onDeleteUrl, onClearAll }) => {
  if (urls.length === 0) {
    return (
      <div className="url-list-container">
        <div className="empty-state">
          <h3>No URLs shortened yet</h3>
          <p>Enter a URL above to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="url-list-container">
      <div className="list-header">
        <h2>Your Shortened URLs ({urls.length})</h2>
        <button onClick={onClearAll} className="clear-all-btn">
          Clear All
        </button>
      </div>
      <div className="url-list">
        {urls.map((url) => (
          <URLItem
            key={url.id}
            url={url}
            onDelete={() => onDeleteUrl(url.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default URLList;
