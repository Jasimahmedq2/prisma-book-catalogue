import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/ValidationRequest";
import { userValidationSchema } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema.crateUser),
  userControllers.insertIntoDb
);

export const userRoutes = router;
