"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const enums_1 = require("../../../shared/enums");
const router = express_1.default.Router();
router.post("/create-category", (0, auth_1.default)(enums_1.userRole.ADMIN), (0, ValidationRequest_1.default)(category_validation_1.categoryValidationSchema.createCategory), category_controller_1.categoryControllers.insertIntoDb);
router.get("/", category_controller_1.categoryControllers.getCategories);
router.get("/:id", category_controller_1.categoryControllers.getSingleCategory);
router.patch("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), (0, ValidationRequest_1.default)(category_validation_1.categoryValidationSchema.createCategory), category_controller_1.categoryControllers.updateCategory);
router.delete("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), category_controller_1.categoryControllers.deleteCategory);
exports.categoryRoutes = router;
