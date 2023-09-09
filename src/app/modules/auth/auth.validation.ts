import { z } from "zod";
const crateUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "the name is required",
    }),
    email: z.string({
      required_error: "the email is required",
    }),
    password: z.string({
      required_error: "the password is required",
    }),
    role: z.string({
      required_error: "role is required",
    }),
    contactNo: z.string({
      required_error: "number is required",
    }),
    address: z.string({
      required_error: "you have to add your address",
    }),
    profileImage: z.string().optional(),
  }),
});

const signInUser = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }),
  }),
});

export const authValidationSchema = {
  crateUser,
  signInUser,
};