import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { GetBalanceStatsResponseType } from '@/lib/back-end/getBalanceStats';

export const useGetStats = (
  from: Date,
  to: Date,
  currency: string
): {
  income: number;
  expense: number;
  balance: number;
  formatter: Intl.NumberFormat;
  isLoading: boolean;
} => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ['overview', 'stats', from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = React.useMemo(() => {
    return GetFormatterForCurrency(currency);
  }, [currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;
  const balance = income - expense;
  return {
    income,
    expense,
    balance,
    formatter,
    isLoading: statsQuery.isFetching,
  };
};
