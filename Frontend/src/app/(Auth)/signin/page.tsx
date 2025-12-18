"use client"
import { useRef, useEffect, useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiShield } from 'react-icons/fi';
import { GraduationCap, Zap, ArrowRight } from 'lucide-react';
import calculatePasswordStrength from '@/lib/PasswordStrength';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
    const floatingRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 
    const [showPassword, setShowPassword] = useState(false);
    
    const passwordStrength = calculatePasswordStrength(password);
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/waitingRoom");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/login`;
            const res = await axios.post(apiUrl, { email, password });
            
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            dispatch(setUser({
                accessToken: res.data.data.accessToken,
                user: res.data.data.user,
            }));
            
            toast.success('Welcome back to Evara!');
            router.push('/waitingRoom');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    // Vibe Tags for the Hero Side
    const VibeTag = ({ text, delay, position }: { text: string, delay: number, position: string }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0] 
            }}
            transition={{ 
                delay, 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className={`absolute ${position} px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full shadow-sm flex items-center gap-2 z-20`}
        >
            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
            <span className="text-sm font-bold text-[#64748B]">{text}</span>
        </motion.div>
    );

    return (
        <div className="min-h-screen w-full bg-[#F9FAFC] flex flex-col md:flex-row overflow-hidden">
            {/* Left Side: The Visual Brand Experience */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-screen bg-white flex items-center justify-center overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#5FA8FF]/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#B9A8FF]/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-center px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6"
                    >
                        <FiShield className="text-[#5FA8FF]" size={14} />
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Safe & Verified</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight"
                    >
                        Your Campus, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">Without the Noise.</span>
                    </motion.h1  >
                    <p className="mt-4 text-[#64748B] text-lg max-w-sm mx-auto">
                        Connect with students authentically. Set the record straight on those assumptions.
                    </p>
                </div>

                {/* Floating Vibe Tags */}
                <VibeTag text="Verified Student" delay={0} position="top-[20%] left-[15%]" />
                <VibeTag text="No Pressure" delay={1} position="top-[40%] right-[10%]" />
                <VibeTag text="Anonymous" delay={2} position="bottom-[25%] left-[20%]" />
                <VibeTag text="Safe Space" delay={1.5} position="bottom-[40%] right-[15%]" />

                {/* Main Visual Logo Illustration */}
                <motion.div 
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-64 h-64 bg-gradient-to-br from-[#5FA8FF]/5 to-[#B9A8FF]/5 rounded-[3rem] border border-white/50 z-0"
                />
            </div>

            {/* Right Side: The Clean Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white">
                                <GraduationCap size={20} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#0F172A]">EVARA</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back</h2>
                        <p className="text-[#64748B] font-medium">Please enter your student credentials to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#0F172A] ml-1">Student Email</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5FA8FF] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                    placeholder="name@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-[#0F172A]">Password</label>
                                <Link href="#" className="text-xs font-bold text-[#5FA8FF] hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5FA8FF] transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            
                            {/* Modern Password Strength */}
                            <AnimatePresence>
                                {password.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex gap-1 mt-2 px-1"
                                    >
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                                    i <= passwordStrength 
                                                    ? (passwordStrength <= 2 ? 'bg-[#F87171]' : passwordStrength === 3 ? 'bg-amber-400' : 'bg-[#4ADE80]') 
                                                    : 'bg-slate-100'
                                                }`}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0F172A] hover:bg-[#1e293b] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Log In to Evara
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-[#64748B] font-medium">
                            Don't have an account?{' '}
                            <Link
                                href='/signup'
                                className="text-[#5FA8FF] hover:text-[#4e96ed] font-bold transition-colors"
                            >
                                Join the community
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}