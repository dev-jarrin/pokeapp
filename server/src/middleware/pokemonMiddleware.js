"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PokeApiMiddleware = async (req, res, next) => {
    // Validate query parameters
    if (!req.query.id && !(req.query.limit && req.query.offset)) {
        return res.status(400).json({
            error: true,
            message: "Please provide either an ID or limit and offset",
            data: null,
        });
    }
    next();
};
exports.default = PokeApiMiddleware;
