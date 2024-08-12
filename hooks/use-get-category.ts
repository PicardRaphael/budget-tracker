import * as React from 'react';
import { TransactionType } from '@/types/type';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { GetCategoryResponseType } from '@/lib/back-end/getCategory';

export const useGetCategories = (
  type: TransactionType,
  onChange?: (value: string) => void
) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (!value) return;
    if (onChange) {
      onChange(value); // When the value changes, call the onChange function
    }
  }, [value, onChange]);

  const categoriesQuery = useQuery<GetCategoryResponseType>({
    queryKey: ['categories', type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory: Category | undefined = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );
  return { setValue, selectedCategory, categoriesQuery, value };
};
