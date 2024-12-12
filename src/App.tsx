import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";

import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { CocktailDetailPage } from "./pages/CocktailDetailPage";
import { ErrorPage } from "./pages/ErrorPage";

import "./General.css";

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
