import { useQuery } from '@tanstack/react-query';
import { GetTransactionHistoryResponseType } from '@/lib/back-end/getTransactionsHistory';
import { DateToUTCDate } from '@/lib/helpers';

export const useGetHistoryTransactions = (from: Date, to: Date) => {
  const historyTransactions = useQuery<GetTransactionHistoryResponseType>({
    queryKey: ['transactions', 'history', from, to],
    queryFn: () =>
      fetch(
        `/api/transactions-history?from=${DateToUTCDate(
          from
        )}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  return historyTransactions;
};
