import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.service";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully created a user",
    data: result,
  });
});

export const userControllers = {
  insertIntoDb,
};
