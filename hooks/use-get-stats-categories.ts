import * as React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { GetCategoriesStatsResponseType } from '@/lib/back-end/getCategoriesStats';

export const useGetStatsCategories = (
  from: Date,
  to: Date,
  currency: string
) => {
  const statsCurrenciesQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ['overview', 'stats', 'categories', from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });

  const formatter = React.useMemo(() => {
    return GetFormatterForCurrency(currency);
  }, [currency]);

  return {
    statsCurrenciesQuery,
    formatter,
  };
};
