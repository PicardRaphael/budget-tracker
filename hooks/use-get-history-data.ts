import { useQuery } from '@tanstack/react-query';
import { GetHistoryDataResponseType } from '@/lib/back-end/getHistoryData';
import { Period, Timeframe } from '@/types/type';

export const useGetHistoryData = (timeframe: Timeframe, period: Period) => {
  const historyDataQuery = useQuery<GetHistoryDataResponseType>({
    queryKey: ['overview', 'history', timeframe],
    queryFn: () =>
      fetch(
        `/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });

  return { historyDataQuery };
};
