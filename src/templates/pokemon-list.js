import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { useGlobalContext } from "../context/GlobalContext";

const PokemonList = ({ data , pageContext }) => {
  const { searchQuery , language} = useGlobalContext();
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage === 2 ? `/` : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;

  const allPokemon = data.allPokemon.nodes;
  //const paginatedPokemon = data.paginatedPokemon.nodes;
  const paginatedPokemon = data?.paginatedPokemon?.nodes || [];

  const filteredPokemon = searchQuery
    ? allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paginatedPokemon;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-8 ">
          <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredPokemon.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.name[language].toLowerCase()}`} key={pokemon.id}>
                <div className="animate-fadeIn bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border border-gray-200 transition-transform transform hover:scale-105">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name[language]}
                    className="w-full h-40 object-contain"
                  />
                  <h2 className="text-xl font-bold text-center capitalize">
                    {pokemon.name[language]}
                  </h2>

                  <div className="text-gray-600 text-center">
                    <p>
                      <strong>Height:</strong> {pokemon.height / 10} m
                    </p>
                    <p>
                      <strong>Weight:</strong> {pokemon.weight / 10} kg
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!searchQuery && (
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PokemonListQuery($skip: Int!, $limit: Int!) {
    allPokemon {
      nodes {
        id
        name {
          en
          it
          fr
          es
        }
        image
        height
        weight
      }
    }
    paginatedPokemon: allPokemon(skip: $skip, limit: $limit) {
      nodes {
        id
        name {
          en
          it
          fr
          es
        }
        image
        height
        weight
      }
    }
  }
`;

export default PokemonList;
