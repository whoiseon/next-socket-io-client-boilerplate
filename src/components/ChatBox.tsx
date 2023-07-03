'use client';

import useGetRoomMessages from '@/lib/hooks/useGetRoomMessages';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import MessageItem from './MessageItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { GetRoomMessageResponse } from '@/lib/api/types';
import ChatTextArea from './ChatTextArea';
import { SendMessageParams, fetchSendMessage } from '@/lib/api/chat';
import useInput from '@/lib/hooks/useInput';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import useSocket from '@/lib/hooks/useSocket';

interface Props { }

function ChatBox({ }: Props)
{
  const params = useParams();
  const queryClient = useQueryClient();
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [socket, disconnect] = useSocket(params.roomCode);
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
    onMutate: (value) =>
    {
      setSendMessage('');
      scrollbarRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });

      setTimeout(() =>
      {
        if (scrollbarRef.current)
        {
          scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
        }
      }, 50);
    },
    // onSettled: () =>
    //   queryClient.invalidateQueries(
    //     queryKey.GET_ROOM_MESSAGES(params.roomCode),
    //   ),
    onSuccess: () =>
    {
      queryClient.refetchQueries(queryKey.GET_ROOM_MESSAGES(params.roomCode));
    },
    onError: (error, value, rollback) =>
    {
      console.log(error);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
  {
    if (e.key === 'Enter' && !e.shiftKey)
    {
      e.preventDefault();
      mutate({
        roomCode: params.roomCode,
        content: sendMessage,
        user: meData!,
      });
    }
  };

  const onMessage = useCallback(
    (data: SendMessageParams) =>
    {
      if (data.roomCode === params.roomCode && data.user.id === meData?.id)
      {
        socket?.on('chat message', (message) =>
        {
          queryClient.setQueryData(
            queryKey.GET_ROOM_MESSAGES(params.roomCode),
            (prevMessageData: any) =>
            {
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
      }
    },
    [meData, params.roomCode, socket, queryClient],
  );

  // socket?.emit('message', value.content);
  useEffect(() =>
  {
    socket?.on('hello', (message) =>
    {
      console.log(message);
    });
    socket?.on('message', onMessage);

    return () =>
    {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() =>
  {
    if (meData && socket)
    {
      console.log(socket);
      socket.emit('join', meData.id);
    }
  }, [socket, meData]);

  useEffect(() =>
  {
    return () =>
    {
      disconnect();
    };
  }, [params.roomCode, disconnect]);

  useEffect(() =>
  {
    if (scrollbarRef.current)
    {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }
  }, [scrollbarRef]);

  return (
    <>
      <div
        ref={scrollbarRef}
        className="flex flex-1 flex-col p-6 gap-4 overflow-auto"
      >
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
