import getQueryClient from '@/lib/query/getQueryClient';
import LeftNav from '../LeftNav';
import HydrateOnClient from './HydrateOnClient';
import { dehydrate } from '@tanstack/react-query';
import { fetchGetRooms } from '@/lib/api/chat';
import { queryKey } from '@/lib/query/queryKey';

async function HydrateLeftNav() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey.GET_ROOMS, fetchGetRooms);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <LeftNav />
    </HydrateOnClient>
  );
}

export default HydrateLeftNav;
