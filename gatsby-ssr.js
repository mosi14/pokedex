import React from "react";
import "./src/styles/global.css";
import { GlobalProvider } from "./src/context/GlobalContext";

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>{element}</GlobalProvider>
);
