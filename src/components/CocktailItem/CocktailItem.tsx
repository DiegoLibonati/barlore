import { Link } from "react-router-dom";

import { CockTailItemProps } from "@src/entities/props";

import "@src/components/CocktailItem/CocktailItem.css";

export const CocktailItem = ({ cocktail }: CockTailItemProps): JSX.Element => {
  return (
    <article className="cocktail">
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className="cocktail__img"
      ></img>
      <div className="cocktail__information">
        <h2 className="cocktail__name">{cocktail.strDrink}</h2>
        <p className="cocktail__glass-name">{cocktail.strGlass}</p>
        <p className="cocktail__alcoholic">{cocktail.strAlcoholic}</p>
        <Link
          to={`/cocktail/${cocktail.idDrink}`}
          aria-label="details cocktail"
          className="cocktail__details"
        >
          Details
        </Link>
      </div>
    </article>
  );
};
