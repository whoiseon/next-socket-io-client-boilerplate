import HydrateRoomHeader from '@/components/hydrate/HydrateRoomHeader';

export default function RoomPage({
  params: { roomCode },
}: {
  params: { roomCode: string };
}) {
  console.log(roomCode);
  return (
    <div className="flex flex-col">
      <HydrateRoomHeader roomCode={roomCode} />
      <div className="flex flex-1"></div>
    </div>
  );
}
