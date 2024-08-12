import * as React from 'react';
import { TransactionType } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { CreateCategory } from '@/app/(dashboard)/_actions/categories';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { CreateCategorySchemaType } from '@/schema/categories';

export const useSetCategory = (
  type: TransactionType,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSucessCallback: (category: Category) => void,
  form?: UseFormReturn<CreateCategorySchemaType>
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form?.reset({
        name: '',
        icon: '',
        type,
      });

      toast.success(`Category ${data.name} created successfully 🎉`, {
        id: 'create-category',
      });

      onSucessCallback(data);
      await queryClient.invalidateQueries({
        queryKey: ['categories'],
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
