"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const category_routes_1 = require("../modules/category/category.routes");
const book_routes_1 = require("../modules/books/book.routes");
const order_route_1 = require("../modules/order/order.route");
const profile_routes_1 = require("../modules/profile/profile.routes");
const router = express_1.default.Router();
const rootRoutes = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/categories",
        element: category_routes_1.categoryRoutes,
    },
    {
        path: "/books",
        element: book_routes_1.bookRoutes,
    },
    {
        path: "/orders",
        element: order_route_1.orderRoutes,
    },
    {
        path: "/profile",
        element: profile_routes_1.profileRoutes,
    },
];
rootRoutes.forEach((route) => router.use(route.path, route.element));
exports.default = router;
