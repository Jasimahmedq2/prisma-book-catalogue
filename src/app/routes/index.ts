import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { bookRoutes } from "../modules/books/book.routes";
import { orderRoutes } from "../modules/order/order.route";
import { profileRoutes } from "../modules/profile/profile.routes";

const router = express.Router();

const rootRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/users",
    element: userRoutes,
  },
  {
    path: "/categories",
    element: categoryRoutes,
  },
  {
    path: "/books",
    element: bookRoutes,
  },
  {
    path: "/orders",
    element: orderRoutes,
  },
  {
    path: "/profile",
    element: profileRoutes,
  },
];

rootRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
