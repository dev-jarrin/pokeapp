import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { motion } from "framer-motion";

const HomeContent = ({ pokemonElementRef }) => {
  return (
    <div className="flex flex-col justify-end items-center h-screen  text-white p-10">
      <div className=" md:h-1/2 flex flex-col justify-end items-center text-white">
        <motion.button
          initial={{ y: 0 }}
          animate={{
            y: [-5, 5, -5],
            transition: { duration: 2, repeat: Infinity },
          }}
          onClick={() => {
            pokemonElementRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
          color="secondary"
          className=" flex flex-col justify-center items-center h-18 w-18 mt-6"
        >
          <ArrowCircleDownIcon
            sx={{
              color: "white",
              backgroundColor: "none",
              height: "6rem",
              width: "6rem",
            }}
          />
          less goo
        </motion.button>
      </div>
    </div>
  );
};

export default HomeContent;
