import { Order, PrismaClient } from "@prisma/client";
import { IOrder, OrderedBook } from "./order.interface";

const prisma = new PrismaClient();

const createOrder = async (
  userId: string,
  payload: any
): Promise<Order | null> => {
  console.log({ service: payload.orderedBooks });

  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        createMany: {
          data: payload?.orderedBooks?.map((book: any) => ({
            bookId: book.bookId,
            quantity: book.quantity,
          })),
        },
      },
    },
  });
  return result;
};

const getFromDB = async (
  userId: string,
  role: string
): Promise<Order[] | null> => {
  let result = null;
  if (role === "CUSTOMER") {
    result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
  } else if (role === "ADMIN") {
    result = await prisma.order.findMany({});
  }
  return result;
};

const getSingleOrder = async (
  orderId: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  let result = null;

  const theOrder = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  console.log({ theOrder });

  if (role === "ADMIN") {
    result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  } else if (role === "CUSTOMER" && theOrder?.userId === userId) {
    result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }
  return result;
};

export const orderServices = {
  createOrder,
  getFromDB,
  getSingleOrder,
};
