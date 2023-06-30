'use client';
import { fetchLogin } from '@/lib/api/auth';
import useInput from '@/lib/hooks/useInput';
import { queryKey } from '@/lib/query/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function AuthForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [username, onChangeUsername, setUsername] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const { isLoading, mutate } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      queryClient.refetchQueries(queryKey.GET_ME);
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;

    mutate({ username, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-bg_element1 p-8 w-[400px] rounded drop-shadow-bottom border-[1px] border-border5"
    >
      <h2>Sign In</h2>
      <div className="flex flex-col gap-4 mt-4">
        <input
          className="px-3 py-2 border-[1px] border-border5 rounded"
          type="text"
          value={username}
          onChange={onChangeUsername}
        />
        <input
          className="px-3 py-2 border-[1px] border-border5 rounded"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="flex">
        <button
          type="submit"
          className="px-3 py-2 mt-4 bg-primary1 text-white rounded w-full"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
