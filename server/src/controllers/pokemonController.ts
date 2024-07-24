import apiConfig from "../config/apiConfig";
import { Request, Response, NextFunction } from "express";
import axiosInstance from "../config/axiosInstance";
import { preparePagination } from "../utils/helper";
import axios from "axios";

const getPokemon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let responseData = {
      error: false,
      message: "Data not found",
      data: null,
    };

    // Construct endpoint based on query parameters
    let pokemonEndpoint = apiConfig.pokemon.baseURL;
    if (req.query.id) {
      pokemonEndpoint += apiConfig.pokemon.endpoints.getById(
        req.query.id.toString()
      );
    } else if (req.query.limit && req.query.offset) {
      const limit = parseInt(req.query.limit as string);
      const offset = parseInt(req.query.offset as string);
      pokemonEndpoint += apiConfig.pokemon.endpoints.getWithPagination(
        limit,
        offset
      );
    }

    // Fetch data from API
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon" + pokemonEndpoint
    );
    console.log("response", response.status);
    // Process response data
    if (response.data.results) {
      response.data.results = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const pokemonData = await axios.get(pokemon.url);

          return {
            ...pokemonData.data,
            imageUrl: pokemonData.data.sprites.front_default,
            url: `${process.env.BASE_URL}/get-pokemon?id=${pokemonData.data.id}`,
          };
        })
      );
    }

    // Handle pagination if provided
    if (req.query.limit && req.query.offset) {
      const limit = parseInt(req.query.limit as string);
      const offset = parseInt(req.query.offset as string);

      const pagination = preparePagination(limit, offset);

      responseData = {
        error: false,
        message: "Data retrieved successfully",
        data: {
          results: response.data.results,
          pagination,
        },
      };
    } else {
      responseData = {
        error: false,
        message: "Data retrieved successfully",
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    }

    // Send response
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getPokemon;
