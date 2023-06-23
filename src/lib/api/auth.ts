const baseUrl = 'http://localhost:3060/api';

export async function fetchGetMe() {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
}
