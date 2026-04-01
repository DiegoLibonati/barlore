import { useEffect, useState } from "react";

import { Cocktail } from "@/types/app";

import CocktailItem from "@/components/CocktailItem/CocktailItem";
import Loading from "@/components/Loading/Loading";

import { cocktailsService } from "@/services/cocktailsService";

import "@/pages/HomePage/HomePage.css";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const value = searchInputValue.trim() ?? "a";

    handleGetCocktails(value);
  };

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
  };

  const handleGetCocktails = async (search: string) => {
    setLoading(true);
    const response = await cocktailsService.getAll(search);

    setCocktails(typeof response === "string" ? [] : response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCocktails("a");
  }, []);

  return (
    <main className="main-home-page">
      <section className="search" aria-label="Cocktail search">
        <form className="search__form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="input-search" className="search__form-label">
            Search your favorite cocktail:{" "}
          </label>
          <input
            id="input-search"
            type="text"
            placeholder="Cocktail name"
            className="search__form-input"
            value={searchInputValue}
            onChange={handleChangeInputSearch}
          ></input>
        </form>
      </section>

      {loading ? (
        <Loading></Loading>
      ) : cocktails?.length === 0 ? (
        <h2 className="cocktails-not-found">
          There is not exists a cocktail with the name of {searchInputValue}
        </h2>
      ) : (
        <section className="cocktails" aria-label="Cocktail results">
          {cocktails?.map((item) => {
            return (
              <CocktailItem
                key={item.idDrink}
                idDrink={item.idDrink}
                strAlcoholic={item.strAlcoholic}
                strDrink={item.strDrink}
                strDrinkThumb={item.strDrinkThumb}
                strGlass={item.strGlass}
              ></CocktailItem>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default HomePage;
