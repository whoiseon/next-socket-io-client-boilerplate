'use client';

import useGetRoomMessages from '@/lib/hooks/useGetRoomMessages';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import MessageItem from './MessageItem';

interface Props {}

function ChatBox({}: Props) {
  const params = useParams();
  const { data: messages } = useGetRoomMessages(params.roomCode);

  const memoizedMessageItem = useMemo(
    () =>
      messages?.data.map((message) => (
        <MessageItem key={message.id} data={message} />
      )),
    [messages],
  );

  return (
    <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide p-6 gap-4">
      {memoizedMessageItem}
    </div>
  );
}

export default ChatBox;
