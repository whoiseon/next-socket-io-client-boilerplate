'use client';

import { fetchCreateRoom } from "@/lib/api/chat";
import { CreateRoomParams } from "@/lib/api/types";
import { useGetMyAccount } from "@/lib/hooks/useGetMyAccount";
import useInput from "@/lib/hooks/useInput";
import { useCallback } from "react";
import { queryKey } from "@/lib/query/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

function RoomCreateForm()
{
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: meData } = useGetMyAccount();

    const [name, onChangeName, setName] = useInput('');
    const [description, onChangeDescription, setDescription] = useInput('');

    if (!meData)
    {
        redirect('/login');
    };

    const { mutate } = useMutation({
        mutationFn: fetchCreateRoom,
        onSuccess: () =>
        {
            queryClient.invalidateQueries(queryKey.GET_ROOMS);
            router.push('/');
        }
    });

    const onCreateRoom = useCallback((e: React.MouseEvent<HTMLButtonElement>) =>
    {
        if (!name || !description) return;
        mutate({ name, description } as CreateRoomParams);
    }, [name, description, mutate]);

    return (
        <div className="flex flex-col gap-2">
            <h1>채팅방 정보</h1>
            <input className="border-[1px] border-gray-200 rounded px-4 py-2" placeholder="이름" type="text" value={name} onChange={onChangeName} />
            <input className="border-[1px] border-gray-200 rounded px-4 py-2" placeholder="설명" type="text" value={description} onChange={onChangeDescription} />
            <button className="bg-primary1 text-white rounded px-4 py-2" onClick={onCreateRoom}>개설</button>
        </div>
    );
}

export default RoomCreateForm;
