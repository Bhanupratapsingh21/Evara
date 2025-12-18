"use client";
import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Heart, Zap, Globe } from 'lucide-react';

type MatchDialogProps = {
    open: boolean;
    onClose: () => void;
    user: { name: string };
    peerInfo: { userName: string };
};

export default function MatchDialog({ open, onClose, peerInfo }: MatchDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#F9FAFC] border-none rounded-[3rem] shadow-2xl">
                <VisuallyHidden>
                    <DialogTitle>Connection Found</DialogTitle>
                </VisuallyHidden>

                <div className="min-h-[550px] flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden">
                    
                    {/* --- EVARA AMBIENT BACKGROUND --- */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5FA8FF]/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#B9A8FF]/10 rounded-full blur-[100px]" />
                    </div>

                    {/* --- CONTENT --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-20 mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-100 shadow-sm mb-4">
                            <Sparkles size={14} className="text-[#B9A8FF]" />
                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">New Connection Found</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter mb-2">
                            It’s a <span className="text-[#5FA8FF]">Match!</span>
                        </h1>
                        <p className="text-[#64748B] font-medium text-lg">
                            Say hi to <span className="text-[#0F172A] font-bold">@{peerInfo?.userName || 'Anonymous'}</span>
                        </p>
                    </motion.div>

                    {/* --- COSMIC SYNC VISUAL --- */}
                    <div className="relative w-[300px] h-[300px] flex items-center justify-center z-10">
                        
                        {/* Pulsing Orbit Rings */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-[1.5px] border-dashed border-[#5FA8FF]/30 rounded-full"
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-[1.5px] border-dashed border-[#B9A8FF]/30 rounded-full"
                        />
                        
                        {/* Central Glow */}
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-40 h-40 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] rounded-full blur-3xl opacity-30"
                        />

                        {/* User Avatar (Squircular) */}
                        <motion.div 
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: -40, opacity: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="absolute z-30"
                        >
                            <div className="p-1 rounded-[2rem] bg-gradient-to-tr from-[#5FA8FF] to-white shadow-xl">
                                <div className="w-20 h-20 rounded-[1.8rem] bg-white overflow-hidden border-4 border-white">
                                    <Image
                                        src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                                        alt="You" width={80} height={80} className="object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Peer Avatar (Squircular) */}
                        <motion.div 
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 40, opacity: 1 }}
                            transition={{ type: "spring", delay: 0.3 }}
                            className="absolute z-30"
                        >
                            <div className="p-1 rounded-[2rem] bg-gradient-to-tr from-[#B9A8FF] to-white shadow-xl">
                                <div className="w-20 h-20 rounded-[1.8rem] bg-white overflow-hidden border-4 border-white">
                                    <Image
                                        src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png"
                                        alt="Peer" width={80} height={80} className="object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Orbit Icons */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#5FA8FF]"
                        >
                            <MessageCircle size={20} />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                            className="absolute bottom-4 right-10 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#B9A8FF]"
                        >
                            <Heart size={20} fill="currentColor" />
                        </motion.div>

                        <motion.div 
                            animate={{ x: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-amber-400"
                        >
                            <Zap size={20} fill="currentColor" />
                        </motion.div>
                    </div>

                    {/* --- FOOTER HINT --- */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex items-center gap-2 text-[#64748B] font-bold text-sm tracking-tight"
                    >
                        <Globe size={16} className="text-[#4ADE80]" />
                        Connecting Securely...
                    </motion.div>

                </div>
                
                {/* Visual Bottom Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-[#5FA8FF] via-[#B9A8FF] to-[#5FA8FF] opacity-20" />
            </DialogContent>
        </Dialog>
    );
}