import { GetFormatterForCurrency } from '../helpers';
import { prisma } from '../prisma';

export async function getTransactionsHistory(
  userId: string,
  from: Date,
  to: Date
) {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });

  if (!userSettings) {
    throw new Error('user settings not found');
  }

  const formatter = GetFormatterForCurrency(userSettings.currency);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
  return transactions.map((transaction) => ({
    ...transaction,
    formattedAmount: formatter.format(transaction.amount),
  }));
}

export type GetTransactionHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionsHistory>
>;
