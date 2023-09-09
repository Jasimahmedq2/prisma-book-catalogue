"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const user_validation_1 = require("./user.validation");
const enums_1 = require("../../../shared/enums");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(enums_1.userRole.ADMIN), user_controller_1.userControllers.getUsersFromDb);
router.get("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), user_controller_1.userControllers.getSingleUserFromDb);
router.patch("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), (0, ValidationRequest_1.default)(user_validation_1.userValidationSchema.updateUser), user_controller_1.userControllers.updateUser);
router.delete("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
