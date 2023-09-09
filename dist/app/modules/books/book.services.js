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
exports.bookServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const getBooksFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (parseInt(payload.page) - 1) * payload.size || 1;
    const limit = parseInt(payload.size) || 10;
    console.log({ skip, limit, payload });
    const { searchTerm, sortBy, sortOrder, category, minPrice, maxPrice } = payload;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    author: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    genre: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    if (Number(minPrice)) {
        andConditions.push({
            price: {
                gte: parseFloat(minPrice),
            },
        });
    }
    if (Number(maxPrice)) {
        andConditions.push({
            price: {
                lte: parseFloat(maxPrice),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const total = yield prisma.book.count();
    const result = yield prisma.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                title: "desc",
            },
    });
    return {
        meta: {
            page: skip,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    return result;
});
exports.bookServices = {
    insertIntoDb,
    getBooksFromDb,
    getSingleBook,
    updateBook,
    deleteBook,
};
