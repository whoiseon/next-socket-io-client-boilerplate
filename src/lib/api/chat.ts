const baseUrl = 'http://localhost:3060/api';

export async function fetchGetRooms() {
  const response = await fetch(`${baseUrl}/chat/public`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
}

export async function fetchGetRoomUnique(code: string) {
  const response = await fetch(`${baseUrl}/chat/public/room/${code}`);
  const data = await response.json();

  return data;
}
