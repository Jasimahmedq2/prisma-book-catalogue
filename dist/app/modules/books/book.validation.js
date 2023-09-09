"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationSchema = void 0;
const zod_1 = require("zod");
const createBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "tile is required",
        }),
        author: zod_1.z.string({
            required_error: "author is required",
        }),
        genre: zod_1.z.string({
            required_error: "genre is required",
        }),
        price: zod_1.z.number({
            required_error: "book price is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "publicationDate is required",
        }),
        categoryId: zod_1.z.string({
            required_error: "categoryId is required",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        author: zod_1.z.string().optional(),
    }),
});
exports.bookValidationSchema = {
    createBook,
    update,
};
