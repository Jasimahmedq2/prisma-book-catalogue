import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/ValidationRequest";
import { userValidationSchema } from "./user.validation";
const router = express.Router();

router.get("/", userControllers.getUsersFromDb);
router.get("/:id", userControllers.getSingleUserFromDb);
router.patch(
  "/:id",
  validateRequest(userValidationSchema.updateUser),
  userControllers.updateUser
);
router.delete(
  "/:id",
  userControllers.deleteUser
);

export const userRoutes = router;
