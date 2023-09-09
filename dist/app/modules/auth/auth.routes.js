"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, ValidationRequest_1.default)(auth_validation_1.authValidationSchema.crateUser), auth_controller_1.authControllers.insertIntoDb);
router.post("/signin", (0, ValidationRequest_1.default)(auth_validation_1.authValidationSchema.signInUser), auth_controller_1.authControllers.signInUser);
exports.authRoutes = router;
