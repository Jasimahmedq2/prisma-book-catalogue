import express from "express";
import { userControllers } from "../user/user.controller";
import { profileControllers } from "./profile.controller";
import auth from "../../middleware/auth";
import { userRole } from "../../../shared/enums";
const router = express.Router();

router.get(
  "/",
  auth(userRole.ADMIN, userRole.CUSTOMER),
  profileControllers.retrieveProfileData
);

export const profileRoutes = router;
