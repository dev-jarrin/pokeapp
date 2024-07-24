import React, { Suspense, useEffect, useRef } from "react";
import HomeContent from "../components/HomeContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { getCsrfToken } from "../utils/api";
const PokemonList = React.lazy(() => import("../components/PokemonList"));

const Home = () => {
  const pokemonElementRef = useRef(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      await getCsrfToken();
    };

    fetchCsrfToken();
  }, []);

  return (
    <main role="main">
      <header
        role="banner"
        className="bg-cover"
        style={{ backgroundImage: `url('assets/images/pokemon.jpg')` }}
      >
        <div role="main content" className="bg-transparent text-white">
          <HomeContent pokemonElementRef={pokemonElementRef} />
        </div>
      </header>
      <section
        role="pokemon list"
        className="flex flex-col justify-center items-center"
      >
        <Suspense
          fallback={
            <div
              role="Loader"
              className="flex justify-center items-center fixed inset-0 bg-opacity-80 z-100"
            >
              <Loader />
            </div>
          }
        >
          <PokemonList pokemonElementRef={pokemonElementRef} />
        </Suspense>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Home;
