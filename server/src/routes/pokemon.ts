import { Router } from "express";
import getPokemon from "../controllers/pokemonController";
import PokeApiMiddleware from "../middleware/pokemonMiddleware";
const pokemonRouter = Router();

pokemonRouter.get("/get-pokemon", PokeApiMiddleware, getPokemon);

export default pokemonRouter;
