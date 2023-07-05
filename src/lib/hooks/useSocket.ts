import { useCallback } from 'react';
import { Socket, io } from 'socket.io-client';

const baseUrl: string = 'http://localhost:3060';

const sockets: { [key: string]: Socket } = {};
export default function useSocket(
  roomCode?: string,
): [Socket | undefined, () => void] {
  const disconnect = useCallback(() => {
    if (roomCode) {
      sockets[roomCode].disconnect();
      delete sockets[roomCode];
      console.log(sockets);
    }
  }, [roomCode]);

  if (!roomCode) {
    return [undefined, disconnect];
  }

  if (!sockets[roomCode]) {
    sockets[roomCode] = io(`${baseUrl}/ws-${roomCode}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[roomCode], disconnect];
}
