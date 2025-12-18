"use client";
import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        id: 1,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/e_background_removal/f_png/v1746440859/Rectangle_2_2_cdhpil.png',
        title: 'Profile Assumptions',
        description: 'Discover how you come across. Let others share their first impressions through safe, anonymous feedback.',
        size: 'md:col-span-2', // Large wide card
        color: 'from-[#5FA8FF]/20',
        tag: 'Social'
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746441810/Rectangle_2_4_-removebg-preview_kuvsyq.png',
        title: 'Self Discovery',
        description: 'A private space for your true self.',
        size: 'md:col-span-1', // Small card
        color: 'from-[#B9A8FF]/20',
        tag: 'Personal'
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746441808/Rectangle_2-removebg-preview_p6h3wu.png',
        title: 'Anonymous Video Chat',
        description: 'Face-to-face connection with total privacy. Masks, blurs, and safety first.',
        size: 'md:col-span-1', // Small card
        color: 'from-[#B9A8FF]/20',
        tag: 'Live'
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/e_background_removal/f_png/v1746440860/Rectangle_2_1_q3vdzo.png',
        title: 'Private Messaging',
        description: 'Keep the conversation going. Reveal your identity only when you feel the vibe is right.',
        size: 'md:col-span-2', // Large wide card
        color: 'from-[#5FA8FF]/20',
        tag: 'Secure'
    }
];

export default function ExperienceSection() {
    return (
        <section className="relative py-24 bg-[#F9FAFC] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#B9A8FF] opacity-[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#5FA8FF] opacity-[0.03] blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight mb-6"
                    >
                        It’s a Whole <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">Experience.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-[#64748B] font-medium leading-relaxed"
                    >
                        Think it’s just random? Think again. Evara is designed to be real, raw, and effortlessly fun.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(95,168,255,0.1)] transition-all duration-500 ${exp.size}`}
                        >
                            {/* Inner Gradient Glow */}
                            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${exp.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative p-8 z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-[#64748B] text-[10px] font-bold uppercase tracking-widest mb-4 border border-slate-100">
                                    {exp.tag}
                                </span>
                                <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#5FA8FF] transition-colors">{exp.title}</h3>
                                <p className="text-[#64748B] text-md leading-relaxed max-w-xs">{exp.description}</p>
                            </div>

                             <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA / Mood line */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full border border-slate-100 shadow-sm">
                        <span className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br ${i === 2 ? 'from-[#B9A8FF] to-[#5FA8FF]' : 'from-[#5FA8FF] to-[#B9A8FF]'}`} />
                            ))}
                        </span>
                        <p className="text-sm font-semibold text-[#0F172A]">Join 5,000+ students exploring Evara today</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}