import { prisma } from '../prisma';

export const createUserSettings = async (userId: string) => {
  const userSettings = await prisma.userSettings.create({
    data: {
      currency: 'EUR',
      userId: userId,
    },
  });

  return userSettings;
};
