import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IsignInUser, IsingInResponse } from "./auth.interface";

const prisma = new PrismaClient();

const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};
const signInUser = async (payload: IsignInUser): Promise<IsingInResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist");
  }
  const isPasswordMatched =
    isUserExist.password.toString() === payload.password.toString();
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, "password doesn't matched");
  }
  const decodeInfo = {
    role: isUserExist.role,
    userId: isUserExist.id,
  };
  const createdToken = jwtHelpers.createToken(
    decodeInfo,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token: createdToken,
  };
};

export const authServices = {
  insertIntoDb,
  signInUser,
};
