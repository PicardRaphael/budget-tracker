import { items } from '@/lib/routers';
import Logo from '../Logo';
import NavBarItem from './NavBarItem';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import { CircleUserRound } from 'lucide-react';

function DesktopNavbar() {
  return (
    <div className='hidden border-separate border-b bg-background md:block'>
      <nav className='container flex items-center justify-between px-8'>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
          <Logo />
          <div className='flex h-full'>
            {items.map((item) => (
              <NavBarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
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

export default DesktopNavbar;
