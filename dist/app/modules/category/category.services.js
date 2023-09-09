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
exports.categoryServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.create({
        data: payload,
    });
    return result;
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findMany({
        include: {
            books: true,
        },
    });
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.categoryServices = {
    insertIntoDb,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
