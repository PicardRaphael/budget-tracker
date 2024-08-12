import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { GetHistoryPeriodsResponseType } from '@/lib/back-end/getHistoryPeriods';
import { Period } from '@/types/type';
import React from 'react';

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
}

function YearSelector({ period, setPeriod, years }: Props) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) => {
        setPeriod({
          month: period.month,
          year: parseInt(value),
        });
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearSelector;
