import express from "express";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const rootRoutes = [
  {
    path: "/auth",
    element: userRoutes,
  },
];

rootRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
