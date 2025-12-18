'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft, GraduationCap, Check } from 'lucide-react';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-[#F9FAFC] flex flex-col items-center justify-center px-6 overflow-hidden">
            
            {/* --- EVARA AMBIENT MESH --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5FA8FF]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#B9A8FF]/10 rounded-full blur-[120px]" />
            </div>

            {/* --- MAIN CONTENT CARD --- */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center"
            >
                {/* Success Icon Visualization */}
                <div className="relative flex justify-center mb-10">
                    {/* Pulsing Rings */}
                    <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[#5FA8FF]/20 rounded-full blur-xl"
                    />
                    
                    <div className="relative">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 border border-dashed border-[#B9A8FF]/30 rounded-full"
                        />
                        
                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                            >
                                <Check size={48} strokeWidth={3} />
                            </motion.div>
                        </div>

                        {/* Floating Sparkles */}
                        <motion.div 
                            animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-2 -right-4 text-[#B9A8FF]"
                        >
                            <Sparkles size={24} fill="currentColor" />
                        </motion.div>
                    </div>
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-4">
                        You're in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">Circle.</span>
                    </h1>
                    <p className="text-[#64748B] font-medium leading-relaxed mb-10">
                        Thank you for joining EVARA. We’re preparing the campus for your first unfiltered conversation. Stay tuned!
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/")}
                    className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </motion.button>

                {/* Footer Brand Verification */}
                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[#94A3B8]">
                        <GraduationCap size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em]">EVARA verified student</span>
                </div>
            </motion.div>

            {/* Huge decorative ghost text in background */}
            <div className="fixed -bottom-10 -right-10 text-[20vw] font-black text-slate-200/20 select-none pointer-events-none tracking-tighter">
                EVARA
            </div>
        </div>
    );
}