"use client";
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What exactly is EVARA?",
        answer: "EVARA is a calm, anonymous connection space built exclusively for college students. Think of it as a safe way to meet peers beyond your immediate circle, where conversations are protected, and vibes are verified."
    },
    {
        question: "How is EVARA different from Omegle or other chat apps?",
        answer: "Traditional chat apps are often chaotic and unsafe. EVARA is 'wellness-first.' We use verified campus filters, AI-moderation to block toxicity, and a 'Chill Rating' system that rewards kind, genuine human connection."
    },
    {
        question: "Is it really only for college students?",
        answer: "Yes. To keep the community safe and relevant, we use campus-based verification. This ensures you're talking to actual students who share the same world—midterms, campus life, and student struggles."
    },
    {
        question: "How does anonymity work here?",
        answer: "You start 100% anonymous. No names, no profiles. As the conversation progresses and trust builds, you can choose to stay anonymous or move the chat into a more personal space. You are always in control of your identity."
    },
    {
        question: "What is the 'Assumption' or 'Vibe Check' system?",
        answer: "After a chat, instead of toxic comments, students leave 'Vibe Tags' like 'Great Listener' or 'Hilarious.' These build your reputation on the app as a high-quality human, helping you match with other great people."
    },
    {
        question: "Is it safe? How do you stop creepers?",
        answer: "Safety is our DNA. Our AI monitors for harassment, nudity, and self-harm in real-time. If someone breaks the 'Vibe Code,' they are instantly flagged and removed. You can also skip or report anyone with a single tap."
    },
    {
        question: "Does EVARA use my data?",
        answer: "Never. Your chats are private and encrypted. We don't sell student data to advertisers. Our goal is connection, not data collection."
    }
];

export default function FnQsection() {
    return (
        <section className="relative py-24 bg-[#F9FAFC] overflow-hidden">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#B9A8FF] opacity-[0.03] blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5FA8FF] opacity-[0.03] blur-[100px]" />

            <div className="relative max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4"
                    >
                        Got <span className="text-[#5FA8FF]">Questions?</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-[#64748B] font-medium"
                    >
                        Everything you need to know about the EVARA experience.
                    </motion.p>
                </div>

                {/* Accordion List */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`}
                                className="bg-white border border-slate-100 rounded-[1.5rem] px-6 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] overflow-hidden"
                            >
                                <AccordionTrigger className="text-left text-[#0F172A] font-bold text-lg md:text-xl hover:no-underline hover:text-[#5FA8FF] py-6 transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#64748B] text-md md:text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Support Footer */}
                <div className="mt-16 text-center">
                    <p className="text-[#94A3B8] text-sm">
                        Still curious? <a href="mailto:support@evara.app" className="text-[#5FA8FF] font-bold border-b border-[#5FA8FF]/30 hover:border-[#5FA8FF] transition-all">Send us a message</a>
                    </p>
                </div>
            </div>
        </section>
    );
}