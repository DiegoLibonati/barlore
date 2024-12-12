import { useParams, Link } from "react-router-dom";

import { CockTail } from "../entities/entities";

import { Loading } from "../components/Loading";
import { IngredientItem } from "../components/IngredientItem";

import { ErrorPage } from "../pages/ErrorPage";

import { useFetch } from "../hooks/useFetch";

import "../styles/CocktailDetail.css";

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

  if (!loading && items.length === 0) return <ErrorPage></ErrorPage>;

  return (
    <main className="main_container">
      <section className="cocktail_detail_container">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}></img>

        <article className="cocktail_detail_container_information">
          <h2>
            <span>Name:</span> {cocktail.strDrink}
          </h2>
          <p>
            <span>Glass:</span> {cocktail.strGlass}
          </p>
          <p>
            <span>Information:</span> {cocktail.strAlcoholic}
          </p>
          <ul className="cocktail_detail_container_information_list">
            <p>
              <span>Ingredients:</span>{" "}
            </p>
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={`ingredient-${index}`}
                ingredient={ingredient!}
              ></IngredientItem>
            ))}
          </ul>
        </article>

        <Link className="GoHome" to="/" aria-label="go to home">
          Go Home
        </Link>
      </section>
    </main>
  );
};
