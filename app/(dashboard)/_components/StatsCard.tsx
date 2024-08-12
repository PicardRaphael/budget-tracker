import { Card } from '@/components/ui/card';
import React, { ReactNode, useCallback } from 'react';
import CountUp from 'react-countup';
interface Props {
  formatter: Intl.NumberFormat;
  value: number;
  title: string;
  icon: ReactNode;
}

function StatsCard({ formatter, value, title, icon }: Props) {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );

  return (
    <Card className='flex h-24 w-full items-start gap-2 p-4'>
      {icon}
      <div className='flex flex-col items-center gap-0'>
        <p className='text-muted-foreground'>{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className='tex2'
        />
      </div>
    </Card>
  );
}

export default StatsCard;
