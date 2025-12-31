"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FiSend, FiInfo, FiMoreHorizontal, FiUser } from "react-icons/fi";
import {
  Sparkles, Zap, Ghost, MessageCircle, Flag, X, ArrowRight,
  RefreshCw, Heart, Radio, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  sendMessage,
  skipMatch,
  clearMessages,
  matched,
  leaveQueue,
  joinQueue,
} from "@/store/slices/socketSlice";
import { toast } from "sonner";
import { getChatSocket } from "@/Services/socketService";
import { ChatEvent } from "@/types/Chat";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import ReportDialog from "@/components/Chat/ReportDialog";
import FeedbackDialog from "@/components/Chat/FeedbackDialog";
import MatchDialog from "@/components/Chat/MatchDialog";
//handle report
const reasons = [
  "Harassment or hate",
  "Spam / ads",
  "Inappropriate content",
  "Impersonation",
  "Other",
];
const ChatSystem = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.socket.messages);
  const matchedState = useAppSelector((state) => state.socket.matched);
  const { position, waiting, online } = useAppSelector((s) => s.socket);
  const user = useAppSelector((state) => state.user.user);
  const [selectedReason, setSelectedReason] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isMatching, setIsMatching] = useState(!matchedState);
  const [showFeedbackModal, setshowFeedbackModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMatchedUserModel, setShowMatchedUserModel] = useState(false);
  const [peerInfo, setPeerInfo] = useState<{ userId: string; userName?: string } | null>(null);
  const [details, setDetails] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Logic: Sync isMatching state
  useEffect(() => {
    setIsMatching(!matchedState);
  }, [matchedState]);

  // Logic: Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Logic: Socket Handshake
  useEffect(() => {
    const chatSocket = getChatSocket();

    function onPeerHandshake(payload: { userId: string; userName?: string }) {
      setPeerInfo(null);
      toast.success(`${payload.userName ?? "Someone"} joined the vibe.`);
      setPeerInfo(payload);
      setShowMatchedUserModel(true);
      setIsMatching(false);

      setTimeout(() => setShowMatchedUserModel(false), 2500);
    }
    chatSocket.on(ChatEvent.HANDSHAKE, onPeerHandshake);

    chatSocket.on("peerLeft", () => {
      dispatch(clearMessages());
      dispatch(matched(null));
      setshowFeedbackModal(true);
      setIsMatching(true);
    });

    return () => {
      chatSocket.off(ChatEvent.HANDSHAKE, onPeerHandshake);
      chatSocket.off("peerLeft");
    };
  }, [dispatch]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (text && matchedState) {
      dispatch(sendMessage(text));
      setInputValue("");
    }
  };
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason || !peerInfo?.userId) {
      toast.error("Please select a reason and ensure a peer is matched.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}report/submit-report`,
        {
          reasons: selectedReason,
          details,
          peerId: peerInfo?.userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Report submitted successfully");
      setDetails("");
      setSelectedReason("");
      setShowReportModal(false);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
          "Failed to submit report. Please try again."
        );
      } else {
        toast.error("Failed to submit report. Please try again.");
      }
      console.error("Error submitting report", error);
    }
  };
  const handleSkip = () => {
    setshowFeedbackModal(true);
    setIsMatching(true);
    dispatch(clearMessages());
    dispatch(skipMatch());
  };

  const handleRetry = () => {
    dispatch(clearMessages());
    dispatch(matched(null));
    dispatch(leaveQueue());
    dispatch(joinQueue());
    toast.info("Finding a fresh connection...");
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim() || !rating) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-feedback`, {
        feedbackBy: user?._id,
        feedbackTo: peerInfo?.userId,
        comment: feedbackText,
        rating,
      });
      toast.success("Feedback shared!");
      setFeedbackText("");
      setRating(3);
      setshowFeedbackModal(false);
    } catch (error) {
      toast.error("Vibe report failed. Try again.");
    }
  };

  const suggestions = [
    "Assume something about me",
    "Take a wild guess...",
    "First impression?"
  ];

  return (
    <div className="flex flex-col h-screen w-full  mx-auto bg-[#F9FAFC] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white relative">

      <AnimatePresence mode="wait">
        {isMatching ? (
          /* --- THE BREATHING ROOM (MATCHING STATE) --- */
          <motion.div
            key="matching"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="relative mb-10">
              {/* Pulsing Aura */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] rounded-full blur-3xl"
              />
              <div className="relative w-32 h-32 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center border border-slate-50">
                <Ghost size={48} className="text-[#5FA8FF] animate-bounce" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">The Breathing Room</h2>
            <p className="text-[#64748B] max-w-xs font-medium mb-10 leading-relaxed">
              Take a breath. We're finding a safe, verified connection for you.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peers Online</span>
                  <span className="text-xl font-black text-[#0F172A]">{online || 0}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Queue Pos</span>
                  <span className="text-xl font-black text-[#5FA8FF]">#{position || 1}</span>
                </div>
              </div>

              {peerInfo && (
                <button
                  onClick={() => setshowFeedbackModal(true)}
                  className="w-full py-4 bg-white text-[#B9A8FF] font-bold rounded-2xl border border-[#B9A8FF]/20 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} /> Review Last Chat
                </button>
              )}

              <button
                onClick={handleRetry}
                className="w-full py-4 bg-[#0F172A] text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
              >
                <RefreshCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
              Join Queue
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- THE CHAT INTERFACE --- */
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full relative"
          >
            {/* Top Bar - Floating Pill */}
            <div className="absolute top-4 left-0 right-0 z-20 px-4">
              <div className="bg-white/80 backdrop-blur-xl border border-white p-3 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                        alt="Avatar" width={40} height={40}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">{peerInfo?.userName || "Anonymous Student"}</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-tighter">Verified Connection</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pr-1">
                  <button onClick={() => setShowReportModal(true)} className="p-2.5 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-50">
                    <Flag size={18} />
                  </button>
                  <button onClick={handleSkip} className="px-5 py-2.5 bg-[#0F172A] text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                    <X size={14} /> New Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 overflow-y-auto pt-24 px-6 pb-28 custom-scrollbar">
              <div className="flex flex-col gap-4">
                <div className="text-center my-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    <ShieldCheck size={12} /> Safe Chat Active
                  </div>
                </div>

                {messages.map((m, idx) => {
                  const isMine = m.peerId !== matchedState?.peer;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={idx}
                      className={`flex ${isMine ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={cn(
                        "max-w-[80%] px-5 py-3 rounded-[1.8rem] text-sm font-medium shadow-sm",
                        isMine
                          ? "bg-white border border-slate-100 text-[#0F172A] rounded-tl-none"
                          :"bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] text-white rounded-tr-none" 
                      )}>
                        {m.content}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
              <div className="max-w-3xl mx-auto flex flex-col gap-3">
                {/* Suggestions Chips */}
                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setInputValue(s)}
                        className="px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-[#5FA8FF] hover:text-[#5FA8FF] transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Input Capsule */}
                <form
                  onSubmit={handleSend}
                  className="bg-white p-2 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center group focus-within:ring-4 focus-within:ring-[#5FA8FF]/5 transition-all"
                >
                  <div className="p-3 text-slate-300">
                    <MessageCircle size={20} />
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type an assumption or message..."
                    className="flex-1 bg-transparent border-none outline-none text-[#0F172A] font-medium text-sm py-3"
                    disabled={isMatching}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isMatching}
                    className="w-12 h-12 rounded-full bg-[#5FA8FF] hover:bg-[#4e96ed] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-200"
                  >
                    <FiSend size={18} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ALL MODALS --- */}
      {showFeedbackModal && (
        <FeedbackDialog
          user={{ name: user?.name ?? "" }}
          peerInfo={{ userName: peerInfo?.userName ?? "" }}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setshowFeedbackModal}
          feedbackText={feedbackText}
          setFeedbackText={setFeedbackText}
          rating={rating}
          setRating={setRating}
          handleFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
      {showReportModal && (
        <ReportDialog
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
          reasons={reasons}
          selectedReason={selectedReason}
          setSelectedReason={setSelectedReason}
          details={details}
          setDetails={setDetails}
          handleReportSubmit={handleReportSubmit}
          user={{ name: user?.name ?? "" }}
          peerInfo={{ userName: peerInfo?.userName ?? "" }}
        />
      )}
      {showMatchedUserModel && (
        <MatchDialog
          open={showMatchedUserModel}
          onClose={() => setShowMatchedUserModel(false)}
          user={{ name: user?.name ?? "" }}
          peerInfo={{ userName: peerInfo?.userName ?? "" }}
        />
      )}
    </div>
  );
};

export default ChatSystem;