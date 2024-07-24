"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiConfig_1 = __importDefault(require("../config/apiConfig"));
const helper_1 = require("../utils/helper");
const axios_1 = __importDefault(require("axios"));
const getPokemon = async (req, res, next) => {
    try {
        let responseData = {
            error: false,
            message: "Data not found",
            data: null,
        };
        // Construct endpoint based on query parameters
        let pokemonEndpoint = apiConfig_1.default.pokemon.baseURL;
        if (req.query.id) {
            pokemonEndpoint += apiConfig_1.default.pokemon.endpoints.getById(req.query.id.toString());
        }
        else if (req.query.limit && req.query.offset) {
            const limit = parseInt(req.query.limit);
            const offset = parseInt(req.query.offset);
            pokemonEndpoint += apiConfig_1.default.pokemon.endpoints.getWithPagination(limit, offset);
        }
        // Fetch data from API
        const response = await axios_1.default.get("https://pokeapi.co/api/v2/pokemon" + pokemonEndpoint);
        console.log("response", response.status);
        // Process response data
        if (response.data.results) {
            response.data.results = await Promise.all(response.data.results.map(async (pokemon) => {
                const pokemonData = await axios_1.default.get(pokemon.url);
                return {
                    ...pokemonData.data,
                    imageUrl: pokemonData.data.sprites.front_default,
                    url: `${process.env.BASE_URL}/get-pokemon?id=${pokemonData.data.id}`,
                };
            }));
        }
        // Handle pagination if provided
        if (req.query.limit && req.query.offset) {
            const limit = parseInt(req.query.limit);
            const offset = parseInt(req.query.offset);
            const pagination = (0, helper_1.preparePagination)(limit, offset);
            responseData = {
                error: false,
                message: "Data retrieved successfully",
                data: {
                    results: response.data.results,
                    pagination,
                },
            };
        }
        else {
            responseData = {
                error: false,
                message: "Data retrieved successfully",
                data: Array.isArray(response.data) ? response.data : [response.data],
            };
        }
        // Send response
        res.status(200).json(responseData);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.default = getPokemon;
