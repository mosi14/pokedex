import React from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
  // Redirect to the first paginated page
  React.useEffect(() => {
    navigate("/page/1");
  }, []);

  return null; // Optionally display a loading message here
};

export default IndexPage;