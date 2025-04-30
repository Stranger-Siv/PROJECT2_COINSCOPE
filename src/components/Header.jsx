import React from 'react';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">CoinScope</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white px-6 py-2 rounded-md w-80 text-sm"
          placeholder="Search cryptocurrency..."
        />
      </div>
    </header>
  );
};

export default Header;
