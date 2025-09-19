import { useState } from "react";

import { CockTail } from "@src/entities/entities";

import { CocktailItem } from "@src/components/CocktailItem";
import { Loading } from "@src/components/Loading";

import { useFetch } from "@src/hooks/useFetch";
import { useAppContext } from "@src/context/AppContext";

import "@src/pages/HomePage.css";

export const HomePage = (): JSX.Element => {
  const [url, setUrl] = useState<string>("/api/json/v1/1/search.php?f=a");

  const { inputSearch, setInputSearch } = useAppContext();

  const { loading, items } = useFetch<CockTail>(url, "drinks");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const value = inputSearch.trim();

    if (!value) return setUrl(`/api/json/v1/1/search.php?f=a`);

    setUrl(`/api/json/v1/1/search.php?s=${value}`);
  };

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);
  };

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
            value={inputSearch}
            onChange={handleChangeInputSearch}
          ></input>
        </form>
      </section>

      {loading ? (
        <Loading></Loading>
      ) : items?.length === 0 ? (
        <h2 className="cocktails-not-found">
          There is not exists a cocktail with the name of {inputSearch}
        </h2>
      ) : (
        <section className="cocktails">
          {items?.map((item) => {
            return (
              <CocktailItem key={item.idDrink} cocktail={item}></CocktailItem>
            );
          })}
        </section>
      )}
    </main>
  );
};
