import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { GlobalProvider } from "../../context/GlobalContext";

describe("Navbar Component", () => {
  test("renders the Navbar component correctly", () => {
    render(
      <GlobalProvider>
        <Navbar />
      </GlobalProvider>
    );

    // Check if the Pokédex title is rendered
    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText("Search Pokémon...")).toBeInTheDocument();

    // Check if the language select is rendered
    expect(screen.getByDisplayValue("En")).toBeInTheDocument();
  });

  test("updates search query when input changes", () => {
    render(
      <GlobalProvider>
        <Navbar />
      </GlobalProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search Pokémon...");
    fireEvent.change(searchInput, { target: { value: "Pikachu" } });

    expect(searchInput.value).toBe("Pikachu");
  });

  test("updates language when dropdown changes", () => {
    render(
      <GlobalProvider>
        <Navbar />
      </GlobalProvider>
    );

    const languageSelect = screen.getByDisplayValue("En");
    fireEvent.change(languageSelect, { target: { value: "fr" } });

    expect(languageSelect.value).toBe("fr");
  });
});