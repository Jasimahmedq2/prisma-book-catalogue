"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationSchema = void 0;
const zod_1 = require("zod");
const crateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "the name is required",
        }),
        email: zod_1.z.string({
            required_error: "the email is required",
        }),
        password: zod_1.z.string({
            required_error: "the password is required",
        }),
        role: zod_1.z.string({
            required_error: "role is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "number is required",
        }),
        address: zod_1.z.string({
            required_error: "you have to add your address",
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
const signInUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required" }).email(),
        password: zod_1.z.string({ required_error: "password is required" }),
    }),
});
exports.authValidationSchema = {
    crateUser,
    signInUser,
};
