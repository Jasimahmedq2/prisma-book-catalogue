import express from "express";
import validateRequest from "../../middleware/ValidationRequest";
import { bookValidationSchema } from "./book.validation";
import { bookControllers } from "./book.controller";
const router = express.Router();

router.post(
  "/create-book",
  validateRequest(bookValidationSchema.createBook),
  bookControllers.insertIntoDb
);
router.get("/", bookControllers.getBooksFromDb);
router.get("/:id", bookControllers.getSingleBook);
router.patch(
  "/:id",
  validateRequest(bookValidationSchema.update),
  bookControllers.updateBook
);
router.delete("/:id", bookControllers.deleteBook);

export const bookRoutes = router;
