'use client';

import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { currencies, Currency } from '@/lib/currencies';
import SkeletonWrapper from './SkeletonWrapper';
import { useGetUserSettings } from '@/hooks/use-get-user-settings';
import { useSetUserSettings } from '@/hooks/use-set-user-settings';

function CurrencySelector() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { selectedCurrency, userSettings, setSelectedCurrency } =
    useGetUserSettings();
  const { selectOption, isPending } = useSetUserSettings(setSelectedCurrency);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full justify-start'
              disabled={isPending}
            >
              {selectedCurrency ? (
                <>{selectedCurrency.label}</>
              ) : (
                <>Set currency</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0' align='start'>
            <StatusList setOpen={setOpen} setSelectedCurrency={selectOption} />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant='outline' className='w-full justify-start'>
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>Set currency</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mt-4 border-t'>
            <StatusList setOpen={setOpen} setSelectedCurrency={selectOption} />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function StatusList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder='Filter status...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedCurrency(
                  currencies.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CurrencySelector;
