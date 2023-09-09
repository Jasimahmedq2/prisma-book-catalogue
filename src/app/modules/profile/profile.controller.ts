import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { profileServices } from "./profile.services";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";
import httpStatus from "http-status";

const retrieveProfileData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const result = await profileServices.retrieveProfileData(userId);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved profile data",
    data: result,
  });
});

export const profileControllers = {
  retrieveProfileData,
};
