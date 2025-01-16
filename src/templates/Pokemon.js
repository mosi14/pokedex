import React from "react";

const PokemonPage = ({ pageContext }) => {
  console.log("Page context:", pageContext);
  const { id, name, genus, description, image } = pageContext;

  if (!id) {
    return <p>Error: Pokémon data is missing!</p>;
  }

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name} width={40} height={40} />
      <p>Genus: {genus}</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default PokemonPage;
