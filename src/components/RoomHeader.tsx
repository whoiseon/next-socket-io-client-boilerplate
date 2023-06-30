'use client';

import useGetRoomUnique from '@/lib/hooks/useGetRoomUnique';
import { useParams } from 'next/navigation';

function RoomHeader() {
  const params = useParams();
  const { data: roomData } = useGetRoomUnique(params.roomCode);
  return (
    <div className="flex items-center min-h-[80px] bg-bg_element1 ml-[1px] z-10 px-4 drop-shadow-bottom">
      <div className="flex flex-col">
        <h2 className="font-bold">{roomData?.data.name}</h2>
        <p className="text-sm text-text3 font-medium">
          {roomData?.data.description}
        </p>
      </div>
    </div>
  );
}

export default RoomHeader;
