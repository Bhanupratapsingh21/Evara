'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Heart, GraduationCap } from 'lucide-react';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-[#F9FAFC] flex flex-col items-center justify-center px-6 overflow-hidden">
            
            {/* --- EVARA AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#B9A8FF]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5FA8FF]/10 rounded-full blur-[120px]" />
            </div>

            {/* --- MAIN CONTENT CARD --- */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center"
            >
                {/* Animated Success Icon */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-[#B9A8FF]"
                        >
                            <Sparkles size={24} fill="currentColor" />
                        </motion.div>
                        
                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                            <Heart size={40} fill="white" strokeWidth={0} />
                        </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tighter mb-4">
                        You're in the <span className="text-[#5FA8FF]">Circle.</span>
                    </h1>
                    <p className="text-[#64748B] font-medium leading-relaxed mb-10">
                        Thanks for joining the EVARA community. We're busy setting the vibe for your campus. Stay tuned for something special.
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/")}
                    className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Campus
                </motion.button>

                {/* Footer Brand */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-[#94A3B8]">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                        <GraduationCap size={14} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">EVARA verified</span>
                </div>
            </motion.div>

            {/* Decorative Background Element */}
            <div className="fixed bottom-10 right-10 text-[15vw] font-black text-slate-200 opacity-[0.03] select-none pointer-events-none">
                EVARA
            </div>
        </div>
    );
}