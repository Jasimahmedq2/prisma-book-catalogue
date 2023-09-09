"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const enums_1 = require("../../../shared/enums");
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.default)(enums_1.userRole.ADMIN), (0, ValidationRequest_1.default)(book_validation_1.bookValidationSchema.createBook), book_controller_1.bookControllers.insertIntoDb);
router.get("/", book_controller_1.bookControllers.getBooksFromDb);
router.get("/:id", book_controller_1.bookControllers.getSingleBook);
router.patch("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), (0, ValidationRequest_1.default)(book_validation_1.bookValidationSchema.update), book_controller_1.bookControllers.updateBook);
router.delete("/:id", (0, auth_1.default)(enums_1.userRole.ADMIN), book_controller_1.bookControllers.deleteBook);
exports.bookRoutes = router;
