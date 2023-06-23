'use client';

import { useState } from 'react';
import ChatSection from './ChatSection';
import useGetRooms from '@/lib/hooks/useGetRooms';

interface Props {}

function ChatList({}: Props) {
  const { data: openChatList } = useGetRooms();

  const [allRoom, setAllRoom] = useState([]);
  const [privateRoom, setPrivateRoom] = useState([]);
  return (
    <div className="flex flex-col flex-1 gap-4 w-full">
      <ChatSection type="all" room={openChatList!} />
    </div>
  );
}

export default ChatList;
