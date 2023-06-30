'use client';

import { fetchLogout } from '@/lib/api/auth';
import { queryKey } from '@/lib/query/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function LogoutButton() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      queryClient.refetchQueries(queryKey.GET_ME);
    },
  });

  const onClickLogout = () => {
    mutate();
  };

  return (
    <button
      onClick={onClickLogout}
      className="text-sm bg-primary1 px-2 py-1 rounded drop-shadow-bottom text-white"
    >
      로그아웃
    </button>
  );
}

export default LogoutButton;
