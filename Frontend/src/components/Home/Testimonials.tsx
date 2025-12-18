"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Testimonial from '@/types/Testimonials';
import testimonialsData from '@/Data/Testimonials';

// Star Component for cleaner code
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? "text-[#5FA8FF]" : "text-slate-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.363 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.371-2.454a1 1 0 00-1.176 0l-3.37 2.454c-.784.57-1.838-.197-1.539-1.118l1.285-3.953a1 1 0 00-.364-1.118L2.171 8.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.955z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-6 flex flex-col gap-4 group hover:shadow-[0_15px_30px_rgba(95,168,255,0.08)] transition-all duration-500">
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-50">
        <Image
          fill
          src={testimonial.img}
          alt={testimonial.name}
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="text-sm font-bold text-[#0F172A]">{testimonial.name}</h4>
        <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">{testimonial.title}</p>
      </div>
    </div>
    
    <p className="text-[#64748B] text-sm leading-relaxed italic">
      "{testimonial.content}"
    </p>

    <div className="flex justify-between items-center mt-2 pt-4 border-t border-slate-50">
      <StarRating rating={testimonial.rating} />
      <span className="text-[10px] font-bold text-[#5FA8FF]/50 tracking-tighter italic">#VerifiedStudent</span>
    </div>
  </div>
);

const ScrollingColumn = ({ items, duration, reverse = false }: { items: Testimonial[], duration: number, reverse?: boolean }) => (
  <div className="relative h-[600px] overflow-hidden">
    <motion.div
      initial={{ y: reverse ? "-50%" : "0%" }}
      animate={{ y: reverse ? "0%" : "-50%" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex flex-col"
    >
      {/* Duplicate items for seamless loop */}
      {[...items, ...items].map((item, index) => (
        <TestimonialCard key={`${item.id}-${index}`} testimonial={item} />
      ))}
    </motion.div>
  </div>
);

export default function TestimonialsSection() {
  // Split testimonials into 3 chunks for the columns
  const col1 = testimonialsData.slice(0, Math.ceil(testimonialsData.length / 3));
  const col2 = testimonialsData.slice(Math.ceil(testimonialsData.length / 3), Math.ceil(testimonialsData.length / 3) * 2);
  const col3 = testimonialsData.slice(Math.ceil(testimonialsData.length / 3) * 2);

  return (
    <section className="relative py-24 bg-[#F9FAFC] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#5FA8FF] opacity-[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4"
          >
            Real Voices. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8FF] to-[#B9A8FF]">Real Vibes.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B] font-medium"
          >
            Don’t take it from us — hear it from students who ditched the assumptions.
          </motion.p>
        </div>

        {/* Vertical Marquee Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
          
          {/* Top & Bottom Blur Mask (The Magic Part) */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F9FAFC] to-transparent z-20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F9FAFC] to-transparent z-20" />

          {/* Column 1: Slow */}
          <div className="hidden md:block">
            <ScrollingColumn items={col1} duration={40} />
          </div>

          {/* Column 2: Faster & Reversed */}
          <div>
            <ScrollingColumn items={col2} duration={30} reverse={true} />
          </div>

          {/* Column 3: Medium */}
          <div className="hidden md:block">
            <ScrollingColumn items={col3} duration={50} />
          </div>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center relative z-30">
          <p className="text-sm font-bold text-[#5FA8FF] uppercase tracking-widest bg-white border border-slate-100 px-6 py-2 rounded-full inline-block shadow-sm">
            Ready to add your story?
          </p>
        </div>
      </div>
    </section>
  );
}