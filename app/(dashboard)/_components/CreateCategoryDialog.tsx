'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from '@/schema/categories';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import data from '@emoji-mart/data';
import { TransactionType } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import Picker from '@emoji-mart/react';
import { useTheme } from 'next-themes';
import { useSetCategory } from '@/hooks/use-set-category';
import { toast } from 'sonner';
import { Category } from '@prisma/client';

interface Props {
  type: TransactionType;
  onSucessCallback: (category: Category) => void;
  trigger?: ReactNode;
}
const CreateCategoryDialog = ({ type, onSucessCallback, trigger }: Props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });
  const { mutate, isPending } = useSetCategory(
    type,
    setOpen,
    onSucessCallback,
    form
  );
  const onSubmit = (values: CreateCategorySchemaType) => {
    toast.loading('Creating category...', {
      id: 'create-category',
    });
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant={'ghost'}
            className='flex border-separate items-center justify-start roudned-none border-b px-3 py-3 text-muted-foreground'
          >
            <PlusSquare className='mr-2 h-4 w-4' />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create{' '}
            <span
              className={cn(
                'mt-1',
                type === 'income' ? 'text-green-500' : 'text-red-500'
              )}
            >
              {type}
            </span>{' '}
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Category' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className='h-[100px] w-full'
                        >
                          {form.watch('icon') ? (
                            <div className='flex flex-col items-center gap-2'>
                              <span className='text-5xl' role='img'>
                                {field.value}
                              </span>
                              <p className='text-xs text-muted-foreground'>
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center gap-2'>
                              <CircleOff className='h-[48px] w-[48px]' />
                              <p className='text-xs text-muted-foreground'>
                                Click to select
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full'>
                        <Picker
                          data={data}
                          theme={theme.resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant={'secondary'}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending ? 'Create' : <Loader2 className='h-4 w-4' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
