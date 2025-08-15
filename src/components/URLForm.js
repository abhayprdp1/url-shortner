import React, { useState } from 'react';
import { isValidUrl } from '../utils/urlValidator';
import { generateShortCode } from '../utils/shortCodeGenerator';
import '../styles/components/URLForm.css';

const URLForm = ({ onAddUrl }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const normalizeUrl = (url) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return '';
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      return `https://${trimmedUrl}`;
    }
    return trimmedUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      setIsLoading(false);
      return;
    }

    const normalizedUrl = normalizeUrl(originalUrl);

    if (!isValidUrl(normalizedUrl)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 600)); // Simulated delay
      const shortCode = generateShortCode();
      const newUrlData = {
        id: Date.now(),
        original: normalizedUrl,
        shortened: `https://short.ly/${shortCode}`,
        shortCode: shortCode,
        clicks: 0,
        createdAt: new Date().toLocaleDateString()
      };
      onAddUrl(newUrlData);
      setOriginalUrl('');
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setOriginalUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="url-form-center-card">
      <div className="url-form-heading">
        <h2>Paste the URL to be shortened</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          id="url-input"
          type="text"
          value={originalUrl}
          onChange={handleInputChange}
          placeholder="www.example.com"
          className="url-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !originalUrl.trim()}
          className="shorten-btn"
        >
          Shorten URL
        </button>
      </form>
      {error && (
        <div className="error-message" role="alert" aria-live="polite">
          {error}
        </div>
      )}
      <div className="url-form-desc">
        ShortURL is a free tool to shorten URLs and generate short links<br/>
        URL shortener allows to create a shortened link making it easy to share
      </div>
    </div>
  );
};

export default URLForm;
