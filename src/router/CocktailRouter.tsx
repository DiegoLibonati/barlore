import { Route, Routes } from "react-router-dom";

import { HomePage } from "@src/pages/HomePage/HomePage";
import { AboutPage } from "@src/pages/AboutPage/AboutPage";
import { CocktailDetailPage } from "@src/pages/CocktailDetailPage/CocktailDetailPage";
import { ErrorPage } from "@src/pages/ErrorPage/ErrorPage";

import { PublicRoute } from "@src/router/PublicRoute";

export const CocktailRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route
          path="/cocktail/:id"
          element={<CocktailDetailPage></CocktailDetailPage>}
        ></Route>
      </Route>

      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  );
};
