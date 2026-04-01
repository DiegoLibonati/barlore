import "@/components/Loading/Loading.css";

const Loading = () => {
  return (
    <section className="cocktail-loader" role="status" aria-label="Loading content">
      <div className="cocktail-loader__root" aria-hidden="true">
        <div className="cocktail-loader__bar"></div>
        <div className="cocktail-loader__bar"></div>
        <div className="cocktail-loader__bar"></div>
      </div>
    </section>
  );
};

export default Loading;
