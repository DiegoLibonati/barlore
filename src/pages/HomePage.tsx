import { useState } from "react";

import { CockTail } from "../entities/entities";

import { CocktailItem } from "../components/CocktailItem";
import { Loading } from "../components/Loading";

import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../context/AppContext";

import "../styles/Search.css";
import "../styles/CocktailList.css";

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
    <main className="main_container">
      <section className="search__wrapper">
        <form
          className="search__form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="input-search">Search your favorite cocktail: </label>
          <input
            id="input-search"
            type="text"
            placeholder="Cocktail name"
            value={inputSearch}
            onChange={handleChangeInputSearch}
          ></input>
        </form>
      </section>

      {loading ? (
        <Loading></Loading>
      ) : items.length === 0 ? (
        <h2 className="cocktails__not-found">
          There is not exists a cocktail with the name of {inputSearch}
        </h2>
      ) : (
        <section className="cocktails">
          {items.map((item) => {
            return (
              <CocktailItem key={item.idDrink} cocktail={item}></CocktailItem>
            );
          })}
        </section>
      )}
    </main>
  );
};
