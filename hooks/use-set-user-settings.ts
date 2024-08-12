import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { currencies, Currency } from '@/lib/currencies';
import { UpdateUserCurrency } from '@/app/wizard/_actions/userSettings';
import { toast } from 'sonner';

export const useSetUserSettings = (
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | null>>
) => {
  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data) => {
      toast.success(`Currency updated successuflly 🎉`, {
        id: 'update-currency',
      });
      setSelectedCurrency(
        currencies.find((c) => c.value === data.currency) || null
      );
    },
    onError: (e) => {
      console.error(e);
      toast.error('Something went wrong', {
        id: 'update-currency',
      });
    },
  });

  const selectOption = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error('Please select a currency');
        return;
      }

      toast.loading('Updating currency...', {
        id: 'update-currency',
      });

      mutation.mutate(currency.value);
    },
    [mutation]
  );

  return {
    selectOption,
    isPending: mutation.isPending,
  };
};
