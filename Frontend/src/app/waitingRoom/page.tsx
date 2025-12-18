'use client';
import { useAppSelector } from '@/store/hooks';
import { Gamepad2, Users, ArrowRight, Sparkles, LayoutGrid, Radio } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WaitingRoom() {
    const router = useRouter();
    const { position, waiting, online } = useAppSelector(s => s.socket);

    return (
        <div className="relative min-h-screen bg-[#F9FAFC] overflow-hidden flex flex-col items-center justify-center px-6">

            {/* Liquid Mesh Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#5FA8FF]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#B9A8FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

                {/* Status Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5FA8FF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5FA8FF]"></span>
                        </span>
                        <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">{online || 0} Peers Active</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight"
                    >
                        Finding your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">vibe...</span>
                    </motion.h1>
                    <p className="text-[#64748B] text-lg max-w-md mx-auto leading-relaxed">
                        We're matching you with someone interesting. Take a breath and enjoy the campus.
                    </p>
                </div>

                {/* Pulsing Queue Indicator */}
                <div className="relative w-max mb-16">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[#5FA8FF] rounded-full blur-2xl"
                    />
                    <div className="relative bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(59,130,246,0.08)] border border-slate-100/80 flex flex-col items-center justify-center gap-3 min-w-[180px] hover:shadow-[0_15px_50px_rgba(59,130,246,0.12)] transition-shadow duration-300">
                        <div className="flex items-center gap-2">
                            <Radio className="text-[#3B82F6] animate-pulse" size={16} />
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Position</span>
                        </div>

                        <div className="text-center">
                            <span className="text-4xl font-black text-[#1E293B] block leading-none">
                                {waiting ? position : '1'}
                            </span>
                            <span className="text-sm font-medium text-[#64748B] tracking-tight mt-1">
                                In Queue
                            </span>
                        </div>
                    </div>
                </div>

                {/* Activity Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">

                    {/* Mini Games Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => router.push("/waitingRoom/tabs/minigames")}
                        className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col items-center text-center"
                    >
                        <div className="w-full aspect-[16/10] relative mb-6 rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100">
                            <Image
                                fill
                                alt='Minigames'
                                className='object-cover group-hover:scale-105 transition-transform duration-500'
                                src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746624613/Frame_22_1_zv9xvj.png"
                            />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Gamepad2 size={18} className="text-[#5FA8FF]" />
                            <h3 className="font-bold text-[#0F172A]">Mini Games</h3>
                        </div>
                        <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                            Kill time with quick challenges while we find your match.
                        </p>
                    </motion.div>

                    {/* Uni Space Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => router.push("/waitingRoom/tabs/unispace")}
                        className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl hover:shadow-purple-500/5 transition-all flex flex-col items-center text-center"
                    >
                        <div className="w-full aspect-[16/10] relative mb-6 rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100">
                            <Image
                                fill
                                alt='Uni Space'
                                className='object-cover group-hover:scale-105 transition-transform duration-500'
                                src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746624613/Frame_22_2_b3vjav.png"
                            />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <LayoutGrid size={18} className="text-[#B9A8FF]" />
                            <h3 className="font-bold text-[#0F172A]">Uni Circle</h3>
                        </div>
                        <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                            See what's happening on your campus specifically.
                        </p>
                    </motion.div>

                </div>

                {/* Footer Insight */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 flex items-center gap-3 text-[#B9A8FF] bg-white px-6 py-3 rounded-full border border-slate-50 shadow-sm"
                >
                    <Sparkles size={16} />
                    <p className="text-xs font-bold uppercase tracking-widest">
                        Assume nothing. Chat everything.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}