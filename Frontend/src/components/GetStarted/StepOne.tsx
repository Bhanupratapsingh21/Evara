"use client";
import { GraduationCap, Book, Calendar } from 'lucide-react';
import { usColleges, commonCourses } from '@/Data/usColleges';

export default function StepOne({ academicData, handleAcademicChange }: any) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">Academic Journey</h1>
      <p className="text-[#64748B] mb-10 max-w-md mx-auto">This helps us verify you and suggest people from your major or campus.</p>

      <div className="space-y-6 text-left max-w-md mx-auto">
        {/* University */}
        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#64748B] mb-2 ml-1">
            <GraduationCap size={14} className="text-[#5FA8FF]" /> University
          </label>
          <select
            value={academicData.university}
            onChange={(e) => handleAcademicChange('university', e.target.value)}
            className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] outline-none transition-all font-medium appearance-none"
          >
            <option value="">Choose University</option>
            {usColleges.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#64748B] mb-2 ml-1">
            <Book size={14} className="text-[#5FA8FF]" /> Major / Course
          </label>
          <select
            value={academicData.course}
            onChange={(e) => handleAcademicChange('course', e.target.value)}
            className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#5FA8FF]/10 focus:border-[#5FA8FF] outline-none transition-all font-medium appearance-none"
          >
            <option value="">Select Major</option>
            {commonCourses.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#64748B] mb-2 ml-1">
            <Calendar size={14} className="text-[#5FA8FF]" /> Year of Study
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map((y, i) => (
              <button
                key={y}
                type="button"
                onClick={() => handleAcademicChange('year', y)}
                className={`p-3 rounded-xl border text-sm font-bold transition-all ${academicData.year === y
                    ? 'border-[#5FA8FF] bg-[#5FA8FF]/5 text-[#5FA8FF]'
                    : 'border-slate-100 bg-white text-[#64748B] hover:border-slate-200'
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}