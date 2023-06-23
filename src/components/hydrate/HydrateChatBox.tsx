import getQueryClient from '@/lib/query/getQueryClient';
import HydrateOnClient from './HydrateOnClient';
import { dehydrate } from '@tanstack/react-query';
import { fetchGetRoomMessages, fetchGetRooms } from '@/lib/api/chat';
import { queryKey } from '@/lib/query/queryKey';
import ChatBox from '../ChatBox';

interface Props {
  roomCode: string;
}

async function HydrateChatBox({ roomCode }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey.GET_ROOM_MESSAGES(roomCode), () =>
    fetchGetRoomMessages(roomCode),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <ChatBox />
    </HydrateOnClient>
  );
}

export default HydrateChatBox;
