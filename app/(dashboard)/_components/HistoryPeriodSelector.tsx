import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetHistoryPeriods } from '@/hooks/use-get-history-periods';
import { Period, Timeframe } from '@/types/type';
import React from 'react';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeFrame: Timeframe;
  setTimeframe: (timeFrame: Timeframe) => void;
}

function HistoryPeriodSelector({
  period,
  setPeriod,
  setTimeframe,
  timeFrame,
}: Props) {
  const { historyPeriodsQuery } = useGetHistoryPeriods();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <SkeletonWrapper
        isLoading={historyPeriodsQuery.isFetching}
        fullWidth={false}
      >
        <Tabs
          value={timeFrame}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value='year'>Year</TabsTrigger>
            <TabsTrigger value='month'>Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className='flex flex-wrap items-center gap-2'>
        <SkeletonWrapper isLoading={historyPeriodsQuery.isFetching}>
          <YearSelector
            period={period}
            setPeriod={setPeriod}
            years={historyPeriodsQuery.data || []}
          />
        </SkeletonWrapper>
        {timeFrame === 'month' ? (
          <SkeletonWrapper isLoading={historyPeriodsQuery.isFetching}>
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWrapper>
        ) : null}
      </div>
    </div>
  );
}

export default HistoryPeriodSelector;
