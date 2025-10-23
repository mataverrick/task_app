import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

export const validatePassword = async (password, databasePassword) => {
  const result = await compare(password, databasePassword);
  
  return result;
};
