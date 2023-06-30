'use client';

import useGetRoomMessages from '@/lib/hooks/useGetRoomMessages';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import MessageItem from './MessageItem';
import socket from '@/lib/socket';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { GetRoomMessageResponse } from '@/lib/api/types';
import ChatTextArea from './ChatTextArea';
import { fetchSendMessage } from '@/lib/api/chat';
import useInput from '@/lib/hooks/useInput';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';

interface Props {}

function ChatBox({}: Props) {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data: messages } = useGetRoomMessages(params.roomCode);
  const { data: meData } = useGetMyAccount();

  const [sendMessage, onChangeSendMessage, setSendMessage] = useInput('');

  const memoizedMessageItem = useMemo(
    () =>
      messages?.data.map((message) => (
        <MessageItem key={message.id} data={message} />
      )),
    [messages],
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSendMessage,
    onMutate: (value) => {
      socket.sendMessage(sendMessage);
      setSendMessage('');
    },
    // onSettled: () =>
    //   queryClient.invalidateQueries(
    //     queryKey.GET_ROOM_MESSAGES(params.roomCode),
    //   ),
    onError: (error, value, rollback) => {
      console.log(error);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      mutate({ roomCode: params.roomCode, content: sendMessage });
    }
  };

  useEffect(() => {
    socket.connect();
    console.log('socket connect');
    socket.onMessage((message) => {
      queryClient.setQueryData(
        queryKey.GET_ROOM_MESSAGES(params.roomCode),
        (prevMessageData: any) => {
          return {
            ...prevMessageData,
            data: [
              ...prevMessageData.data,
              {
                id: prevMessageData.data.length + 999,
                content: message,
                timestamp: Date.now(),
                user: {
                  id: meData?.id,
                  username: meData?.username,
                  nickname: meData?.nickname,
                },
              },
            ],
          };
        },
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [meData, params.roomCode, queryClient]);

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide p-6 gap-4">
        {memoizedMessageItem}
      </div>
      <ChatTextArea
        onSend={handleKeyDown}
        sendMessage={sendMessage}
        onChangeSendMessage={onChangeSendMessage}
      />
    </>
  );
}

export default ChatBox;
