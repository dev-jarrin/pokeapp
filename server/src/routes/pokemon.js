"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemonController_1 = __importDefault(require("../controllers/pokemonController"));
const pokemonMiddleware_1 = __importDefault(require("../middleware/pokemonMiddleware"));
const pokemonRouter = (0, express_1.Router)();
pokemonRouter.get("/get-pokemon", pokemonMiddleware_1.default, pokemonController_1.default);
exports.default = pokemonRouter;
