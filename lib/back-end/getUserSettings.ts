import { redirect } from 'next/navigation';
import { prisma } from '../prisma';

export const getUserSettings = async (userId: string) => {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });
  if (!userSettings) {
    return redirect('/wizard');
  }

  return userSettings;
};
