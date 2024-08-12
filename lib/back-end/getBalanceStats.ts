import { prisma } from '../prisma';

export async function getBalanceStats(userId: string, from: Date, to: Date) {
  const totals = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return {
    expense: totals.find((t) => t.type === 'expense')?._sum.amount || 0,
    income: totals.find((t) => t.type === 'income')?._sum.amount || 0,
  };
}
export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;
