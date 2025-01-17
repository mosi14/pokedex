import React from "react";
import { Link } from "gatsby";
import { useGlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery, language, setLanguage } =
    useGlobalContext();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        Pokédex
      </Link>
      <div className="flex space-x-4 items-center">
        <input
          data-testid="search-box"
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="en">En</option>
          <option value="it">It</option>
          <option value="fr">Fr</option>
          <option value="es">ES</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
