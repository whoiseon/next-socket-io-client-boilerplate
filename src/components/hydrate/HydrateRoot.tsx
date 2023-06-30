import getQueryClient from '@/lib/query/getQueryClient';
import HydrateOnClient from './HydrateOnClient';
import { cookies } from 'next/headers';
import { dehydrate } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetMeOnServer } from '@/lib/api/auth';

interface Props {
  children: React.ReactNode;
}

async function HydrateRoot({ children }: Props) {
  const cookieStore = cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(queryKey.GET_ME, () =>
    fetchGetMeOnServer(cookieStore.get('access_token')),
  );

  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
}

export default HydrateRoot;
