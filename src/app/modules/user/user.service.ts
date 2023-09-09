import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const getUsersFromDb = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleUserFromDb = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userServices = {
  getUsersFromDb,
  getSingleUserFromDb,
  updateUser,
  deleteUser,
};
