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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log({ service: payload.orderedBooks });
    const result = yield prisma.order.create({
        data: {
            userId,
            orderedBooks: {
                createMany: {
                    data: (_a = payload === null || payload === void 0 ? void 0 : payload.orderedBooks) === null || _a === void 0 ? void 0 : _a.map((book) => ({
                        bookId: book.bookId,
                        quantity: book.quantity,
                    })),
                },
            },
        },
    });
    return result;
});
const getFromDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === "CUSTOMER") {
        result = yield prisma.order.findMany({
            where: {
                userId,
            },
        });
    }
    else if (role === "ADMIN") {
        result = yield prisma.order.findMany({});
    }
    return result;
});
const getSingleOrder = (orderId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const theOrder = yield prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });
    console.log({ theOrder });
    if (role === "ADMIN") {
        result = yield prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
    }
    else if (role === "CUSTOMER" && (theOrder === null || theOrder === void 0 ? void 0 : theOrder.userId) === userId) {
        result = yield prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
    }
    return result;
});
exports.orderServices = {
    createOrder,
    getFromDB,
    getSingleOrder,
};
