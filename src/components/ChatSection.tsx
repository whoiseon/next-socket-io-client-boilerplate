import { useMemo } from 'react';
import EmptyChatList from './EmptyChatList';
import { GetRoomResponse } from '@/lib/api/types';
import ChatCard from './ChatCard';

interface Props {
  type: 'all' | 'private';
  room: GetRoomResponse;
}

const chatTextMap = {
  all: {
    title: '오픈 채팅',
    emptyMessage: '개설된 오픈 채팅이 없어요!',
  },
  private: {
    title: '개인 대화',
    emptyMessage: '아직 대화 내역이 없어요!',
  },
};

function ChatSection({ type, room }: Props) {
  const { title, emptyMessage } = chatTextMap[type];
  const renderedRoom = useMemo(
    () => room?.data.map((room) => <ChatCard key={room.id} room={room} />),
    [room],
  );

  return (
    <div className="flex flex-col gap-4 px-4">
      <h2 className="text-primary1 font-bold text-sm">{title}</h2>
      {renderedRoom.length > 0 ? (
        renderedRoom
      ) : (
        <EmptyChatList message={emptyMessage} />
      )}
    </div>
  );
}

export default ChatSection;
