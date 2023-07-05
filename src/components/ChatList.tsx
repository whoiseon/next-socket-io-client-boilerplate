'use client';

import { useRouter } from 'next/router';
import ChatSection from './ChatSection';
import useGetRooms from '@/lib/hooks/useGetRooms';
import Link from 'next/link';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';

interface Props { }

function ChatList({ }: Props)
{
  const { data: openChatList } = useGetRooms();
  const { data: meData } = useGetMyAccount();

  return (
    <div className="flex flex-col flex-1 gap-4 w-full">
      {meData ? <div className="flex flex-col px-[16px]">
        <Link href='/create' className="flex items-center justify-center bg-gray-100 rounded h-[42px]">+ 채팅방 개설</Link>
      </div> : undefined}
      <ChatSection type="all" room={openChatList!} />
    </div>
  );
}

export default ChatList;
