// app/waiting-room/layout.tsx
import Sidebar from '@/components/Sidebar';

export default function WaitingRoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <Sidebar children={children} />

    );
}