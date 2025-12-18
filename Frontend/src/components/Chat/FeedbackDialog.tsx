"use client";
import React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Send, X, Smile, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackDialogProps {
    showFeedbackModal: boolean;
    setShowFeedbackModal: (value: boolean) => void;
    feedbackText: string;
    setFeedbackText: (value: string) => void;
    rating: number;
    setRating: (value: number) => void;
    user: { name: string };
    peerInfo: { userName: string };
    handleFeedbackSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
    showFeedbackModal,
    setShowFeedbackModal,
    feedbackText,
    setFeedbackText,
    rating,
    setRating,
    handleFeedbackSubmit,
    peerInfo
}) => {
    return (
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
            <DialogContent className="sm:max-w-[500px] border-none bg-[#F9FAFC] p-0 overflow-hidden rounded-[3rem] shadow-2xl">
                {/* Header Gradient Decoration */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#B9A8FF]/20 to-transparent pointer-events-none" />
                
                <div className="relative p-8 md:p-10">
                    <DialogHeader className="items-center text-center mb-8">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#B9A8FF] mb-4 border border-slate-100"
                        >
                            <Sparkles size={32} />
                        </motion.div>
                        <DialogTitle className="text-3xl font-black text-[#0F172A] tracking-tighter">
                            Vibe Check
                        </DialogTitle>
                        <DialogDescription className="text-[#64748B] font-medium text-lg">
                            Ready to share an impression of <span className="text-[#5FA8FF] font-bold">@{peerInfo.userName || 'your peer'}</span>?
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                        {/* Rating Logic */}
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Overall Energy</span>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2",
                                            star <= rating 
                                                ? "bg-white border-[#B9A8FF] text-[#B9A8FF] shadow-lg shadow-purple-500/10" 
                                                : "bg-slate-50 border-transparent text-slate-300"
                                        )}
                                    >
                                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Text Input Area */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 ml-2">
                                <MessageCircle size={14} className="text-[#5FA8FF]" />
                                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Your Assumption</label>
                            </div>
                            <div className="relative group">
                                <textarea
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    className="w-full min-h-[120px] p-5 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#5FA8FF]/5 focus:border-[#5FA8FF] transition-all text-[#0F172A] font-medium placeholder:text-slate-300 resize-none shadow-sm"
                                    placeholder="Guess a hobby, a secret talent, or just say they were chill..."
                                />
                                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 group-focus-within:text-[#5FA8FF]">
                                    {feedbackText.length}/200
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={!feedbackText.trim() || rating === 0}
                                className="w-full py-4 bg-[#0F172A] hover:bg-[#1e293b] text-white font-bold rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-30 disabled:grayscale"
                            >
                                Send Impression
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setShowFeedbackModal(false)}
                                className="w-full py-3 text-[#64748B] font-bold text-sm hover:text-[#0F172A] transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bottom Decor */}
                <div className="h-2 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] opacity-30" />
            </DialogContent>
        </Dialog>
    );
};

export default FeedbackDialog;