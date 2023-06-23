'use client';

import { useRouter } from 'next/router';
import ChatSection from './ChatSection';
import useGetRooms from '@/lib/hooks/useGetRooms';

interface Props {}

function ChatList({}: Props) {
  const { data: openChatList } = useGetRooms();

  return (
    <div className="flex flex-col flex-1 gap-4 w-full">
      <ChatSection type="all" room={openChatList!} />
    </div>
  );
}

export default ChatList;
