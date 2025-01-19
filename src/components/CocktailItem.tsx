import { Link } from "react-router-dom";

import { CockTail } from "../entities/entities";

import "../styles/CocktailItem.css";

interface CockTailItemProps {
  cocktail: CockTail;
}

export const CocktailItem = ({ cocktail }: CockTailItemProps): JSX.Element => {
  return (
    <article className="cocktail">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}></img>
      <div className="cocktail__information">
        <h2>{cocktail.strDrink}</h2>
        <p>{cocktail.strGlass}</p>
        <p>{cocktail.strAlcoholic}</p>
        <Link
          to={`/cocktail/${cocktail.idDrink}`}
          aria-label="details cocktail"
        >
          Details
        </Link>
      </div>
    </article>
  );
};
