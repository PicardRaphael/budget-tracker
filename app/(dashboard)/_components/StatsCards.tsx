import SkeletonWrapper from '@/components/SkeletonWrapper';
import { useGetStats } from '@/hooks/use-get-stats';
import { UserSettings } from '@prisma/client';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import React from 'react';
import StatsCard from './StatsCard';

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}
function StatsCards({ userSettings, from, to }: Props) {
  const { balance, isLoading, income, expense, formatter } = useGetStats(
    from,
    to,
    userSettings.currency
  );

  return (
    <div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={isLoading}>
        <StatsCard
          formatter={formatter}
          value={income}
          title='Income'
          icon={
            <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isLoading}>
        <StatsCard
          formatter={formatter}
          value={expense}
          title='Expense'
          icon={
            <TrendingDown className='h-12 w-12 items-center rounded-lg text-red-500 bg-red-400/10 p-2 ' />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isLoading}>
        <StatsCard
          formatter={formatter}
          value={balance}
          title='Balance'
          icon={
            <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;
