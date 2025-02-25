import React from 'react';
import { Category } from '@prisma/client';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeleteCategoryDialog from '@/app/(dashboard)/_components/DeleteCategoryDialog';

export function CategoryCardd({ category }: { category: Category }) {
  return (
    <div className='flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]'>
      <div className='flex flex-col items-center gap-2 p-4'>
        <span className='text-3xl' role='img'>
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className='flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20'
            variant={'secondary'}
          >
            <TrashIcon className='h-4 w-4' />
            Remove
          </Button>
        }
      />
    </div>
  );
}
