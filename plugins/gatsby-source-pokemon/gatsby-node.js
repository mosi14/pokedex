const axios = require("axios");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // Fetch the data from the PokeAPI
  const apiUrl = "https://pokeapi.co/api/v2/pokemon-species?limit=151";
  const response = await axios.get(apiUrl);
  const pokemonList = response.data.results;

  for (const pokemon of pokemonList) {
    const pokemonDetails = await axios.get(pokemon.url);

    const pokemonMainDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonDetails.data.id}`
    );

    createNode({
      id: createNodeId(pokemon.name),
      number: pokemonDetails.data.id,
      name: {
        en:
          pokemonDetails.data.names.find((n) => n.language.name === "en")
            ?.name || pokemonDetails.data.name,
        it:
          pokemonDetails.data.names.find((n) => n.language.name === "it")
            ?.name || pokemonDetails.data.name,
        fr:
          pokemonDetails.data.names.find((n) => n.language.name === "fr")
            ?.name || pokemonDetails.data.name,
        es:
          pokemonDetails.data.names.find((n) => n.language.name === "es")
            ?.name || pokemonDetails.data.name,
      },
      genus: {
        en:
          pokemonDetails.data.genera.find((g) => g.language.name === "en")
            ?.genus || "",
        it:
          pokemonDetails.data.genera.find((g) => g.language.name === "it")
            ?.genus || "",
        fr:
          pokemonDetails.data.genera.find((g) => g.language.name === "fr")
            ?.genus || "",
        es:
          pokemonDetails.data.genera.find((g) => g.language.name === "es")
            ?.genus || "",
      },
      description: {
        en:
          pokemonDetails.data.flavor_text_entries.find(
            (f) => f.language.name === "en"
          )?.flavor_text || "No description available",
        it:
          pokemonDetails.data.flavor_text_entries.find(
            (f) => f.language.name === "it"
          )?.flavor_text || "No description available",
        fr:
          pokemonDetails.data.flavor_text_entries.find(
            (f) => f.language.name === "fr"
          )?.flavor_text || "No description available",
        es:
          pokemonDetails.data.flavor_text_entries.find(
            (f) => f.language.name === "es"
          )?.flavor_text || "No description available",
      },
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`,
      height: pokemonMainDetails.data.height,
      weight: pokemonMainDetails.data.weight,
      types: pokemonMainDetails.data.types.map((t) => t.type.name),
      abilities: pokemonMainDetails.data.abilities.map((a) => a.ability.name),
      stats: pokemonMainDetails.data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemonDetails.data),
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Fetch Pokémon nodes from GraphQL
  const result = await graphql(`
    {
      allPokemon {
        nodes {
          id
          number
          name {
            en
            it
            fr
            es
          }
          genus {
            en
            it
            fr
            es
          }
          description {
            en
            it
            fr
            es
          }
          image
          height
          weight
          types
          abilities
          stats {
            name
            value
          }
        }
      }
    }
  `);

  const pokemon = result.data.allPokemon.nodes;
  const itemsPerPage = 20;
  const numPages = Math.ceil(pokemon.length / itemsPerPage);

  // 1. Create Paginated List Pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/page/${i + 1}`,
      //path: i === 0 ? `/` : `/page/${i + 1}`,
      component: require.resolve("../../src/templates/pokemon-list.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  createRedirect({
    fromPath: `/`,
    toPath: `/page/1/`,
    isPermanent: true,
    redirectInBrowser: true,
  });

  // 2. Create Detail Pages for Each Pokémon
  const pokemonTemplate = require.resolve("../../src/templates/Pokemon.js");

  pokemon.forEach((pokemon) => {
    const languages = ["en", "it", "fr", "es"];
    languages.forEach((lang) => {
      createPage({
        path: `/pokemon/${pokemon.name[lang].toLowerCase()}`,
        component: pokemonTemplate,
        context: {
          id: pokemon.id,
          number: pokemon.number,
          name: pokemon.name,
          genus: pokemon.genus,
          description: pokemon.description,
          image: pokemon.image,
          height: pokemon.height,
          weight: pokemon.weight,
          types: pokemon.types,
          abilities: pokemon.abilities,
          stats: pokemon.stats,
          lang,
        },
      });
    });
  });
};
