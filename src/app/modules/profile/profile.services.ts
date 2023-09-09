import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
const retrieveProfileData = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result;
};

export const profileServices = {
  retrieveProfileData,
};
