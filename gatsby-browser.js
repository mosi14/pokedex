import React from "react";
import "./src/styles/global.css";
import { LanguageProvider } from "./src/context/LanguageContext";

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
