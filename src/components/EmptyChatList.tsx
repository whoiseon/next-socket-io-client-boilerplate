'use client';

import EmptyChatListIcon from '@/assets/vectors/empty-chat-list.svg';

interface Props {
  message?: string;
}

function EmptyChatList({ message = '채팅방이 없습니다' }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center px-4 min-h-[160px]">
      <EmptyChatListIcon className="w-[32px] h-[32px] text-text4" />
      <p className="text-text4 text-sm">{message}</p>
    </div>
  );
}

export default EmptyChatList;
