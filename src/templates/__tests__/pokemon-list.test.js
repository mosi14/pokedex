import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonList from "../pokemon-list";
import { GlobalProvider } from "../../context/GlobalContext";

const mockData = {
  allPokemon: {
    nodes: [
      {
        id: "1",
        name: {
          en: "Bulbasaur",
          it: "Bulbasso",
          fr: "Bulbizarre",
          es: "Bulbasaur",
        },
        image: "bulbasaur_image_url",
        height: 7,
        weight: 69,
      },
    ],
  },
  paginatedPokemon: {
    nodes: [
      {
        id: "1",
        name: {
          en: "Bulbasaur",
          it: "Bulbasso",
          fr: "Bulbizarre",
          es: "Bulbasaur",
        },
        image: "bulbasaur_image_url",
        height: 7,
        weight: 69,
      },
    ],
  },
};

const mockPageContext = {
  currentPage: 1,
  numPages: 5,
};

test("renders Pokémon list correctly", () => {
  render(
    <GlobalProvider>
      <PokemonList data={mockData} pageContext={mockPageContext} />
    </GlobalProvider>
  );
  // Check that the Pokémon name is rendered
  expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();

  // Check that the Pokémon image alt text is rendered
  expect(screen.getByAltText(/Bulbasaur/i)).toBeInTheDocument();

  // Check height and weight display
  expect(screen.getByText(/Height:/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight:/i)).toBeInTheDocument();
});
