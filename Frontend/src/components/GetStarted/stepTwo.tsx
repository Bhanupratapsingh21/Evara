"use client";
import { Code, Paintbrush, Music, Film, Tv, BookOpen, Coffee, Camera, Gamepad2, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const interestsList = [
    { id: 'tech', name: 'Technology', icon: Code },
    { id: 'creative', name: 'Art & Design', icon: Paintbrush },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'movies', name: 'Cinema', icon: Film },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'fitness', name: 'Fitness', icon: Dumbbell },
    { id: 'coffee', name: 'Coffee', icon: Coffee },
    { id: 'photo', name: 'Photography', icon: Camera },
];

export default function StepTwo({ selectedInterests, toggleInterest }: any) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">What are you into?</h1>
            <p className="text-[#64748B] mb-10 max-w-md mx-auto">Pick at least 2 topics. This helps EVARA skip the awkward small talk.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {interestsList.map(({ id, name, icon: Icon }) => {
                    const active = selectedInterests.includes(id);
                    return (
                        <motion.button
                            key={id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleInterest(id)}
                            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                                active 
                                ? 'border-[#5FA8FF] bg-white shadow-xl shadow-blue-500/10' 
                                : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                active ? 'bg-[#5FA8FF] text-white' : 'bg-slate-50 text-[#64748B]'
                            }`}>
                                <Icon size={24} />
                            </div>
                            <span className={`text-sm font-bold ${active ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>{name}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}