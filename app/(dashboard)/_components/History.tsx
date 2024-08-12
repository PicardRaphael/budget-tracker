'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetFormatterForCurrency } from '@/lib/helpers';
import { Period, Timeframe } from '@/types/type';
import { UserSettings } from '@prisma/client';
import React, { useState } from 'react';
import HistoryPeriodSelector from './HistoryPeriodSelector';
import { useGetHistoryData } from '@/hooks/use-get-history-data';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import GraphHistory from '@/components/Recharts/GraphHistory';

function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeFrame, setTimeframe] = useState<Timeframe>('month');
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const formatter = React.useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  const { historyDataQuery } = useGetHistoryData(timeFrame, period);

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;
  return (
    <div className='container'>
      <h2 className='mt-12 text-3xl font-bold'>History</h2>
      <Card className='col-span-12 mt-2 w-full'>
        <CardHeader className='gap-2'>
          <CardTitle className='grid grid-flow-row justify-between gap-2 md:grid-flow-col'>
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeFrame}
              setTimeframe={setTimeframe}
            />
            <div className='flex h-10 gap-2'>
              <Badge
                variant={'outline'}
                className='flex items-center gap-2 text-sm'
              >
                <div className='h-4 w-4 rounded-full bg-emerald-500'></div>
                Income
              </Badge>
              <Badge
                variant={'outline'}
                className='flex items-center gap-2 text-sm'
              >
                <div className='h-4 w-4 rounded-full bg-red-500'></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable ? (
              <GraphHistory
                formatter={formatter}
                data={historyDataQuery.data}
                timeFrame={timeFrame}
              />
            ) : (
              <Card className='flex h-[300px] flex-col items-center justify-center bg-background'>
                No data for the selected period
                <p className='text-sm text-muted-foreground'>
                  Try selecting a different period or adding new transactions
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
}

export default History;
