import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/ValidationRequest";
import { userValidationSchema } from "./user.validation";
import { userRole } from "../../../shared/enums";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/", auth(userRole.ADMIN), userControllers.getUsersFromDb);
router.get("/:id", auth(userRole.ADMIN), userControllers.getSingleUserFromDb);
router.patch(
  "/:id",
  auth(userRole.ADMIN),
  validateRequest(userValidationSchema.updateUser),
  userControllers.updateUser
);
router.delete("/:id", auth(userRole.ADMIN), userControllers.deleteUser);

export const userRoutes = router;
