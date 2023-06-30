'use client';

import { fetchSendMessage } from '@/lib/api/chat';
import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import useInput from '@/lib/hooks/useInput';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onSend: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: string;
  onChangeSendMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ChatTextArea({ onSend, sendMessage, onChangeSendMessage }: Props) {
  const { data: meData } = useGetMyAccount();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex ml-[1px] max-h-[300px] overflow-y-scroll scrollbar-hide">
      <TextareaAutosize
        ref={textAreaRef}
        className="w-full resize-none outline-none z-10 py-5 px-4 drop-shadow-top text-sm"
        placeholder={
          meData ? '메세지를 입력하세요' : '로그인이 후 이용 가능합니다'
        }
        value={sendMessage || ''}
        onChange={onChangeSendMessage}
        onKeyDown={onSend}
        readOnly={!meData}
      />
    </div>
  );
}

export default ChatTextArea;
