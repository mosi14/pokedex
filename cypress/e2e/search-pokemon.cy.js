describe("Pokemon Search E2E Test", () => {
    it("Searches for a Pokémon successfully", () => {
      cy.visit("http://localhost:8000");
  
      // Check if the search input exists
      cy.get('[data-testid="search-box"]').should("exist");
  
      // Type into the search box
      cy.get('[data-testid="search-box"]').type("pikachu");
  
      // Validate that the Pokémon appears in the search results
      cy.contains("Pikachu").should("exist");
    });
  
    it("Displays no results for an invalid search query", () => {
      cy.visit("http://localhost:8000");
  
      // Type an invalid search query
      cy.get('[data-testid="search-box"]').type("invalidPokemon");
  
      // Validate that a "no results" message is shown
      cy.contains("No Pokémon found").should("exist");
    });
  });