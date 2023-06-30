import getQueryClient from '@/lib/query/getQueryClient';
import LeftNav from '../LeftNav';
import HydrateOnClient from './HydrateOnClient';
import { cookies } from 'next/headers';
import { dehydrate } from '@tanstack/react-query';
import { fetchGetRooms } from '@/lib/api/chat';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetMe, fetchGetMeOnServer } from '@/lib/api/auth';

async function HydrateLeftNav() {
  const cookieStore = cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_ME, () =>
    fetchGetMeOnServer(cookieStore.get('access_token')),
  );

  await queryClient.prefetchQuery(queryKey.GET_ROOMS, fetchGetRooms);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <LeftNav />
    </HydrateOnClient>
  );
}

export default HydrateLeftNav;
