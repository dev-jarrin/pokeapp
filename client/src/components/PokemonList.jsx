import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";
import { capitalizeFirstWord } from "../utils/helper";
import {
  error,
  extraInfo,
  extraInfoActive,
  GridStyle,
  NameStyle,
  PokeImageStyle,
} from "../styles/styles";
import { fetchPokemonData } from "../utils/api";
import { toast } from "react-toastify";
import PokemonImage from "./PokemonImage";

const PokemonList = ({ pokemonElementRef }) => {
  const topRef = useRef(null);
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isHovered, setHoveredCardId] = useState(0);

  useEffect(() => {
    fetchData();
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", handlePageChange);
    return () => {
      window.removeEventListener("scroll", handlePageChange);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      const toastId = toast.error("Failed to load data please reload the app", {
        toastId: "unique-toast-id",
      });

      return () => toast.dismiss(toastId);
    }
  }, [isError]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const results = await fetchPokemonData(offset);
      setCards((prev) => [...prev, ...results]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
    ) {
      setOffset((prev) => prev + 20);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredCardId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  return (
    <div
      ref={pokemonElementRef}
      className="flex flex-col justify-center items-center mt-20 w-full"
    >
      <div ref={topRef}></div>
      <h1 style={{ fontWeight: "bold", fontSize: 50 }}>Pokemons List</h1>
      <Box sx={{ flexGrow: 1, margin: 10, width: "90%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2, lg: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {cards.map((card) => (
            <Grid
              item
              xs={1}
              sm={3}
              md={3}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="pokemon-card"
            >
              <div
                key={card.id}
                style={GridStyle}
                className="pokemon-card-inner"
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={handleMouseLeave}
              >
                <PokemonImage src={card.imageUrl} alt={card.name} />
                {/* <img
                  src={card.imageUrl}
                  alt={card.name}
                  style={PokeImageStyle}
                /> */}
                <h1 style={NameStyle}>{capitalizeFirstWord(card.name)}</h1>
                <div
                  className="extra-info"
                  style={
                    isHovered === card.id
                      ? { ...extraInfo, ...extraInfoActive }
                      : extraInfo
                  }
                >
                  <p className="p">Height : {card.height}</p>
                  <p className="p">Weight : {card.weight}</p>
                </div>
              </div>
            </Grid>
          ))}
          {loading && (
            <div className="flex justify-center items-center fixed inset-0 bg-opacity-80 z-100">
              <Loader />
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default PokemonList;
