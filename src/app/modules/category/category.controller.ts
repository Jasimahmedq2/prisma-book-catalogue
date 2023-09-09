import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { categoryServices } from "./category.services";
import sendResponse from "../../../shared/sendResponse";
import { Category } from "@prisma/client";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.insertIntoDb(req.body);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully crated a category",
    data: result,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getCategories();

  sendResponse<Category[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve categories",
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getSingleCategory(req.params.id);

  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve a category",
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await categoryServices.updateCategory(id, updatedData);

  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully updated  category",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryServices.deleteCategory(id);

  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully updated  category",
    data: result,
  });
});

export const categoryControllers = {
  insertIntoDb,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
