import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";
import httpStatus from "http-status";

const getUsersFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getUsersFromDb();

  sendResponse<User[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve users",
    data: result,
  });
});

const getSingleUserFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getSingleUserFromDb(req.params.id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve a user",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { ...updatedData } = req.body;
  const { id } = req.params;
  const result = await userServices.updateUser(id, updatedData);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully updated a user",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.deleteUser(id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully deleted a user",
    data: result,
  });
});

export const userControllers = {
  getUsersFromDb,
  getSingleUserFromDb,
  updateUser,
  deleteUser,
};
