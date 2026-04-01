import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Cocktail } from "@/types/app";

import Loading from "@/components/Loading/Loading";
import IngredientItem from "@/components/IngredientItem/IngredientItem";

import { cocktailsService } from "@/services/cocktailsService";

import "@/pages/CocktailDetailPage/CocktailDetailPage.css";

const CocktailDetailPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const ingredients = useMemo(() => {
    if (!cocktail) return [];

    return [
      cocktail?.strIngredient1,
      cocktail?.strIngredient2,
      cocktail?.strIngredient3,
      cocktail?.strIngredient4,
      cocktail?.strIngredient5,
    ];
  }, [cocktail]);

  const handleGetCocktail = async () => {
    setLoading(true);

    if (!id) return navigate("/error");

    const response = await cocktailsService.getById(id);

    if (!response || typeof response === "string") return navigate("/error");

    setCocktail(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCocktail();
  }, []);

  if (loading)
    return (
      <main className="main_container">
        <Loading></Loading>;
      </main>
    );

  return (
    <main className="main-cocktail-detail-page">
      <section className="cocktail-detail">
        <img
          src={cocktail?.strDrinkThumb}
          alt={cocktail?.strDrink}
          className="cocktail-detail__img"
        ></img>

        <article className="cocktail-detail__information">
          <h2 className="cocktail-detail__name">
            <span className="cocktail-detail__label">Name:</span> {cocktail?.strDrink}
          </h2>
          <p className="cocktail-detail__glass-name">
            <span className="cocktail-detail__label">Glass:</span> {cocktail?.strGlass}
          </p>
          <p className="cocktail-detail__alcoholic">
            <span className="cocktail-detail__label">Information:</span> {cocktail?.strAlcoholic}
          </p>
          <ul className="cocktail-detail__list-ingredients" aria-label="Ingredients">
            <p className="cocktail-detail__ingredients">
              <span className="cocktail-detail__label">Ingredients:</span>{" "}
            </p>
            {ingredients.map((ingredient, index) => (
              <IngredientItem key={`ingredient-${index}`} ingredient={ingredient!}></IngredientItem>
            ))}
          </ul>
        </article>

        <Link className="cocktail-detail__link-go-home" to="/" aria-label="Go back to home page">
          Go Home
        </Link>
      </section>
    </main>
  );
};

export default CocktailDetailPage;
