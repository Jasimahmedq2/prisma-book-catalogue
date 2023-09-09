import { Book, Prisma, PrismaClient } from "@prisma/client";

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
const getBooksFromDb = async (payload: any): Promise<Book[] | null> => {
  const skip = (parseInt(payload.page as string) - 1) * payload.limit;
  const limit = parseInt(payload.limit as string);
  const {
    searchTerm,
    sortBy,
    sortOrder,
    name,
    category,
    genre,
    minPrice,
    maxPrice,
  } = payload;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ["title", "name", "email"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      payload.sortBy && payload.sortOrder
        ? { [payload.sortBy]: payload.sortOrder }
        : {
            title: "desc",
          },
  });
  return result;
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
const deleteBook = async (
  id: string,
): Promise<Book | null> => {
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
