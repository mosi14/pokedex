import React from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
  React.useEffect(() => {
    navigate("/page/1");
  }, []);

  return null; 
};

export default IndexPage;