import RoomCreateForm from "@/components/RoomCreateForm";

export default async function RoomCreatePage({
    params: { roomCode },
}: {
    params: { roomCode: string; };
})
{
    return (
        <div className="flex flex-1 flex-col h-full items-center justify-center">
            <RoomCreateForm />
        </div>
    );
}
