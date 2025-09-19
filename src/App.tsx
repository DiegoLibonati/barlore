import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "@src/components/Navbar";

import { AboutPage } from "@src/pages/AboutPage";
import { HomePage } from "@src/pages/HomePage";
import { CocktailDetailPage } from "@src/pages/CocktailDetailPage";
import { ErrorPage } from "@src/pages/ErrorPage";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route
          path="/cocktail/:id"
          element={<CocktailDetailPage></CocktailDetailPage>}
        ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
