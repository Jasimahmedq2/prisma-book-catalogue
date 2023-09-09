import express from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middleware/ValidationRequest";
import { categoryValidationSchema } from "./category.validation";
const router = express.Router();

router.post(
  "/create-category",
  validateRequest(categoryValidationSchema.createCategory),
  categoryControllers.insertIntoDb
);
router.get("/", categoryControllers.getCategories);
router.get("/:id", categoryControllers.getSingleCategory);
router.patch(
  "/:id",
  validateRequest(categoryValidationSchema.createCategory),
  categoryControllers.updateCategory
);
router.delete("/:id", categoryControllers.deleteCategory);

export const categoryRoutes = router;
