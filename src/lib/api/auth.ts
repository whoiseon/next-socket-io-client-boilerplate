import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Tokens, User } from './types';

const baseUrl = 'http://localhost:3060/api';

interface LoginRequestParams {
  username: string;
  password: string;
}

export async function fetchGetMe() {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
  });

  if (!response.ok) return null;

  const data = (await response.json()) as User;

  return data;
}

export async function fetchGetMeOnServer(token: RequestCookie | undefined) {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as User;

  return data;
}

export async function fetchLogin(params: LoginRequestParams) {
  const response = await fetch(`${baseUrl}/auth/signin`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return data;
}

export async function fetchLogout() {
  const response = await fetch(`${baseUrl}/auth/signout`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
  });
}
