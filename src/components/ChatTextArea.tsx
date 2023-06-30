'use client';

import { useGetMyAccount } from '@/lib/hooks/useGetMyAccount';
import useInput from '@/lib/hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function ChatTextArea() {
  const { data: meData } = useGetMyAccount();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [sendMessage, onChangeSendMessage, setSendMessage] = useInput('');
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log(sendMessage);
      setSendMessage('');
    }
  };

  return (
    <div className="flex ml-[1px] max-h-[300px] overflow-y-scroll scrollbar-hide">
      <TextareaAutosize
        ref={textAreaRef}
        className="w-full resize-none outline-none z-10 py-5 px-4 drop-shadow-top text-sm"
        placeholder="메시지를 입력해주세요"
        value={sendMessage || ''}
        onChange={onChangeSendMessage}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default ChatTextArea;
