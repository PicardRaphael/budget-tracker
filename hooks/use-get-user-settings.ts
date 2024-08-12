import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { currencies, Currency } from '@/lib/currencies';
import { UserSettings } from '@prisma/client';

export const useGetUserSettings = () => {
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  const userSettings = useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = currencies.find(
      (currency) => currency.value === userSettings.data.currency
    );
    if (userCurrency) {
      setSelectedCurrency(userCurrency);
    }
  }, [userSettings.data]);

  return {
    userSettings,
    selectedCurrency,
    setSelectedCurrency,
  };
};
