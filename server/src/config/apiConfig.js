"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiConfig = {
    pokemon: {
        baseURL: "/",
        endpoints: {
            getById: (id) => `${id}`,
            getWithPagination: (limit, offset) => `?limit=${limit}&offset=${offset}`,
        },
    },
};
exports.default = apiConfig;
