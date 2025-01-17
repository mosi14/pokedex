import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Navbar from "../components/Navbar";
import { use } from "react";

const PokemonList = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage === 2 ? `/` : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setLanguage={setLanguage}
      />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Pokédex</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.allPokemon.nodes.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <div className="bg-white p-4 shadow-md hover:shadow-lg">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full h-32 object-contain"
                />
                <h2 className="text-xl text-center">{pokemon.name}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {!isFirst && (
            <Link
              to={prevPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              ← Previous
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <Link
              key={`pagination-number${i + 1}`}
              to={i === 0 ? `/` : `/page/${i + 1}`}
              className={`px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              } rounded-lg`}
            >
              {i + 1}
            </Link>
          ))}
          {!isLast && (
            <Link
              to={nextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query PokemonListQuery($skip: Int!, $limit: Int!) {
    allPokemon(skip: $skip, limit: $limit) {
      nodes {
        id
        name
        image
      }
    }
  }
`;

export default PokemonList;
