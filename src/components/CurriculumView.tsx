import React, { useState } from 'react';
import { Chapter, Lesson, TextbookCode } from '../types/chemistry';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { BookOpen, CheckCircle2, FlaskConical, Clock, Sparkles, ChevronRight, FileText } from 'lucide-react';

interface CurriculumViewProps {
  activeTextbook: TextbookCode;
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  onNavigateToLab: (experimentId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  activeTextbook,
  completedLessons,
  onSelectLesson,
  onNavigateToLab,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CHAPTERS_DATA[0].id);

  const currentChapter =
    CHAPTERS_DATA.find(c => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-600" />
          Chương Trình Hóa Học Lớp 12 Toàn Diện (GDPT 2018)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Hệ thống bài học biên soạn theo chuẩn năng lực, phân hóa từ cơ bản đến nâng cao.
        </p>
      </div>

      {/* Chapters Pills Navigation */}
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {CHAPTERS_DATA.map(ch => {
          const isSelected = ch.id === selectedChapterId;
          const done = ch.lessons.filter(l => completedLessons.includes(l.id)).length;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterId(ch.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-300'
              }`}
            >
              <span>{ch.title.split(':')[0]}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {done}/{ch.lessons.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chapter Overview Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-indigo-50/60 dark:from-slate-900 dark:to-slate-850 border border-sky-200 dark:border-sky-900 space-y-2">
        <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider font-mono">
          Chuyên đề {currentChapter.order}
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
          {currentChapter.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentChapter.tagline}
        </p>
      </div>

      {/* Lessons List in Selected Chapter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentChapter.lessons.map((lesson, idx) => {
          const isDone = completedLessons.includes(lesson.id);
          const pageRef = lesson.bookPageMap?.[activeTextbook] || 'Chương trình chuẩn 2018';

          return (
            <div
              key={lesson.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                    Bài {idx + 1} • {lesson.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {pageRef}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {lesson.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {lesson.subtitle}
                </p>

                {/* Prerequisites tags */}
                {lesson.prerequisites && (
                  <div className="pt-2 flex flex-wrap gap-1 text-[11px] text-slate-400">
                    <span>Nền tảng:</span>
                    {lesson.prerequisites.map((p, pi) => (
                      <span key={pi} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lesson.estimatedMinutes} phút</span>
                </div>

                <div className="flex items-center gap-2">
                  {lesson.relatedExperimentId && (
                    <button
                      onClick={() => onNavigateToLab(lesson.relatedExperimentId!)}
                      className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                      title="Mở phòng thí nghiệm 3D"
                    >
                      <FlaskConical className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1"
                  >
                    {isDone ? 'Ôn lại bài' : 'Vào học ngay'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
