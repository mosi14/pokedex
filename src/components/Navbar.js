import React, { useState } from "react";

const Navbar = ({ searchQuery, setSearchQuery, setLanguage }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Pokédex</h1>

        {/* Search Box */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg text-black"
          />
        </div>

        {/* Language Selector */}
        <select
          onChange={handleLanguageChange}
          className="ml-4 px-4 py-2 rounded-lg bg-white text-black"
        >
          <option value="en">English</option>
          <option value="it">Italian</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;