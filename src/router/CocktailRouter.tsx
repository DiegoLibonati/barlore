import { Routes, Route, Navigate } from "react-router-dom";

import type { JSX } from "react";

import HomePage from "@/pages/HomePage/HomePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import CocktailDetailPage from "@/pages/CocktailDetailPage/CocktailDetailPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import { PublicRoute } from "@/router/PublicRoute";

export const CocktailRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/cocktail/:id" element={<CocktailDetailPage></CocktailDetailPage>}></Route>
        <Route path="/error" element={<ErrorPage></ErrorPage>}></Route>
      </Route>

      <Route path="/*" element={<Navigate to={"/error"}></Navigate>}></Route>
    </Routes>
  );
};
