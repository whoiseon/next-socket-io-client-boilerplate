import ChatTextArea from '@/components/ChatTextArea';
import HydrateChatBox from '@/components/hydrate/HydrateChatBox';
import HydrateRoomHeader from '@/components/hydrate/HydrateRoomHeader';

export default function RoomPage({
  params: { roomCode },
}: {
  params: { roomCode: string };
}) {
  return (
    <div className="flex flex-col h-full">
      <HydrateRoomHeader roomCode={roomCode} />
      <HydrateChatBox roomCode={roomCode} />
    </div>
  );
}
