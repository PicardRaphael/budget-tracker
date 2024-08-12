import { useQuery } from '@tanstack/react-query';
import { GetHistoryPeriodsResponseType } from '@/lib/back-end/getHistoryPeriods';

export const useGetHistoryPeriods = () => {
  const historyPeriodsQuery = useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ['overview', 'history', 'periods'],
    queryFn: () => fetch(`/api/history-periods`).then((res) => res.json()),
  });

  return { historyPeriodsQuery };
};
