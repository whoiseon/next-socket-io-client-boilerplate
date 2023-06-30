'use client';

import Link from 'next/link';
import ChatList from './ChatList';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import LogoutButton from './LogoutButton';
import { userStore } from '@/states/user';
import { useEffect } from 'react';
import { User } from '@/lib/api/types';

function LeftNav() {
  const pathname = usePathname();
  const { data: meData } = useGetMyAccount();
  const { setUser } = userStore();

  useEffect(() => {
    if (meData) setUser(meData as User);
  }, [meData, setUser]);

  if (pathname === '/login' || pathname === '/register') return null;
  return (
    <div className="flex flex-col gap-4 bg-bg_element1 drop-shadow-right w-[340px] h-full">
      <div className="header flex justify-between items-center w-full p-4">
        <Logo />
        {meData ? (
          <LogoutButton />
        ) : (
          <Link
            href="/login"
            className="text-sm text-text3 rounded px-2 py-1 mr-[-8px] transition-all hover:text-primary1 hover:bg-bg_element2"
          >
            Sign In
          </Link>
        )}
      </div>
      <ChatList />
    </div>
  );
}

export default LeftNav;
