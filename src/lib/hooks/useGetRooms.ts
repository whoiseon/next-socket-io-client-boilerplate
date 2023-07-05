import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetRooms } from '../api/chat';
import { GetRoomResponse } from '../api/types';

function useGetRooms()
{
  const rooms = useQuery<GetRoomResponse>({
    queryKey: queryKey.GET_ROOMS,
    queryFn: fetchGetRooms,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return rooms;
}

export default useGetRooms;
