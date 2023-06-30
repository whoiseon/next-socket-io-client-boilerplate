import ChatTextArea from '@/components/ChatTextArea';
import HydrateChatBox from '@/components/hydrate/HydrateChatBox';
import HydrateRoomHeader from '@/components/hydrate/HydrateRoomHeader';

export default function RoomPage({
  params: { roomCode },
}: {
  params: { roomCode: string };
}) {
  return (
    <div className="flex flex-1 flex-col">
      <HydrateRoomHeader roomCode={roomCode} />
      <HydrateChatBox roomCode={roomCode} />
    </div>
  );
}
