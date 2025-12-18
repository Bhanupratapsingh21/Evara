"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Data {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Propsofsection {
    title: string;
    description: string;
    Data: Data[];
}

const HowItWorksSection = ({ title, description, Data }: Propsofsection) => {
    // Stagger animation for the cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="relative bg-[#F9FAFC] py-20 md:py-28 px-6 overflow-hidden">
            {/* Soft Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-[#5FA8FF] opacity-[0.05] blur-[100px]" />
                <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-[#B9A8FF] opacity-[0.05] blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#5FA8FF] font-bold text-xs uppercase tracking-[0.2em] mb-4 block"
                    >
                        The Process
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6"
                    >
                        {title}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Interactive Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                >
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-12" />

                    {Data.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
                        >
                            {/* Step Indicator */}
                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center text-xs font-bold text-[#64748B] border-4 border-[#F9FAFC]">
                                0{index + 1}
                            </div>

                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container with Evara Gradient */}
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center justify-center text-[#5FA8FF] transition-transform duration-500 group-hover:scale-110">
                                        {/* Injecting sizing to the passed icon if possible, otherwise default */}
                                        <div className="w-8 h-8 flex items-center justify-center transition-colors group-hover:text-[#B9A8FF]">
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#5FA8FF] transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-[#64748B] text-md leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            {/* Decorative bottom flare */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] group-hover:w-1/2 transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className="text-sm font-medium text-[#94A3B8] inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                        Designed for anonymous & safe campus interactions
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;