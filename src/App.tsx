import { HashRouter } from "react-router-dom";

import Navbar from "@/components/Navbar/Navbar";

import { CocktailRouter } from "@/router/CocktailRouter";

function App() {
  return (
    <HashRouter>
      <Navbar></Navbar>
      <CocktailRouter></CocktailRouter>
    </HashRouter>
  );
}

export default App;
