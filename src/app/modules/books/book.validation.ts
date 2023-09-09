import { z } from "zod";

const createBook = z.object({
  body: z.object({
    title: z.string({
      required_error: "tile is required",
    }),
    author: z.string({
      required_error: "author is required",
    }),
    genre: z.string({
      required_error: "genre is required",
    }),
    price: z.number({
      required_error: "book price is required",
    }),
    publicationDate: z.string({
      required_error: "publicationDate is required",
    }),
    categoryId: z.string({
      required_error: "categoryId is required",
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    price: z.number().optional(),
    author: z.string().optional(),
  }),
});

export const bookValidationSchema = {
  createBook,
  update,
};
