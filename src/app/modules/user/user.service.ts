import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const userServices = {
  insertIntoDb,
};
