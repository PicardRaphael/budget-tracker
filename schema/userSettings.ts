import { currencies } from '@/lib/currencies';
import { z } from 'zod';

export const UpdateUserSettings = z.object({
  currency: z.custom((value) => {
    const found = currencies.find((currency) => currency.value === value);
    if (!found) {
      throw new Error(`Invalid currency: ${value}`);
    }
    return value;
  }),
});
