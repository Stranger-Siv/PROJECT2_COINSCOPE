// src/App.js
import React, { useState } from 'react';
import CryptoPriceList from './components/CryptoPriceList';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="container mx-auto px-4 py-6">
        <CryptoPriceList searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default App;
