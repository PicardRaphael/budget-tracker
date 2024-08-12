import { Period, Timeframe } from '@/types/type';
import { getYearHistoryData } from './getYearHistoryData';
import { getMonthHistoryData } from './getMonthHistoryData';
export async function getHistoryData(
  userId: string,
  timeframe: Timeframe,
  period: Period
) {
  switch (timeframe) {
    case 'year':
      return await getYearHistoryData(userId, period.year);
    case 'month':
      return await getMonthHistoryData(userId, period.year, period.month);
  }
}

export type GetHistoryDataResponseType = Awaited<
  ReturnType<typeof getHistoryData>
>;
