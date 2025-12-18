"use client"
import React, { useRef, useEffect, useState } from 'react';
import { 
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle 
} from "@/components/ui/dialog"
import {
    InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot 
} from "@/components/ui/input-otp"
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheck, FiShield } from 'react-icons/fi';
import { GraduationCap, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import calculatePasswordStrength from '@/lib/PasswordStrength';
import axios from 'axios';
import { setUser } from '@/store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formError, setFormError] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
        setPasswordStrength(calculatePasswordStrength(val));
    };

    const sendOtp = async () => {
        setOtpLoading(true);
        setFormError('');
        try {
            const checkEmailUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/check-email`;
            await axios.post(checkEmailUrl, { email });

            const otpUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/request-otp`;
            const response = await axios.post(otpUrl, { email });
            if (response.data.success) {
                setOtpSent(true);
                toast.success('Check your email for the code');
            }
        } catch (error: any) {
            const msg = error?.response?.status === 409 ? 'This email is already on Evara' : 'Failed to send code';
            setFormError(msg);
            toast.error(msg);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otpSent) {
            if (password !== confirmPassword) { setFormError("Passwords don't match"); return; }
            await sendOtp();
            return;
        }

        setLoading(true);
        try {
            const signupUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/signup`;
            const res = await axios.post(signupUrl, { name, email, password, code: otp });
            
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            dispatch(setUser({ accessToken: res.data.data.accessToken, user: res.data.data.user }));
            toast.success('Welcome to the campus!');
            router.push("/getStarted");
        } catch (error: any) {
            setFormError(error?.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const VibeTag = ({ text, position }: { text: string, position: string }) => (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute ${position} hidden md:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-100 z-20`}
        >
            <div className="w-1.5 h-1.5 rounded-full bg-[#B9A8FF]" />
            <span className="text-xs font-bold text-[#64748B] tracking-wide">{text}</span>
        </motion.div>
    );

    return (
        <div className="min-h-screen w-full bg-[#F9FAFC] flex flex-col md:flex-row overflow-hidden">
            {/* --- Left Side: Hero Brand --- */}
            <div className="relative w-full md:w-1/2 h-[250px] md:h-screen bg-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#B9A8FF]/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#5FA8FF]/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-center px-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight"
                    >
                        Your Campus. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">Fully Unfiltered.</span>
                    </motion.h1>
                    <p className="mt-4 text-[#64748B] text-lg max-w-sm mx-auto font-medium leading-relaxed">
                        The conversations you’ve been missing are just a verified email away.
                    </p>
                </div>

                <VibeTag text="Verified Campus" position="top-[20%] right-[20%]" />
                <VibeTag text="Zero Toxicity" position="bottom-[30%] left-[15%]" />
                <VibeTag text="Fully Anonymous" position="top-[45%] left-[10%]" />
            </div>

            {/* --- Right Side: SignUp Form --- */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white shadow-sm">
                                <GraduationCap size={20} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#0F172A]">EVARA</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create Account</h2>
                        <p className="text-[#64748B] font-medium">Join thousands of students connecting daily.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#0F172A] ml-1 uppercase tracking-widest opacity-60">Username</label>
                            <div className="relative group">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5FA8FF] transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                    placeholder="How should we call you?"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#0F172A] ml-1 uppercase tracking-widest opacity-60">University Email</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5FA8FF] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                    placeholder="name@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0F172A] ml-1 uppercase tracking-widest opacity-60">Password</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0F172A] ml-1 uppercase tracking-widest opacity-60">Confirm</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Strength Indicator */}
                        <div className="flex gap-1 px-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= passwordStrength ? (passwordStrength <= 2 ? 'bg-red-400' : 'bg-[#5FA8FF]') : 'bg-slate-100'}`} />
                            ))}
                        </div>

                        {formError && <p className="text-red-500 text-xs text-center font-bold">{formError}</p>}

                        <button
                            type="submit"
                            disabled={loading || otpLoading}
                            className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
                        >
                            {otpLoading ? 'Sending Security Code...' : (
                                <>
                                    Join the Campus
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[#64748B] font-medium">
                        Already a member? <Link href="/signin" className="text-[#5FA8FF] font-bold hover:underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>

            {/* --- OTP Verification Dialog --- */}
            <Dialog open={otpSent} onOpenChange={setOtpSent}>
                <DialogContent className="max-w-[400px] rounded-[2.5rem] p-10 border-none shadow-2xl">
                    <DialogHeader className="items-center text-center">
                        <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-[#5FA8FF] mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-[#0F172A]">Security Code</DialogTitle>
                        <DialogDescription className="text-[#64748B] font-medium">
                            Enter the 6-digit code we sent to <br /><span className="text-[#0F172A] font-bold">{email}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center space-y-8 py-4">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={0} />
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={1} />
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={2} />
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={3} />
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={4} />
                                <InputOTPSlot className="w-12 h-14 rounded-xl border-slate-200 text-xl font-bold focus:ring-[#5FA8FF]" index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-[#5FA8FF] hover:bg-[#4e96ed] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#5FA8FF]/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? 'Verifying...' : 'Complete Signup'}
                        </button>
                        
                        <button onClick={sendOtp} className="text-xs font-bold text-[#64748B] hover:text-[#5FA8FF] transition-colors">
                            Didn't get a code? Resend
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}