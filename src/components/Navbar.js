import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Pokédex</h1>
      <div className="flex space-x-4 items-center">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        />

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
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