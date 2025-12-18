"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldAlert, AlertCircle, Info, ChevronRight, Send, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportDialogProps {
  showReportModal: boolean;
  setShowReportModal: (value: boolean) => void;
  reasons: string[];
  selectedReason: string;
  setSelectedReason: (reason: string) => void;
  details: string;
  setDetails: (value: string) => void;
  user: { name: string };
  peerInfo: { userName: string };
  handleReportSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({
  showReportModal,
  setShowReportModal,
  reasons,
  selectedReason,
  setSelectedReason,
  details,
  setDetails,
  handleReportSubmit,
  peerInfo
}) => {
  return (
    <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
      <DialogContent className="sm:max-w-[520px] border-none bg-[#F9FAFC] p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">

        {/* Safety Header Decor */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#F87171]/10 to-transparent pointer-events-none" />

        <div className="relative p-8 md:p-10">
          <DialogHeader className="items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#F87171] mb-4 border border-red-50"
            >
              <ShieldAlert size={32} />
            </motion.div>

            <DialogTitle className="text-3xl font-black text-[#0F172A] tracking-tighter">
              Safety Report
            </DialogTitle>
            <DialogDescription className="text-[#64748B] font-medium leading-relaxed">
              We take campus safety seriously. Tell us what happened with <span className="text-[#0F172A] font-bold">@{peerInfo.userName}</span>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleReportSubmit} className="space-y-6">

            {/* Reason Selection Cards */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">What happened?</span>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {reasons.map((reason) => {
                  const isActive = selectedReason === reason;
                  return (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setSelectedReason(reason)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 group text-left",
                        isActive
                          ? "bg-white border-[#F87171] shadow-lg shadow-red-500/5"
                          : "bg-white border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-bold transition-colors",
                        isActive ? "text-[#F87171]" : "text-[#64748B]"
                      )}>
                        {reason}
                      </span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        isActive ? "border-[#F87171] bg-[#F87171]" : "border-slate-200"
                      )}>
                        {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Conditional Detail Input */}
            <AnimatePresence>
              {selectedReason && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 ml-2 mt-4">
                    <Info size={14} className="text-[#5FA8FF]" />
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Additional Details</label>
                  </div>
                  <textarea
                    placeholder="Briefly describe the behavior..."
                    className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-[#F87171] transition-all text-[#0F172A] font-medium text-sm placeholder:text-slate-300 resize-none shadow-sm"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={!selectedReason}
                className="w-full py-4 bg-[#F87171] hover:bg-[#ef4444] text-white font-bold rounded-2xl transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-30 disabled:grayscale"
              >
                Submit Report
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <ShieldCheck size={12} className="text-[#4ADE80]" />
                Reports are anonymous & reviewed by campus mods
              </div>
            </div>
          </form>
        </div>

        {/* Closing Flare */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-200 via-[#F87171] to-red-200 opacity-20" />
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;