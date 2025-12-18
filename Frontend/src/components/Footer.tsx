'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Facebook, SendIcon, GraduationCap } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function FooterSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY!,
            subject: 'New Newsletter Subscriber',
            from_name: 'EVARA Newsletter',
            email,
        };

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push('/thanku');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Newsletter error:', error);
            alert('Submission failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B9A8FF] opacity-[0.02] blur-[120px]" />
            
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white">
                                <GraduationCap size={20} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#0F172A]">EVARA</span>
                        </div>
                        <p className="text-lg text-[#64748B] max-w-md leading-relaxed mb-8">
                            Creating a safe, calm, and genuine space for students to connect beyond campus boundaries. No pressure, just vibes.
                        </p>
                        <div className="flex space-x-3">
                            {[
                                { icon: <BsTwitterX size={18} />, link: "#" },
                                { icon: <Instagram size={18} />, link: "#" },
                                { icon: <Facebook size={18} />, link: "#" }
                            ].map((social, i) => (
                                <Link 
                                    key={i} 
                                    href={social.link}
                                    className="w-11 h-11 flex items-center justify-center rounded-2xl border border-slate-100 text-[#64748B] hover:text-[#5FA8FF] hover:border-[#5FA8FF]/30 hover:bg-slate-50 transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Group */}
                    <div className="lg:col-span-3 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-widest mb-6">Explore</h4>
                            <ul className="space-y-4 text-[#64748B] font-medium">
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Safety</Link></li>
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Guidelines</Link></li>
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Support</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-widest mb-6">Legal</h4>
                            <ul className="space-y-4 text-[#64748B] font-medium">
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Terms</Link></li>
                                <li><Link href="#" className="hover:text-[#5FA8FF] transition-colors">Cookies</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 bg-[#F9FAFC] p-8 rounded-[2.5rem] border border-slate-100">
                        <h4 className="text-xl font-bold text-[#0F172A] mb-2">Stay in the loop</h4>
                        <p className="text-[#64748B] text-sm mb-6 leading-relaxed">Join our student community for updates on new campus launches.</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your-college-email@edu"
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8FF]/20 focus:border-[#5FA8FF] transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1e293b] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                {loading ? 'Subscribing...' : 'Join Newsletter'}
                                <SendIcon size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#94A3B8] text-sm font-medium">
                        © {new Date().getFullYear()} EVARA. Designed with love for the next generation.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                        <span className="text-xs font-bold text-[#64748B] uppercase tracking-tighter">System Status: All systems go</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}