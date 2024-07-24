"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePagination = void 0;
const preparePagination = (limit, offset) => {
    const nextOffset = offset + limit;
    const pagination = {
        next: `${process.env.BASE_URL}/get-pokemon?limit=${limit}&offset=${nextOffset}`,
        previous: offset > 0
            ? `${process.env.BASE_URL}/get-pokemon?limit=${limit}&offset=${offset - limit}`
            : null,
    };
    return pagination;
};
exports.preparePagination = preparePagination;
