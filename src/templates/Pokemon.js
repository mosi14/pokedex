import React from "react";
import Navbar from "../components/Navbar";

const PokemonPage = ({ pageContext }) => {
  const { name, genus, description, image, height, weight, types, abilities, stats } = pageContext;
console.log(pageContext)
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          {/* Pokémon Image */}
          <img src={image} alt={name} className="w-40 h-40 mb-4 md:mb-0 md:mr-8" />
          
          {/* Pokémon Basic Info */}
          <div>
            <h1 className="text-4xl font-bold capitalize mb-2">{name}</h1>
            <p className="text-gray-600 mb-4"><strong>Genus:</strong> {genus}</p>
            <p className="text-gray-600 mb-4"><strong>Description:</strong> {description}</p>
            <p className="text-gray-600 mb-4"><strong>Height:</strong> {height / 10} m</p>
            <p className="text-gray-600 mb-4"><strong>Weight:</strong> {weight / 10} kg</p>
          </div>
        </div>

        {/* Pokémon Details */}
        <div className="mt-8">
          {/* Types */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Types</h2>
            <div className="flex space-x-2">
              {types.map((type) => (
                <span key={type} className="px-4 py-2 bg-blue-600 text-white rounded-full">
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Abilities</h2>
            <ul className="list-disc pl-5">
              {abilities.map((ability) => (
                <li key={ability} className="text-gray-600">{ability}</li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Base Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex justify-between items-center">
                  <span className="font-semibold capitalize">{stat.name}</span>
                  <span className="text-gray-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;