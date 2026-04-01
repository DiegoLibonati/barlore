import "@/components/Loading/Loading.css";

const Loading = () => {
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

export default Loading;
