import { useEffect, useState } from "react";

import { Cocktail } from "@src/entities/app";

import { CocktailItem } from "@src/components/CocktailItem/CocktailItem";
import { Loading } from "@src/components/Loading/Loading";

import { getCocktails } from "@src/api/get/getCocktails";

import "@src/pages/HomePage/HomePage.css";

export const HomePage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
    const response = await getCocktails(search);
    const drinks = response["drinks"];

    setCocktails(typeof drinks === "string" ? [] : drinks);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCocktails("a");
  }, []);

  return (
    <main className="main-home-page">
      <section className="search">
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
        <section className="cocktails">
          {cocktails?.map((item) => {
            return (
              <CocktailItem key={item.idDrink} cocktail={item}></CocktailItem>
            );
          })}
        </section>
      )}
    </main>
  );
};
