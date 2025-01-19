import React from "react";
import { render, screen, within } from "@testing-library/react";
import Pokemon from "../Pokemon"; 
import { GlobalProvider } from "../../context/GlobalContext"; 


const mockPokemonData = {
  name: { en: "Bulbasaur", it: "Bulbasaur", fr: "Bulbizarre", es: "Bulbasaur" },
  genus: { en: "Seed Pokémon", it: "Pokémon Seme", fr: "Pokémon Graine", es: "Pokémon Semilla" },
  description: {
    en: "A strange seed was planted on its back at birth.",
    it: "Un seme strano è stato piantato sulla sua schiena alla nascita.",
    fr: "Une graine étrange a été plantée sur son dos à la naissance.",
    es: "Una semilla extraña fue plantada en su espalda al nacer.",
  },
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  height: 7,
  weight: 69,
  types: ["grass", "poison"],
  abilities: ["overgrow", "chlorophyll"],
  stats: [
    { name: "hp", value: 45 },
    { name: "attack", value: 49 },
    { name: "defense", value: 48 },
    { name: "speed", value: 43 },
  ],
  language: "en", 
};

describe("Pokemon Component", () => {
  it("renders Pokémon details correctly", () => {
    render(
      <GlobalProvider
        value={{
          language: "en", 
          searchQuery: "",
          setSearchQuery: jest.fn(),
          setLanguage: jest.fn(),
        }}
      >
        <Pokemon
          pageContext={{
            ...mockPokemonData,
          }}
        />
      </GlobalProvider>
    );

    // Check for the Pokémon name
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();

    // Check for the Pokémon genus
    expect(screen.getByText(/Seed Pokémon/i)).toBeInTheDocument();

    // Check for the Pokémon description
    expect(screen.getByText(/A strange seed was planted on its back at birth./i)).toBeInTheDocument();

    // Check for the Pokémon height and weight
    expect(screen.getByText(/Height:/i)).toBeInTheDocument();
    expect(screen.getByText(/0.7/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Weight:/i)).toBeInTheDocument();
    expect(screen.getByText(/6.9/i)).toBeInTheDocument();
    expect(screen.getByText(/kg/i)).toBeInTheDocument();

    // Check for Pokémon types
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();

    // Check for Pokémon abilities
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();

 
    // Scope stats queries to the relevant section
    const statsSection = screen.getByText(/Base Stats/i).closest("div");
    const stats = within(statsSection);
    // Check base stats
    expect(stats.getByText(/hp/i)).toBeInTheDocument();
    expect(stats.getByText("45")).toBeInTheDocument();
    expect(stats.getByText(/attack/i)).toBeInTheDocument();
    expect(stats.getByText("49")).toBeInTheDocument();
    expect(stats.getByText(/defense/i)).toBeInTheDocument();
    expect(stats.getByText("48")).toBeInTheDocument();
    expect(stats.getByText(/speed/i)).toBeInTheDocument();
    expect(stats.getByText("43")).toBeInTheDocument();
  });
});