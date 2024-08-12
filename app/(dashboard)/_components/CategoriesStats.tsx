import SkeletonWrapper from '@/components/SkeletonWrapper';
import { useGetStatsCategories } from '@/hooks/use-get-stats-categories';
import { UserSettings } from '@prisma/client';
import React from 'react';
import CategoriesCard from './CategoriesCard';
interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}
function CategoriesStats({ userSettings, from, to }: Props) {
  const { statsCurrenciesQuery, formatter } = useGetStatsCategories(
    from,
    to,
    userSettings.currency
  );
  return (
    <div className='flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={statsCurrenciesQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type='income'
          data={statsCurrenciesQuery.data || []}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsCurrenciesQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type='expense'
          data={statsCurrenciesQuery.data || []}
        />
      </SkeletonWrapper>
    </div>
  );
}

export default CategoriesStats;
