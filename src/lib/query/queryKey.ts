export const queryKey = {
  GET_ROOMS: ['rooms'],
  GET_ROOM_UNIQUE: (code: string) => ['room', code],
};
