import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};
const getCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};
const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const categoryServices = {
  insertIntoDb,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
