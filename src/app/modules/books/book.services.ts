import { Book, Prisma, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDb = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getBooksFromDb = async (
  payload: any
): Promise<IGenericResponse<Book[] | null>> => {
  const skip = (parseInt(payload.page as string) - 1) * payload.size || 1;
  const limit = parseInt(payload.size) || 10;
  console.log({ skip, limit, payload });
  const { searchTerm, sortBy, sortOrder, category, minPrice, maxPrice } =
    payload;

  const andConditions: Array<Prisma.BookWhereInput> = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          genre: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (Number(minPrice)) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice),
      },
    });
  }

  if (Number(maxPrice)) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.book.count();

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            title: "desc",
          },
  });
  return {
    meta: {
      page: skip,
      limit,
      total,
    },
    data: result, 
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};
const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

export const bookServices = {
  insertIntoDb,
  getBooksFromDb,
  getSingleBook,
  updateBook,
  deleteBook,
};
