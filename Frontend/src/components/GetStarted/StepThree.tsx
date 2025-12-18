"use client";
import { ShieldCheck, Users, Zap, Globe, Shuffle } from 'lucide-react';

const options = [
    { id: 'same-uni', label: 'My University Only', desc: 'Keep it close to home', icon: Users },
    { id: 'same-major', label: 'Same Major Buddies', desc: 'Focus on your craft', icon: ShieldCheck },
    { id: 'diff-uni', label: 'Cross-Campus', desc: 'Meet students from everywhere', icon: Globe },
    { id: 'random', label: 'Universe Decides', desc: 'Totally random connection', icon: Shuffle },
];

export default function StepThree({ selectedOption, setSelectedOption }: any) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">Set your vibe</h1>
            <p className="text-[#64748B] mb-10 max-w-md mx-auto">Choose how you want to discover new people on campus.</p>

            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                {options.map((option) => {
                    const active = selectedOption === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`p-5 rounded-[1.5rem] border-2 text-left flex items-center gap-4 transition-all ${
                                active 
                                ? 'border-[#B9A8FF] bg-white shadow-lg shadow-purple-500/5' 
                                : 'border-slate-100 bg-white hover:border-slate-200'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                active ? 'bg-[#B9A8FF] text-white' : 'bg-slate-50 text-[#64748B]'
                            }`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className={`font-bold ${active ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>{option.label}</p>
                                <p className="text-xs text-slate-400 font-medium">{option.desc}</p>
                            </div>
                            {active && <div className="ml-auto w-3 h-3 rounded-full bg-[#B9A8FF]" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}