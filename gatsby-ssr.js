import React from "react";
import { GlobalProvider } from "./src/context/GlobalContext";

exports.wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>;
};