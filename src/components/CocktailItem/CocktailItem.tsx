import { Link } from "react-router-dom";

import { CockTailItemProps } from "@/types/props";

import "@/components/CocktailItem/CocktailItem.css";

const CocktailItem = ({
  idDrink,
  strAlcoholic,
  strDrink,
  strDrinkThumb,
  strGlass,
}: CockTailItemProps) => {
  return (
    <article className="cocktail">
      <img src={strDrinkThumb} alt={strDrink} className="cocktail__img"></img>
      <div className="cocktail__information">
        <h2 className="cocktail__name">{strDrink}</h2>
        <p className="cocktail__glass-name">{strGlass}</p>
        <p className="cocktail__alcoholic">{strAlcoholic}</p>
        <Link
          to={`/cocktail/${idDrink}`}
          aria-label={`View details for ${strDrink}`}
          className="cocktail__details"
        >
          Details
        </Link>
      </div>
    </article>
  );
};

export default CocktailItem;
