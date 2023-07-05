'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetMe } from '../api/auth';

export function useGetMyAccount()
{
  const myAccount = useQuery({
    queryKey: queryKey.GET_ME,
    queryFn: fetchGetMe,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return myAccount;
}
