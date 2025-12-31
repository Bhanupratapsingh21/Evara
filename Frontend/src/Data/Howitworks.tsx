import React from 'react';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

const cards = [
    {
        icon: (
            <div className="w-12 h-12 rounded-2xl bg-[#5FA8FF]/10 flex items-center justify-center text-[#5FA8FF]">
                <ShieldCheck size={28} strokeWidth={2} />
            </div>
        ),
        title: "Verified Student Circle",
        description: "Join using your .edu email. We keep it exclusive to real students, ensuring a bot-free campus experience."
    },
    {
        icon: (
            <div className="w-12 h-12 rounded-2xl bg-[#B9A8FF]/10 flex items-center justify-center text-[#B9A8FF]">
                <Zap size={28} strokeWidth={2} />
            </div>
        ),
        title: "Instant Vibe Matching",
        description: "Skip the swiping. Get paired instantly with peers for raw, anonymous conversations that actually matter."
    },
    {
        icon: (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5FA8FF]/20 to-[#B9A8FF]/20 flex items-center justify-center text-[#5FA8FF]">
                <Sparkles size={28} strokeWidth={2} />
            </div>
        ),
        title: "The Vibe Check",
        description: "Share your first impressions. Build your peer reputation through positive 'Vibe Tags' and assumptions."
    }
];

export default cards;