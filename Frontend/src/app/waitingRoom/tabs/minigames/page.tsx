'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Play, Trophy, Clock } from 'lucide-react';
import retroGames from '@/Data/Games';

const MiniGamesSection = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const GameCard = ({ game, badge }: { game: any, badge?: string }) => (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(95,168,255,0.1)] transition-all duration-500"
        >
            <Link href={`/waitingRoom/tabs/minigames/games?game=${game.id}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {/* Badge */}
                    {badge && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 shadow-sm flex items-center gap-1.5">
                            <Sparkles size={12} className="text-[#B9A8FF]" />
                            <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">{badge}</span>
                        </div>
                    )}

                    {/* Image */}
                    <Image
                        src={game.imgUrl}
                        alt={game.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-[#5FA8FF]" />
                                <span className="text-xs font-medium">3 min play</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#5FA8FF] flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <Play size={18} fill="white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-[#0F172A] text-lg leading-tight group-hover:text-[#5FA8FF] transition-colors">
                            {game.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-1">Arcade Classic</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#B9A8FF]/10 group-hover:text-[#B9A8FF] transition-all">
                        <Trophy size={16} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <div className="min-h-screen min-w-full bg-[#F9FAFC] pt-12 md:pt-20 px-6 lg:px-12 pb-20">
            {/* Header Area */}
            <div className=" mx-auto mb-16">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-[#5FA8FF]/10 text-[#5FA8FF]">
                                <Gamepad2 size={20} />
                            </div>
                            <span className="text-xs font-bold text-[#5FA8FF] uppercase tracking-[0.2em]">The Arcade</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
                            Play While You <span className="text-[#B9A8FF]">Wait.</span>
                        </h1>
                    </div>
                    <p className="text-[#64748B] text-lg max-w-sm font-medium leading-relaxed">
                        Beat high scores, pass the time, and keep the vibes chill until your match arrives.
                    </p>
                </motion.div>
            </div>

            {/* Featured Section */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className=" mx-auto mb-20"
            >
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-xl font-bold text-[#0F172A]">Featured Games</h2>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {retroGames.slice(0, 3).map((game) => (
                        <GameCard key={game.id} game={game} badge="Featured" />
                    ))}
                </div>
            </motion.div>

            {/* Trending Section with different grid logic */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className=" mx-auto"
            >
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-xl font-bold text-[#0F172A]">Trending Now</h2>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {retroGames.slice(3).map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </motion.div>

            {/* Background Accent */}
            <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#5FA8FF] opacity-[0.03] blur-[120px] pointer-events-none" />
        </div>
    );
};

export default MiniGamesSection;