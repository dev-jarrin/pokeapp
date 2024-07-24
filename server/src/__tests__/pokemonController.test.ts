import request from "supertest";
import express from "express";
import pokemonRouter from "../routes/pokemon";
import apiConfig from "../config/apiConfig";
import axios from "axios";

jest.mock("axios");

const app = express();
app.use(express.json());
app.use("/", pokemonRouter);

describe("GET /get-pokemon", () => {
  it("should return a list of Pokemon with pagination", async () => {
    const mockedPokemonList = {
      error: false,
      message: "Data retrieved successfully",
      data: {
        results: [{ name: "bulbasaur" }, { name: "ivysaur" }],
        pagination: { limit: 20, offset: 0 },
      },
    };

    const mockedPokemonDetails1 = {
      data: {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "image_url_1" },
      },
    };

    const mockedPokemonDetails2 = {
      data: {
        id: 2,
        name: "ivysaur",
        sprites: { front_default: "image_url_2" },
      },
    };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockedPokemonList })
      .mockResolvedValueOnce(mockedPokemonDetails1)
      .mockResolvedValueOnce(mockedPokemonDetails2);

    const limit = 1;
    const offset = 0;

    const response = await request(app)
      .get("/get-pokemon")
      .set("Accept", "application/json")
      .query({ limit, offset });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Data retrieved successfully");
  });

  it("should return an error if neither id nor pagination parameters are provided", async () => {
    const response = await request(app)
      .get("/get-pokemon")
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "Please provide either an ID or limit and offset"
    );
  });

  it("should return data against given id", async () => {
    const mockedPokemonDetails1 = {
      data: {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "image_url_1" },
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockedPokemonDetails1);
    const id = 1;
    const response = await request(app)
      .get("/get-pokemon")
      .set("Accept", "application/json")
      .query({ id });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Data retrieved successfully");
  });
});
