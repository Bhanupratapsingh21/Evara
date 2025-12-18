'use client';
import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BurstStatus from '@/types/BurstStatus';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Quote, Star } from 'lucide-react';

type CardData = {
    id: string;
    quote: string;
    author: string;
    stars: number;
    x: number;
    y: number;
    isBurst: BurstStatus;
};

export default function CardsPage() {
    const [cards, setCards] = useState<CardData[]>([]);
    const user = useAppSelector((state) => state.user.accessToken);
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
            toast.error('Session expired. Please sign in.');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchAllFeedbacks = async () => {
            try {
                if (!user) return;
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/get-feedback`, {
                    headers: { Authorization: `Bearer ${user}` }
                });
                const data = res.data;

                if (data.success && Array.isArray(data.data)) {
                    const canvasSize = 2500; // Larger world
                    const mapCards = data.data.slice(0, 40).map((item: any) => ({
                        id: item._id,
                        quote: item.comment,
                        stars: item.rating,
                        isBurst: item.isBurst === 'true' ? BurstStatus.TRUE : BurstStatus.FALSE,
                        x: Math.random() * (canvasSize - 300),
                        y: Math.random() * (canvasSize - 200),
                    }));
                    setCards(mapCards);
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchAllFeedbacks();
    }, [user]);

    const handleBurst = async (cardId: string) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/burst-feedback`, 
                { id: cardId },
                { headers: { Authorization: `Bearer ${user}` } }
            );
            setCards((prev) =>
                prev.map((card) => card.id === cardId ? { ...card, isBurst: BurstStatus.TRUE } : card)
            );
            toast.success("Assumption cleared!");
        } catch (err) {
            toast.error("Couldn't burst this vibe.");
        }
    };

    return (
        <div className="w-screen h-screen bg-[#F9FAFC] overflow-hidden">
            {/* Header Overlay */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-slate-100 shadow-sm flex items-center gap-3">
                    <Sparkles className="text-[#5FA8FF]" size={18} />
                    <span className="text-[#0F172A] font-bold tracking-tight">The Vibe Canvas</span>
                    <span className="text-[#64748B] text-xs font-medium border-l pl-3">Zoom to explore assumptions</span>
                </div>
            </div>

            <TransformWrapper
                initialScale={0.8}
                centerOnInit
                minScale={0.4}
                maxScale={2}
                wheel={{ step: 0.1 }}
            >
                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    <div className="relative bg-[#F9FAFC]" style={{ width: 2500, height: 2500 }}>
                        
                        {/* Organic Background Blobs */}
                        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-[#5FA8FF]/5 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[20%] right-[15%] w-[800px] h-[800px] bg-[#B9A8FF]/5 rounded-full blur-[150px]" />

                        <AnimatePresence>
                            {cards.map((card) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ 
                                        opacity: card.isBurst === BurstStatus.TRUE ? 0.3 : 1, 
                                        scale: 1,
                                        filter: card.isBurst === BurstStatus.TRUE ? 'blur(4px)' : 'blur(0px)'
                                    }}
                                    className="absolute"
                                    style={{ left: card.x, top: card.y }}
                                >
                                    <div className={`relative group w-[280px] p-6 rounded-[2rem] transition-all duration-500 border
                                        ${card.isBurst === BurstStatus.TRUE 
                                            ? 'bg-slate-100 border-transparent shadow-none grayscale' 
                                            : 'bg-white border-slate-50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(95,168,255,0.12)] hover:-translate-y-2'
                                        }`}
                                    >
                                        {/* Icon Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded-xl ${card.isBurst === BurstStatus.TRUE ? 'bg-slate-200' : 'bg-[#5FA8FF]/10 text-[#5FA8FF]'}`}>
                                                <Quote size={16} fill={card.isBurst === BurstStatus.TRUE ? 'none' : 'currentColor'} />
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={12} 
                                                        className={i < card.stars ? "text-[#B9A8FF] fill-[#B9A8FF]" : "text-slate-100 fill-slate-100"} 
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quote Text */}
                                        <p className="text-[#0F172A] font-bold text-lg leading-snug mb-2 tracking-tight">
                                            "{card.quote}"
                                        </p>
                                        <p className="text-[#64748B] text-xs font-semibold uppercase tracking-widest opacity-60 mb-6">
                                            — Anonymous Student
                                        </p>

                                        {/* Action Button */}
                                        {card.isBurst === BurstStatus.FALSE && (
                                            <motion.button 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleBurst(card.id)}
                                                className="w-full py-3 bg-[#5FA8FF] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group/btn transition-all"
                                            >
                                                <Wind size={16} className="group-hover/btn:animate-pulse" />
                                                Burst Assumption
                                            </motion.button>
                                        )}

                                        {/* Burst Sparkle Effect Overlay */}
                                        {card.isBurst === BurstStatus.TRUE && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                                <Sparkles size={48} className="text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </TransformComponent>
            </TransformWrapper>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
    );
}