import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { orderServices } from "./order.services";
import sendResponse from "../../../shared/sendResponse";
import { Order } from "@prisma/client";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const payload = req.body;
  console.log({ payload });

  const result = await orderServices.createOrder(userId, payload);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully created an order",
    data: result,
  });
});

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const role = user?.role;
  console.log({ userId, role });
  const result = await orderServices.getFromDB(userId, role);
  sendResponse<Order[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve  orders",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { orderId } = req.params;
  const userId = user?.userId;
  const role = user?.role;
  const result = await orderServices.getSingleOrder(orderId, userId, role);
  sendResponse<Order | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully get an order",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  getFromDB,
  getSingleOrder,
};
