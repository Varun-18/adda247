import { hash } from 'bcrypt';

export const generateHash = async (password: string): Promise<string> => {
  const hashedPass = await hash(
    password,
    parseInt(process.env.SALT_ROUNDS || '10')
  );
  return hashedPass;
};
