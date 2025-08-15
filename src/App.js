import React, { useState } from 'react';
import Header from './components/Header';
import URLForm from './components/URLForm';
import URLList from './components/URLList';
import './styles/App.css';

function App() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const addNewUrl = (urlData) => {
    setShortenedUrls(prev => [urlData, ...prev]);
  };

  const deleteUrl = (id) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
  };

  const clearAllUrls = () => {
    setShortenedUrls([]);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <URLForm onAddUrl={addNewUrl} />
        <URLList 
          urls={shortenedUrls}
          onDeleteUrl={deleteUrl}
          onClearAll={clearAllUrls}
        />
      </div>
    </div>
  );
}

export default App;
