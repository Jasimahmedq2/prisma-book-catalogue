import express from "express";
import validateRequest from "../../middleware/ValidationRequest";
import { bookValidationSchema } from "./book.validation";
import { bookControllers } from "./book.controller";
import auth from "../../middleware/auth";
import { userRole } from "../../../shared/enums";
const router = express.Router();

router.post(
  "/create-book",
  auth(userRole.ADMIN),
  validateRequest(bookValidationSchema.createBook),
  bookControllers.insertIntoDb
);
router.get("/", bookControllers.getBooksFromDb);
router.get("/:id", bookControllers.getSingleBook);
router.patch(
  "/:id",
  auth(userRole.ADMIN),
  validateRequest(bookValidationSchema.update),
  bookControllers.updateBook
);
router.delete("/:id", auth(userRole.ADMIN), bookControllers.deleteBook);

export const bookRoutes = router;
