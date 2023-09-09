import express from "express";
import auth from "../../middleware/auth";
import { userRole } from "../../../shared/enums";
import { orderControllers } from "./order.controller";
const router = express.Router();

router.post(
  "/create-order",
  auth(userRole.CUSTOMER),
  orderControllers.createOrder
);

router.get(
  "/",
  auth(userRole.ADMIN, userRole.CUSTOMER),
  orderControllers.getFromDB
);
router.get(
  "/:orderId",
  auth(userRole.ADMIN, userRole.CUSTOMER),
  orderControllers.getSingleOrder
);

export const orderRoutes = router;
