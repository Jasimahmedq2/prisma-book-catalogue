import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";
import { authServices } from "./auth.service";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.insertIntoDb(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully created a user",
    data: result,
  });
});
const signInUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;
  const result = await authServices.signInUser(userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signin successfully!",
    data: result,
  });
});

export const authControllers = {
  insertIntoDb,
  signInUser,
};
