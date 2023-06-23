'use client';

import TextareaAutosize from 'react-textarea-autosize';

function ChatTextArea() {
  return (
    <div className="flex ml-[1px] max-h-[300px] overflow-y-scroll scrollbar-hide">
      <TextareaAutosize
        className="w-full resize-none outline-none z-10 py-5 px-4 drop-shadow-top text-sm"
        placeholder="메시지를 입력해주세요"
      />
    </div>
  );
}

export default ChatTextArea;
