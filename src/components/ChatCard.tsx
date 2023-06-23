import { Room } from '@/lib/api/types';
import Link from 'next/link';

interface Props {
  room: Room;
}

function ChatCard({ room }: Props) {
  return (
    <Link
      href={room.code}
      className="flex flex-col justify-center gap-2 p-4 border-[1px] border-border4 rounded hover:border-primary1 transition-all hover:shadow-lg active:bg-bg_element2"
    >
      <h2 className="font-bold text-sm">{room.name}</h2>
      <p className="text-sm font-normal text-text3">{room.description}</p>
    </Link>
  );
}

export default ChatCard;
