import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookServices } from "./book.services";
import sendResponse from "../../../shared/sendResponse";
import { Book } from "@prisma/client";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.insertIntoDb(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully created a book",
    data: result,
  });
});
const getBooksFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getBooksFromDb(req.query);

  sendResponse<Book[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve  books",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getSingleBook(req.params.id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve  a book",
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedInfo } = req.body;
  const result = await bookServices.updateBook(id, updatedInfo);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully updated  a book",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookServices.deleteBook(id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully deleted a book",
    data: result,
  });
});

export const bookControllers = {
  insertIntoDb,
  getBooksFromDb,
  getSingleBook,
  updateBook,
  deleteBook,
};
