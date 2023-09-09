import express from "express";
import validateRequest from "../../middleware/ValidationRequest";
import { authValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(authValidationSchema.crateUser),
  authControllers.insertIntoDb
);
router.post(
  "/signin",
  validateRequest(authValidationSchema.signInUser),
  authControllers.signInUser
);

export const authRoutes = router;
