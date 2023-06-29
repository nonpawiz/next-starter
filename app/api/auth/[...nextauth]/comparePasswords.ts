import bcrypt from "bcrypt";

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};
