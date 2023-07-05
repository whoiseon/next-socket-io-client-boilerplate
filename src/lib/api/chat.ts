import { CreateRoomParams, User } from './types';

const baseUrl = 'http://localhost:3060/api';

export interface SendMessageParams
{
  userId: number;
  roomCode: string;
  content: string;
}

export async function fetchGetRooms()
{
  const response = await fetch(`${baseUrl}/chat/public`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
  });
  const data = await response.json();

  return data;
}

export async function fetchGetRoomUnique(code: string)
{
  const response = await fetch(`${baseUrl}/chat/public/room/${code}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const data = await response.json();

  return data;
}

export async function fetchGetRoomMessages(code: string)
{
  const response = await fetch(
    `${baseUrl}/chat/public/message?roomCode=${code}`,
    {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
    },
  );
  const data = await response.json();

  return data;
}

export async function fetchSendMessage(params: SendMessageParams)
{
  const response = await fetch(`${baseUrl}/chat/private/message`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return data;
}

export async function fetchCreateRoom(params: CreateRoomParams)
{
  const response = await fetch(`${baseUrl}/chat/private/create`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return data;
};
