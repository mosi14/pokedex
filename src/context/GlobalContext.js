import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <GlobalContext.Provider value={{ searchQuery, setSearchQuery, language, setLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);