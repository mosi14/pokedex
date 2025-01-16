const axios = require("axios");


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // Fetch the data from the PokeAPI
  const apiUrl = "https://pokeapi.co/api/v2/pokemon-species?limit=151";
  const response = await axios.get(apiUrl);
  const pokemonList = response.data.results;

  for (const pokemon of pokemonList) {
    const pokemonDetails = await axios.get(pokemon.url);

    createNode({
      id: createNodeId(pokemon.name), 
      name: pokemonDetails.data.name,
      genus: pokemonDetails.data.genera.find(g => g.language.name === "en").genus,
      description: pokemonDetails.data.flavor_text_entries.find(f => f.language.name === "en").flavor_text,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`,
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemonDetails.data), // Ensure the node is uniquely identified
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
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
  `);

  const pokemonTemplate = require.resolve("../../src/templates/Pokemon.js");

  result.data.allPokemon.nodes.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}`,
      component: pokemonTemplate,
      context: {
        id: pokemon.id,
        name:pokemon.name,
        genus:pokemon.genus,
        description:pokemon.description,
        image:pokemon.image,
      },
    });
  });
};