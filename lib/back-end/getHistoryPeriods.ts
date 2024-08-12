import { prisma } from '../prisma';

export async function getHistoryPeriods(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ['year'],
    orderBy: [
      {
        year: 'asc',
      },
    ],
  });
  const years = result.map((el) => el.year);
  if (years.length === 0) {
    return [new Date().getFullYear()];
  }
  return years;
}
export type GetHistoryPeriodsResponseType = Awaited<
  ReturnType<typeof getHistoryPeriods>
>;
