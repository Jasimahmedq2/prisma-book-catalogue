import express from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middleware/ValidationRequest";
import { categoryValidationSchema } from "./category.validation";
import auth from "../../middleware/auth";
import { userRole } from "../../../shared/enums";
const router = express.Router();

router.post(
  "/create-category",
  auth(userRole.ADMIN),
  validateRequest(categoryValidationSchema.createCategory),
  categoryControllers.insertIntoDb
);
router.get("/", categoryControllers.getCategories);
router.get("/:id", categoryControllers.getSingleCategory);
router.patch(
  "/:id",
  auth(userRole.ADMIN),
  validateRequest(categoryValidationSchema.createCategory),
  categoryControllers.updateCategory
);
router.delete("/:id", auth(userRole.ADMIN), categoryControllers.deleteCategory);

export const categoryRoutes = router;
