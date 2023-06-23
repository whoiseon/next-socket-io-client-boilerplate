import getQueryClient from '@/lib/query/getQueryClient';
import HydrateOnClient from './HydrateOnClient';
import { dehydrate } from '@tanstack/react-query';
import { fetchGetRoomUnique, fetchGetRooms } from '@/lib/api/chat';
import { queryKey } from '@/lib/query/queryKey';
import RoomHeader from '../RoomHeader';

interface Props {
  roomCode: string;
}

async function HydrateRoomHeader({ roomCode }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey.GET_ROOM_UNIQUE(roomCode), () =>
    fetchGetRoomUnique(roomCode),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <RoomHeader />
    </HydrateOnClient>
  );
}

export default HydrateRoomHeader;
