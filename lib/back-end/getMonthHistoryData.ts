import { HistoryData } from '@/types/type';
import { prisma } from '../prisma';
import { getDaysInMonth } from 'date-fns';

export async function getMonthHistoryData(
  userId: string,
  year: number,
  month: number
) {
  const result = await prisma.monthHistory.groupBy({
    by: ['day'],
    where: {
      userId,
      year,
      month,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [
      {
        day: 'asc',
      },
    ],
  });

  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];
  const daysInMonth = getDaysInMonth(new Date(year, month));
  for (let i = 1; i <= daysInMonth; i++) {
    let expense = 0;
    let income = 0;

    const day = result.find((row) => row.day === i);
    if (day) {
      expense = day._sum.expense || 0;
      income = day._sum.income || 0;
    }

    history.push({
      expense,
      income,
      year,
      month,
      day: i,
    });
  }

  return history;
}
