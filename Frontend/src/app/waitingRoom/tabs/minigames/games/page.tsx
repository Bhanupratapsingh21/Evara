'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Users, 
  Play, 
  XCircle, 
  Info, 
  Monitor,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap
} from 'lucide-react';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EmulatorContainer from '@/components/Games/EmulatorContainer';

export default function GameOnePage() {
  const [game, setGame] = useState<gametypes>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [romUrl, setRomUrl] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('game');
    if (id) {
      const current = retroGames.find(g => g.id === Number(id));
      setGame(current);
      if (current?.nesUrl) setRomUrl(current.nesUrl);
    }
  }, []);

  const handlePlay = () => setIsGameRunning(true);
  const handleStop = () => {
    setIsGameRunning(false);
    setRomUrl('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] pt-24 pb-12 px-4">
      {/* Background Soft Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#B9A8FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5FA8FF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isGameRunning ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* editorial Banner */}
              <div className="relative group w-full aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-500/5">
                <Image
                  src={game?.imgUrl || '/game/game1.png'}
                  alt={game?.name || 'Game banner'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                        {game?.type || 'Arcade Classic'}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        {game?.name}
                      </h1>
                   </div>
                   <button
                    onClick={handlePlay}
                    disabled={!game?.nesUrl}
                    className="p-6 bg-[#5FA8FF] hover:bg-[#4e96ed] text-white rounded-3xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 group"
                  >
                    <Play size={32} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Metadata Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-[#5FA8FF]">
                    <Info size={20} />
                    <h3 className="font-bold text-[#0F172A]">About the Game</h3>
                  </div>
                  <p className="text-[#64748B] leading-relaxed font-medium">
                    {game?.description || "Get ready for a nostalgic trip. This classic title is part of our curated campus arcade collection."}
                  </p>
                  <div className="mt-8 pt-8 border-t border-slate-50 flex gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#B9A8FF]">
                         <Users size={16} />
                       </div>
                       <span className="text-xs font-bold text-[#0F172A]">Global Multi-player</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#5FA8FF]">
                         <Monitor size={16} />
                       </div>
                       <span className="text-xs font-bold text-[#0F172A]">Retina Optimized</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#B9A8FF] to-[#5FA8FF] p-8 rounded-[2rem] text-white shadow-xl shadow-purple-500/10 flex flex-col justify-between">
                  <Zap size={32} className="opacity-50" />
                  <div>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1 italic">Vibe Check</p>
                    <h4 className="text-2xl font-black leading-tight italic">
                      "{game?.quote || 'Classic Fun.'}"
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Emulator UI */}
              <div className="bg-[#0F172A] p-4 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative group">
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={handleStop}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
                    >
                      <XCircle size={24} />
                    </button>
                </div>
                <div className="w-full aspect-video md:h-[500px] bg-black rounded-2xl overflow-hidden shadow-inner">
                  {romUrl && <EmulatorContainer romUrl={romUrl} />}
                </div>
              </div>

              {/* Controls & Hints */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                
                {/* Visual D-PAD Display */}
                <div className="flex justify-center md:justify-start gap-12 items-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div /> 
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ArrowUp size={20}/></div>
                    <div />
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ArrowLeft size={20}/></div>
                    <div className="w-12 h-12 rounded-xl bg-slate-200/50" />
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ArrowRight size={20}/></div>
                    <div />
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><ArrowDown size={20}/></div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-14 h-14 rounded-full border-4 border-[#B9A8FF]/20 flex items-center justify-center font-black text-[#B9A8FF] text-xl">Z</div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fire</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-14 h-14 rounded-full border-4 border-[#5FA8FF]/20 flex items-center justify-center font-black text-[#5FA8FF] text-xl">X</div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jump</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <Monitor className="text-[#5FA8FF]" size={20} />
                    <p className="text-sm font-bold text-blue-900 leading-tight">
                      Pro Tip: Use your physical keyboard for the best response time.
                    </p>
                  </div>
                  <button 
                    onClick={handleStop}
                    className="w-full py-4 bg-slate-50 hover:bg-red-50 text-[#64748B] hover:text-red-500 font-bold rounded-2xl transition-all border border-slate-100 hover:border-red-100 flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Close Emulator
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}