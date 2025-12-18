"use client"
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Header from '../Header';

export default function HeroSection() {
  const reviewsRef = useRef<HTMLDivElement[]>([]);
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const animateElements = () => {
        const time = Date.now() * 0.001;
        reviewsRef.current.forEach((review, index) => {
          const delay = index * 0.2;
          if (review) {
            review.style.transform = `translateY(${Math.sin(time + delay) * 10}px)`;
          }
        });

        iconsRef.current.forEach((icon, index) => {
          const delay = index * 0.3;
          if (icon) {
            icon.style.transform = `translateY(${Math.sin(time + delay) * 8}px) rotate(${Math.sin(time + delay) * 5}deg)`;
          }
        });
        requestAnimationFrame(animateElements);
      };
      animateElements();
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number, type: 'review' | 'icon') => {
    if (!el) return;
    if (type === 'review') reviewsRef.current[index] = el;
    else iconsRef.current[index] = el;
  };

  const ReviewCard = ({ index, positionClass, quote, author, tag }: {
    index: number;
    positionClass: string;
    quote: string;
    author: string;
    tag: string;
  }) => (
    <div
      ref={el => addToRefs(el, index, 'review')}
      className={`absolute ${positionClass} hidden md:flex flex-col bg-white border border-slate-100 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500`}
    >
      <div className="flex gap-1 mb-2">
        <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#5FA8FF] text-[10px] font-bold rounded-full uppercase tracking-wider">{tag}</span>
      </div>
      <p className="text-[#0F172A] font-medium text-sm leading-relaxed italic">"{quote}"</p>
      <p className="text-[#64748B] text-xs mt-2 font-medium">— {author}</p>
    </div>
  );

  const FloatingIcon = ({ index, positionClass, color }: {
    index: number;
    positionClass: string;
    color: string;
  }) => (
    <div
      ref={el => addToRefs(el, index, 'icon')}
      className={`absolute ${positionClass} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white border border-slate-50`}
    >
      <div className={`w-3 h-3 rounded-full ${color} animate-pulse`} />
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F9FAFC] flex flex-col items-center justify-center">
 
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#5FA8FF] opacity-[0.08] blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#B9A8FF] opacity-[0.08] blur-[120px]" />

      {/* Floating Elements - Updated Content for College Context */}
      <ReviewCard
        index={0}
        positionClass="top-24 left-[10%] w-56"
        tag="Vibe Check"
        quote="Actually a great listener. We talked about midterms for an hour."
        author="Anonymous Junior"
      />
      <ReviewCard
        index={1}
        positionClass="top-40 right-[12%] w-52"
        tag="Top Rated"
        quote="Super chill energy. No weird vibes at all."
        author="Sophomore @ Arts"
      />
      <ReviewCard
        index={2}
        positionClass="bottom-32 left-[15%] w-60"
        tag="Friendly"
        quote="Found a study buddy for Chem 101 in 5 minutes."
        author="Freshman"
      />
      <ReviewCard
        index={3}
        positionClass="bottom-40 right-[10%] w-48"
        tag="Kindness"
        quote="Evara is so much cleaner than other apps."
        author="Senior"
      />

      {/* Modern Floating Icons */}
      <FloatingIcon index={0} positionClass="top-[20%] left-[30%]" color="bg-[#5FA8FF]" />
      <FloatingIcon index={1} positionClass="top-[15%] right-[25%]" color="bg-[#B9A8FF]" />
      <FloatingIcon index={2} positionClass="bottom-[25%] left-[25%]" color="bg-[#B9A8FF]" />
      <FloatingIcon index={3} positionClass="bottom-[15%] right-[30%]" color="bg-[#5FA8FF]" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
          </span>
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">1,240 Students Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#0F172A] tracking-tight">
          Talk freely. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">
            Connect safely.
          </span>
        </h1>

        <p className="text-[#64748B] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Evara is a calm space for college students to chat anonymously, skip the noise, and meet real people from campus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => isAuthenticated ? router.push("/waitingRoom") : router.push("/signin")}
            className="group relative px-10 py-4 bg-[#5FA8FF] hover:bg-[#4e96ed] text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-[0_10px_20px_rgba(95,168,255,0.2)] hover:shadow-[0_15px_25px_rgba(95,168,255,0.3)] overflow-hidden"
          >
            <span className="relative z-10">Start Chatting</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <button className="px-8 py-4 bg-white text-[#64748B] font-semibold rounded-2xl text-lg border border-slate-100 hover:bg-slate-50 transition-colors">
            How it works
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <p className="text-sm font-medium text-[#64748B]">Zero Pressure • Fully Anonymous • Student Only</p>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF] opacity-20" />
    </div>
  );
}