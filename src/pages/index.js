import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Navbar from "../components/Navbar";

const IndexPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  // Filter Pokémon by search query
  const filteredPokemon = data.allPokemon.nodes.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setLanguage={setLanguage}
      />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full h-40 object-contain"
                />
                <h2 className="text-xl font-bold mt-4 text-center capitalize">
                  {pokemon.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  {
    allPokemon {
      nodes {
        id
        name
        genus
        description
        image
      }
    }
  }
`;

export default IndexPage;