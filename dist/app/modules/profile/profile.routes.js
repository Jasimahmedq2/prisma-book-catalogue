"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const enums_1 = require("../../../shared/enums");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(enums_1.userRole.ADMIN, enums_1.userRole.CUSTOMER), profile_controller_1.profileControllers.retrieveProfileData);
exports.profileRoutes = router;
