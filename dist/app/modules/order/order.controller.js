"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_services_1 = require("./order.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const payload = req.body;
    console.log({ payload });
    const result = yield order_services_1.orderServices.createOrder(userId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully created an order",
        data: result,
    });
}));
const getFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const role = user === null || user === void 0 ? void 0 : user.role;
    console.log({ userId, role });
    const result = yield order_services_1.orderServices.getFromDB(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully retrieve  orders",
        data: result,
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { orderId } = req.params;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const role = user === null || user === void 0 ? void 0 : user.role;
    const result = yield order_services_1.orderServices.getSingleOrder(orderId, userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully get an order",
        data: result,
    });
}));
exports.orderControllers = {
    createOrder,
    getFromDB,
    getSingleOrder,
};
