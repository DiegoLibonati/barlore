import { BrowserRouter } from "react-router-dom";

import { Navbar } from "@src/components/Navbar/Navbar";

import { CocktailRouter } from "@src/router/CocktailRouter";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <CocktailRouter></CocktailRouter>
    </BrowserRouter>
  );
}

export default App;
