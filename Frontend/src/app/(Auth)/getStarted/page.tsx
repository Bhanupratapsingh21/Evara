"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles, Target, ArrowRight, ArrowLeft } from 'lucide-react';

// Components
import StepOne from '@/components/GetStarted/StepOne';
import StepTwo from '@/components/GetStarted/stepTwo';
import StepThree from '@/components/GetStarted/StepThree';

export default function InterestSelection() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [academicData, setAcademicData] = useState({ university: '', course: '', year: '' });
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state: RootState) => state.user.user);
    const _id = user?._id;

    useEffect(() => {
        if (!_id) router.push("/signup");
    }, [_id, router]);

    const handleAcademicChange = (field: string, value: string) => {
        setAcademicData(prev => ({ ...prev, [field]: value }));
    }

    const toggleInterest = (interestId: string) => {
        setSelectedInterests(prev =>
            prev.includes(interestId) ? prev.filter(id => id !== interestId) : [...prev, interestId]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        const yearOfStudy = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
        const yearIndex = yearOfStudy.indexOf(academicData.year);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}userProfile`, {
                userId: _id,
                college: academicData.university,
                yearOfStudy: yearIndex,
                interests: selectedInterests,
                connectionPreference: selectedOption
            });
            toast.success("Welcome to Evara!");
            router.push("/waitingRoom");
        } catch (error) {
            toast.error("Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    const isStepDisabled = () => {
        if (step === 1) return !academicData.university || !academicData.course || !academicData.year;
        if (step === 2) return selectedInterests.length < 2; // Encouraging more interests
        if (step === 3) return !selectedOption;
        return false;
    };

    return (
        <div className="relative min-h-screen bg-[#F9FAFC] flex flex-col items-center pt-24 pb-12 px-6">
            {/* Soft Background Mesh */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5FA8FF]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B9A8FF]/5 rounded-full blur-[120px]" />
            </div>

            {/* Progress Header */}
            <div className="relative z-10 w-full max-w-xl mb-12">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] flex items-center justify-center text-white">
                            {step === 1 && <GraduationCap size={16} />}
                            {step === 2 && <Sparkles size={16} />}
                            {step === 3 && <Target size={16} />}
                        </div>
                        <h2 className="font-bold text-[#0F172A]">
                            {step === 1 && "Academic Info"}
                            {step === 2 && "Personal Interests"}
                            {step === 3 && "Match Preference"}
                        </h2>
                    </div>
                    <span className="text-sm font-bold text-[#64748B]">Step {step} of 3</span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: "33%" }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]"
                    />
                </div>
            </div>

            {/* Step Content with Animation */}
            <div className="relative z-10 w-full max-w-3xl flex-1 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full"
                    >
                        {step === 1 && <StepOne academicData={academicData} handleAcademicChange={handleAcademicChange} />}
                        {step === 2 && <StepTwo selectedInterests={selectedInterests} toggleInterest={toggleInterest} />}
                        {step === 3 && <StepThree selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Actions */}
                <div className="mt-12 w-full max-w-md flex flex-col sm:flex-row gap-4">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="flex-1 py-4 px-6 rounded-2xl font-bold text-[#64748B] bg-white border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                    )}
                    <button
                        onClick={() => step === 3 ? handleSubmit() : setStep(s => s + 1)}
                        disabled={isStepDisabled() || loading}
                        className={`flex-[2] py-4 px-6 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg
                            ${isStepDisabled() 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                                : 'bg-[#0F172A] hover:bg-[#1e293b] active:scale-[0.98]'
                            }`}
                    >
                        {loading ? "Saving..." : step === 3 ? "Complete Profile" : "Continue"}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}