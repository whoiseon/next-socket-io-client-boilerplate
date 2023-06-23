'use client';

import ChatList from './ChatList';
import Logo from './Logo';

function LeftNav() {
  return (
    <div className="flex flex-col gap-4 bg-bg_element1 drop-shadow-right w-[340px]">
      <div className="header flex justify-between items-center w-full p-4">
        <Logo />
        <button className="text-sm text-text3 rounded px-2 py-1 mr-[-8px] transition-all hover:text-primary1 hover:bg-bg_element2">
          Sign In
        </button>
      </div>
      <ChatList />
    </div>
  );
}

export default LeftNav;
