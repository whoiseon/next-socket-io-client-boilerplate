import { GetRoomUniqueResponse } from '../api/types';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetRoomUnique } from '../api/chat';

function useGetRoomUnique(roomCode: string) {
  const room = useQuery<GetRoomUniqueResponse>({
    queryKey: queryKey.GET_ROOM_UNIQUE(roomCode),
    queryFn: () => fetchGetRoomUnique(roomCode),
  });

  return room;
}

export default useGetRoomUnique;
