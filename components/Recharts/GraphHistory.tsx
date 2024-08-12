import { HistoryData, Timeframe } from '@/types/type';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

interface Props {
  timeFrame: Timeframe;
  data: HistoryData[] | undefined;
  formatter: Intl.NumberFormat;
}

export function GraphHistory({ timeFrame, data, formatter }: Props) {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart height={300} data={data} barCategoryGap={5}>
        <defs>
          <linearGradient id='incomeBar' x1='0' y1='0' x2='0' y2='1'>
            <stop offset={'0'} stopColor='#10b981' stopOpacity={'1'} />
            <stop offset={'1'} stopColor='#10b981' stopOpacity={'0'} />
          </linearGradient>

          <linearGradient id='expenseBar' x1='0' y1='0' x2='0' y2='1'>
            <stop offset={'0'} stopColor='#ef4444' stopOpacity={'1'} />
            <stop offset={'1'} stopColor='#ef4444' stopOpacity={'0'} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray='5 5'
          strokeOpacity={'0.2'}
          vertical={false}
        />
        <XAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 5, right: 5 }}
          dataKey={(data) => {
            const { year, month, day } = data;
            const date = new Date(year, month, day || 1);
            if (timeFrame === 'year') {
              return date.toLocaleDateString('default', {
                month: 'long',
              });
            }
            return date.toLocaleDateString('default', {
              day: '2-digit',
            });
          }}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey={'income'}
          label='Income'
          fill='url(#incomeBar)'
          radius={4}
          className='cursor-pointer'
        />
        <Bar
          dataKey={'expense'}
          label='Expense'
          fill='url(#expenseBar)'
          radius={4}
          className='cursor-pointer'
        />
        <Tooltip
          cursor={{ opacity: 0.1 }}
          content={(props) => (
            <CustomTooltip formatter={formatter} {...props} />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraphHistory;
