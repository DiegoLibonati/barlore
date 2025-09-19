import { useParams, Link } from "react-router-dom";

import { CockTail } from "@src/entities/entities";

import { Loading } from "@src/components/Loading";
import { IngredientItem } from "@src/components/IngredientItem";

import { ErrorPage } from "@src/pages/ErrorPage";

import { useFetch } from "@src/hooks/useFetch";

import "@src/pages/CocktailDetailPage.css";

export const CocktailDetailPage = (): JSX.Element => {
  const { id } = useParams();

  const { loading, items } = useFetch<CockTail>(
    `/api/json/v1/1/lookup.php?i=${id}`,
    "drinks"
  );

  const cocktail = items[0];
  const ingredients = [
    cocktail?.strIngredient1,
    cocktail?.strIngredient2,
    cocktail?.strIngredient3,
    cocktail?.strIngredient4,
    cocktail?.strIngredient5,
  ];

  if (loading)
    return (
      <main className="main_container">
        <Loading></Loading>;
      </main>
    );

  if (!loading && items?.length === 0) return <ErrorPage></ErrorPage>;

  return (
    <main className="main-cocktail-detail-page">
      <section className="cocktail-detail">
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="cocktail-detail__img"
        ></img>

        <article className="cocktail-detail__information">
          <h2 className="cocktail-detail__name">
            <span className="cocktail-detail__label">Name:</span>{" "}
            {cocktail.strDrink}
          </h2>
          <p className="cocktail-detail__glass-name">
            <span className="cocktail-detail__label">Glass:</span>{" "}
            {cocktail.strGlass}
          </p>
          <p className="cocktail-detail__alcoholic">
            <span className="cocktail-detail__label">Information:</span>{" "}
            {cocktail.strAlcoholic}
          </p>
          <ul className="cocktail-detail__list-ingredients">
            <p className="cocktail-detail__ingredients">
              <span className="cocktail-detail__label">Ingredients:</span>{" "}
            </p>
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={`ingredient-${index}`}
                ingredient={ingredient!}
              ></IngredientItem>
            ))}
          </ul>
        </article>

        <Link
          className="cocktail-detail__link-go-home"
          to="/"
          aria-label="go to home"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
};
