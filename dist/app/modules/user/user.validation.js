"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.userValidationSchema = {
    updateUser,
};
