import { compare } from 'bcrypt';

export const compareHash = async (
  plainTextPass: string,
  hashedPass: string
): Promise<boolean> => {
  const isMatch = await compare(plainTextPass, hashedPass);
  return isMatch;
};
