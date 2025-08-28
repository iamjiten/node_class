import UserModel from "./user.model";
import { CreateUserType } from "./user.validation";
import bcrypt from "bcrypt";

export const createUser = async (data: CreateUserType) => {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUND) || 10;
  const hashPwd = bcrypt.hashSync(data.password, saltRounds);
  data.password = hashPwd;

  const user = await UserModel.create(data);
  return user;
};

export const findById = async (userId: string) => {
  return UserModel.findById(userId);
};

export const findOneBy = async (where) => {
  const user = await UserModel.findOne(where);
  return user;
};
