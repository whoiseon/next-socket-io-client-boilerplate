import { Room } from '@/lib/api/types';
import Link from 'next/link';

interface Props {
  room: Room;
  isCurrentRoom: boolean;
}

function ChatCard({ room, isCurrentRoom }: Props) {
  const currentRoomStyle = isCurrentRoom
    ? 'border-primary1 shadow-lg'
    : 'hover:border-primary1 transition-all hover:shadow-lg active:bg-bg_element2';
  const currentRoomText = isCurrentRoom ? 'text-primary1' : 'text-text1';
  return (
    <Link
      href={room.code}
      className={`flex flex-col justify-center gap-2 p-4 border-[1px] rounded ${currentRoomStyle} relative`}
    >
      <h2 className={`font-bold text-sm ${currentRoomText}`}>{room.name}</h2>
      <p className="text-sm font-normal text-text3">{room.description}</p>
      {isCurrentRoom && (
        <div className="absolute top-[8px] right-[8px] w-2 h-2 bg-primary1 rounded-full" />
      )}
    </Link>
  );
}

export default ChatCard;
