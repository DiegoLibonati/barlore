import "../styles/Loading.css";

export const Loading = (): JSX.Element => {
  return (
    <section className="cocktail__loader">
      <div className="loader__root">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
