'use client';

import { Message } from '@/lib/api/types';
import dayjs from 'dayjs';

interface Props {
  data: Message;
}

function MessageItem({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center text-sm gap-1">
        <span>{data.user.nickname}</span>
        <span className="text-text4 font-normal text-xs">
          {dayjs(data.timestamp).format('HH:mm')}
        </span>
      </div>
      <div className="flex">
        <span className="text-sm px-3 py-2 bg-bg_element1 rounded shadow-sm">
          {data.content}
        </span>
      </div>
    </div>
  );
}

export default MessageItem;
