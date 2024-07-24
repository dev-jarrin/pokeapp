import { useState } from "react";
import { PokeImageStyle } from "../styles/styles";

const PokemonImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const PlaceholderStyle = {
    ...PokeImageStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <>
      {isLoading && (
        <div style={PlaceholderStyle}>
          <span>{alt}</span>
        </div>
      )}
      <img
        src={src}
        style={PokeImageStyle}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
    </>
  );
};

export default PokemonImage;
