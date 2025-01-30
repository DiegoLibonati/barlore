import "./Loading.css";

export const Loading = (): JSX.Element => {
  return (
    <section className="cocktail-loader">
      <div className="cocktail-loader__root">
        <div className="cocktail-loader__bar"></div>
        <div className="cocktail-loader__bar"></div>
        <div className="cocktail-loader__bar"></div>
      </div>
    </section>
  );
};
