import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { CreateTransaction } from '@/app/(dashboard)/_actions/transaction';
import { UseFormReturn } from 'react-hook-form';
import { CreateTransactionSchemaType } from '@/schema/transaction';
import { TransactionType } from '@/types/type';

export const useSetTransaction = (
  form: UseFormReturn<CreateTransactionSchemaType>,
  type: TransactionType,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,

    onSuccess: async () => {
      toast.success(`Transaction created successfully 🎉`, {
        id: 'create-transaction',
      });
      form.reset({
        type,
        description: '',
        amount: 0,
        date: new Date(),
        category: undefined,
      });
      // After creating a transaction, we need to invalidate the overview query which will refetch data in the homepage
      queryClient.invalidateQueries({
        queryKey: ['overview'],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: 'create-category',
      });
    },
  });
  return { mutate, isPending };
};
