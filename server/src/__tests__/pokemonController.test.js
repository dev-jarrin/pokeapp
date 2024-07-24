"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const pokemon_1 = __importDefault(require("../routes/pokemon"));
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", pokemon_1.default);
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
        axios_1.default.get
            .mockResolvedValueOnce({ data: mockedPokemonList })
            .mockResolvedValueOnce(mockedPokemonDetails1)
            .mockResolvedValueOnce(mockedPokemonDetails2);
        const limit = 1;
        const offset = 0;
        const response = await (0, supertest_1.default)(app)
            .get("/get-pokemon")
            .set("Accept", "application/json")
            .query({ limit, offset });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe("Data retrieved successfully");
    });
    it("should return an error if neither id nor pagination parameters are provided", async () => {
        const response = await (0, supertest_1.default)(app)
            .get("/get-pokemon")
            .set("Accept", "application/json");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe("Please provide either an ID or limit and offset");
    });
    it("should return data against given id", async () => {
        const mockedPokemonDetails1 = {
            data: {
                id: 1,
                name: "bulbasaur",
                sprites: { front_default: "image_url_1" },
            },
        };
        axios_1.default.get.mockResolvedValueOnce(mockedPokemonDetails1);
        const id = 1;
        const response = await (0, supertest_1.default)(app)
            .get("/get-pokemon")
            .set("Accept", "application/json")
            .query({ id });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe("Data retrieved successfully");
    });
});
