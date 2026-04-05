import { HashRouter } from "react-router-dom";

import type { JSX } from "react";

import Navbar from "@/components/Navbar/Navbar";

import { CocktailRouter } from "@/router/CocktailRouter";

function App(): JSX.Element {
  return (
    <HashRouter>
      <Navbar></Navbar>
      <CocktailRouter></CocktailRouter>
    </HashRouter>
  );
}

export default App;
