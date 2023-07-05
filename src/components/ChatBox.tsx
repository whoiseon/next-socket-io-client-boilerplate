'use client';

import useGetRoomMessages from '@/lib/hooks/useGetRoomMessages';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { GetRoomMessageResponse, Message } from '@/lib/api/types';
import ChatTextArea from './ChatTextArea';
import
{
  SendMessageParams,
  fetchSendMessage,
} from '@/lib/api/chat';
import useInput from '@/lib/hooks/useInput';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import useSocket from '@/lib/hooks/useSocket';
import Scrollbars from 'react-custom-scrollbars-2';

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
  const [newChat, setNewChat] = useState<Message | null>(null);

  const memoizedMessageItem = useMemo(
    () =>
      messages?.data.map((message) => (
        <MessageItem key={message.id} data={message} />
      )),
    [messages],
  );

  const isScrollBottom = () =>
  {
    const chatContainer = scrollbarRef.current;
    if (!chatContainer) return false;

    return (
      chatContainer.scrollTop + chatContainer.clientHeight >=
      chatContainer.scrollHeight
    );
  };

  const scrollToBottom = useCallback(() =>
  {
    if (scrollbarRef.current)
    {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }
  }, []);

  const onClickNewChat = () =>
  {
    setNewChat(null);
    scrollToBottom();
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: fetchSendMessage,
    onMutate: (value) =>
    {
      setSendMessage('');
    },
    // onSettled: () =>
    //   queryClient.invalidateQueries(
    //     queryKey.GET_ROOM_MESSAGES(params.roomCode),
    //   ),
    onSuccess: () =>
    {
      queryClient.refetchQueries(queryKey.GET_ROOM_MESSAGES(params.roomCode));
      scrollToBottom();
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
        userId: meData!.id,
      });
    }
  };

  const onMessage = useCallback(
    (data: Message) =>
    {
      if (data.roomCode === params.roomCode)
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
                  id: data.id,
                  content: data.content,
                  timestamp: data.timestamp,
                  userId: data.userId,
                  roomCode: data.roomCode,
                  user: {
                    username: data.user.username,
                    nickname: data.user.nickname,
                  },
                },
              ],
            };
          },
        );
      }

      if (isScrollBottom())
      {
        setTimeout(() =>
        {
          scrollToBottom();
        }, 30);
      }
      else
      {
        setNewChat(data);
      }
    },
    [queryClient, params.roomCode, scrollToBottom],
  );

  // socket?.emit('sendMessage', value.content);
  useEffect(() =>
  {
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
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <>
      <div
        ref={scrollbarRef}
        className="flex flex-1 flex-col p-6 gap-4 overflow-auto relative"
      >
        {memoizedMessageItem}
        {newChat ? <div className="flex items-center fixed bottom-[76px] left-[356px] z-10 bg-black text-white px-[12px] py-[6px] rounded opacity-60 cursor-pointer" onClick={onClickNewChat}>
          {newChat.user.nickname}님이 새로운 메세지를 보내셨습니다.
        </div> : undefined}
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
