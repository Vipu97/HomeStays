import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleQueryChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  return (
    <div>
      <Header
        searchInput={searchInput}
        handleQueryChange={handleQueryChange}
      />
      <Outlet context={{ searchInput}} />
    </div>
  );
};

export default Layout;
