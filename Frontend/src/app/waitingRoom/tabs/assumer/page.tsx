'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiInfo, FiMoreHorizontal, FiUser } from 'react-icons/fi';
import { Sparkles, Zap, Ghost, MessageCircle, Flag, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { sendMessage, skipMatch, clearMessages, matched, leaveQueue, joinQueue } from '@/store/slices/socketSlice';
import { toast } from "sonner"
import { getChatSocket } from '@/Services/socketService';
import { ChatEvent } from '@/types/Chat';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

import ReportDialog from '@/components/Chat/ReportDialog';
import FeedbackDialog from '@/components/Chat/FeedbackDialog';
import MatchDialog from '@/components/Chat/MatchDialog';
import { cn } from '@/lib/utils';

const ChatSystem = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.socket.messages);
  const matchedState = useAppSelector(state => state.socket.matched);
  const { position, waiting, online } = useAppSelector(s => s.socket);
  const user = useAppSelector((state) => state.user.user);

  const [inputValue, setInputValue] = useState('');
  const [isMatching, setIsMatching] = useState(!matchedState);
  const [showFeedbackModal, setshowFeedbackModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMatchedUserModel, setShowMatchedUserModel] = useState(false);
  const [peerInfo, setPeerInfo] = useState<{ userId: string; userName?: string } | null>(null);

  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMatching(!matchedState);
  }, [matchedState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const chatSocket = getChatSocket();
    function onPeerHandshake(payload: { userId: string; userName?: string }) {
      setPeerInfo(payload);
      setShowMatchedUserModel(true);
      setIsMatching(false);
      setTimeout(() => setShowMatchedUserModel(false), 2500);
    }
    chatSocket.on(ChatEvent.HANDSHAKE, onPeerHandshake);
    chatSocket.on('peerLeft', () => {
      setshowFeedbackModal(true);
      dispatch(clearMessages());
      dispatch(matched(null));
      dispatch(joinQueue());
      setIsMatching(true);
      toast.info("Peer left the conversation.");
    });
    return () => {
      chatSocket.off(ChatEvent.HANDSHAKE, onPeerHandshake);
      chatSocket.off('peerLeft');
    };
  }, [dispatch]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (text && matchedState) {
      dispatch(sendMessage(text));
      setInputValue('');
    }
  };

  const handleSkip = useCallback(() => {
    setshowFeedbackModal(true);
    setIsMatching(true);
    dispatch(clearMessages());
    dispatch(skipMatch());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearMessages());
    dispatch(matched(null));
    dispatch(leaveQueue());
    dispatch(joinQueue());
    toast.success('Restarting your search...');
  };

  const suggestions = [
    'Assume something about me',
    'Take a wild guess...',
    "First impression?"
  ];

  return (
    <div className="flex justify-center items-center flex-col h-full w-full  mx-auto bg-[#F9FAFC] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white relative">

      <AnimatePresence mode="wait">
        {isMatching ? (
          /* --- BREATHING ROOM (MATCHING STATE) --- */
          <motion.div
            key="matching"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="relative mb-10">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] rounded-full blur-3xl"
              />
              <div className="relative w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-50">
                <Ghost size={48} className="text-[#5FA8FF] animate-bounce" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tight">The Breathing Room</h2>
            <p className="text-[#64748B] max-w-xs font-medium mb-8">Take a breath. We’re finding a safe, verified connection for you.</p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Queue Position</span>
                <span className="text-lg font-black text-[#5FA8FF]">#{position || 1}</span>
              </div>

              <button
                onClick={handleRetry}
                className="w-full py-4 bg-white text-[#0F172A] font-bold rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={18} className="text-[#B9A8FF]" /> Shuffle Queue
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- CHAT INTERFACE --- */
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col w-full h-full relative"
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
                    <h3 className="text-sm font-black text-[#0F172A]">{peerInfo?.userName || "Anonymous Peer"}</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full" />
                      <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-tighter">Live Connection</span>
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

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto pt-24 px-6 pb-28 custom-scrollbar">
              <div className="flex flex-col gap-4">
                <div className="text-center my-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    Encryption Active • Be Kind
                  </span>
                </div>

                {messages.map((m, idx) => {
                  const isMine = m.peerId !== matchedState?.peer;
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      key={idx}
                      className={`flex ${isMine ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={cn(
                        "max-w-[80%] px-5 py-3.5 rounded-[1.8rem] text-sm font-medium shadow-sm",
                        isMine
                          ? "bg-white border border-slate-100 text-[#0F172A] rounded-tl-none"
                          : " bg-gradient-to-br from-[#5FA8FF] to-[#B9A8FF] text-white rounded-tr-none"
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
              <div className=" mx-auto flex flex-col gap-3">
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
                    placeholder="Type a message or an assumption..."
                    className="flex-1 bg-transparent border-none outline-none text-[#0F172A] font-medium text-sm placeholder:text-slate-400 py-3"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
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

      {/* --- MODALS --- */}
      {showFeedbackModal && (
        <FeedbackDialog
          user={{ name: user?.name ?? '' }}
          peerInfo={{ userName: peerInfo?.userName ?? '' }}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setshowFeedbackModal}
          feedbackText={feedbackText}
          setFeedbackText={setFeedbackText}
          rating={rating}
          setRating={setRating}
          handleFeedbackSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-feedback`, {
                feedbackBy: user?._id, feedbackTo: peerInfo?.userId, comment: feedbackText, rating
              });
              toast.success('Thanks for keeping the campus clean!');
              setshowFeedbackModal(false);
            } catch (err) { toast.error('Failed to send.'); }
          }}
        />
      )}

      {showReportModal && (
        <ReportDialog
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
          reasons={['Harassment', 'Spam', 'Inappropriate', 'Other']}
          selectedReason={""}
          setSelectedReason={() => { }}
          details={""}
          setDetails={() => { }}
          handleReportSubmit={() => { }}
          user={{ name: user?.name ?? '' }}
          peerInfo={{ userName: peerInfo?.userName ?? '' }}
        />
      )}

      {showMatchedUserModel && (
        <MatchDialog
          open={showMatchedUserModel}
          onClose={() => setShowMatchedUserModel(false)}
          user={{ name: user?.name ?? '' }}
          peerInfo={{ userName: peerInfo?.userName ?? '' }}
        />
      )}
    </div>
  );
};

export default ChatSystem;