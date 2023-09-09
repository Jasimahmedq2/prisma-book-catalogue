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
exports.authServices = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const prisma = new client_1.PrismaClient();
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.create({
        data,
    });
    return result;
});
const signInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user doesn't exist");
    }
    const isPasswordMatched = isUserExist.password.toString() === payload.password.toString();
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "password doesn't matched");
    }
    const decodeInfo = {
        role: isUserExist.role,
        userId: isUserExist.id,
    };
    const createdToken = jwtHelpers_1.jwtHelpers.createToken(decodeInfo, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        token: createdToken,
    };
});
exports.authServices = {
    insertIntoDb,
    signInUser,
};
