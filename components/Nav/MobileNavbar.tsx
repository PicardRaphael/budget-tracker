'use client';

import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';
import { Button } from '../ui/button';
import { CircleUserRound, Menu } from 'lucide-react';
import Logo, { LogoMobile } from '../Logo';
import { items } from '@/lib/routers';
import NavBarItem from './NavBarItem';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-8'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[100%] sm:w-[100%]' side='left'>
            <Logo />
            <div className='flex flex-col gap-1 pt-4'>
              {items.map((item) => (
                <NavBarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4 pr-2'>
          <LogoMobile />
        </div>
        <div className='flex items-end gap-2'>
          <ThemeSwitcherBtn />
          <SignedOut>
            <SignInButton>
              <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10'>
                <CircleUserRound />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default MobileNavbar;
