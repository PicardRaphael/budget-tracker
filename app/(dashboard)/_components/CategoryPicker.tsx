'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TransactionType } from '@/types/type';
import { Category } from '@prisma/client';
import React, { useCallback } from 'react';
import CreateCategoryDialog from './CreateCategoryDialog';
import { useGetCategories } from '@/hooks/use-get-category';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className='flex items-center gap-2'>
      <span role='img'>{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}

function CategoryPicker({ type, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const { selectedCategory, categoriesQuery, setValue, value } =
    useGetCategories(type, onChange);
  const sucessCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            'Select Category'
          )}
          <ChevronsUpDown className='w-4 h-4 ml-2 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder='Search category...' />
          <CreateCategoryDialog type={type} onSucessCallback={sucessCallback} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className='text-xs text-muted-foreground'>
              Tip : Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        'mr-2 w-4 h-4 opacity-0',
                        value === category.name && 'opacity-100'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryPicker;
