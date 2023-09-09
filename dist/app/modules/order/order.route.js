"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const enums_1 = require("../../../shared/enums");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/create-order", (0, auth_1.default)(enums_1.userRole.CUSTOMER), order_controller_1.orderControllers.createOrder);
router.get("/", (0, auth_1.default)(enums_1.userRole.ADMIN, enums_1.userRole.CUSTOMER), order_controller_1.orderControllers.getFromDB);
router.get("/:orderId", (0, auth_1.default)(enums_1.userRole.ADMIN, enums_1.userRole.CUSTOMER), order_controller_1.orderControllers.getSingleOrder);
exports.orderRoutes = router;
