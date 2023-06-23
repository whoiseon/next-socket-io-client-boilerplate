import { GetRoomMessageResponse } from '../api/types';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetRoomMessages } from '../api/chat';

function useGetRoomMessages(roomCode: string) {
  const messages = useQuery<GetRoomMessageResponse>({
    queryKey: queryKey.GET_ROOM_MESSAGES(roomCode),
    queryFn: () => fetchGetRoomMessages(roomCode),
  });

  return messages;
}

export default useGetRoomMessages;
