import React from 'react';
import { UserProgress, TextbookCode } from '../types/chemistry';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { Flame, BookOpen, FlaskConical, Award, Brain, CheckCircle2, ArrowRight, Sparkles, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  activeTextbook: TextbookCode;
  onNavigateToLesson: (lessonId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onNavigateToLab: (experimentId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  activeTextbook,
  onNavigateToLesson,
  onNavigateToTab,
  onNavigateToLab,
}) => {
  const totalLessons = CHAPTERS_DATA.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const firstUncompletedLesson =
    CHAPTERS_DATA.flatMap(ch => ch.lessons).find(
      l => !progress.completedLessons.includes(l.id)
    ) || CHAPTERS_DATA[0].lessons[0];

  const featuredExp = EXPERIMENTS_DATA[0]; // Silver mirror test

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 text-white shadow-lg">
        {/* Soft decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-32 -top-10 w-48 h-48 rounded-full bg-indigo-300/20 blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kỳ thi Tốt nghiệp THPT 2026 • Lớp 12</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Chào bạn! Cùng bứt phá điểm 9+ Hóa học 12 hôm nay
          </h1>

          <p
            style={{ backgroundColor: '#d5bfbf' }}
            className="text-xs md:text-sm text-sky-100 leading-relaxed px-3 py-1.5 rounded-xl text-slate-900"
          >
            Học bản chất, quan sát thí nghiệm ảo 3D trực quan và tối ưu ghi nhớ dài hạn với phương pháp Spaced Repetition.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToLesson(firstUncompletedLesson.id)}
              className="px-5 py-2.5 rounded-xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              Tiếp tục bài: {firstUncompletedLesson.title.split(':')[0]}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToTab('lab')}
              className="px-4 py-2.5 rounded-xl bg-sky-750/50 hover:bg-sky-700/60 border border-white/30 backdrop-blur-md text-white font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <FlaskConical className="w-4 h-4 text-amber-300" />
              Khám phá Lab 3D
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Chuỗi ngày học</span>
            <div className="text-xl font-bold font-mono text-slate-800 dark:text-white">
              {progress.streakDays} ngày
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Tiến độ bài học</span>
            <div className="text-xl font-bold font-mono text-slate-800 dark:text-white">
              {completedCount}/{totalLessons} ({progressPercent}%)
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Flashcard cần ôn</span>
            <div className="text-xl font-bold font-mono text-slate-800 dark:text-white">
              {Object.keys(progress.flashcardStates).length || 8} thẻ
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Sổ lỗi sai cần ôn</span>
            <div className="text-xl font-bold font-mono text-slate-800 dark:text-white">
              {progress.mistakeBookIds.length} câu
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-column layout: Learning Path & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chapters Overview (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              Lộ trình Chương trình Hóa học 12 (GDPT 2018)
            </h3>
            <button
              onClick={() => onNavigateToTab('curriculum')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
            >
              Xem tất cả bài học <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {CHAPTERS_DATA.map(chapter => {
              const chapterLessonCount = chapter.lessons.length;
              const chapterDone = chapter.lessons.filter(l =>
                progress.completedLessons.includes(l.id)
              ).length;
              const chPercent = Math.round((chapterDone / chapterLessonCount) * 100);

              return (
                <div
                  key={chapter.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Chuyên đề {chapter.order}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {chapter.tagline}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        {chPercent}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full transition-all"
                          style={{ width: `${chPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lessons list inside chapter */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {chapter.lessons.map(lesson => {
                      const isDone = progress.completedLessons.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onNavigateToLesson(lesson.id)}
                          className={`p-2.5 rounded-xl text-left text-xs transition-colors flex items-center justify-between border ${
                            isDone
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-sky-50 hover:border-sky-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                            )}
                            <span className="truncate font-medium">{lesson.title.split(':')[1] || lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">
                            {lesson.estimatedMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Virtual Lab & Exam Arena */}
        <div className="space-y-4">
          {/* Featured Lab Card */}
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border border-sky-200 dark:border-sky-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white">
                Mô phỏng 3D nổi bật
              </span>
              <FlaskConical className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {featuredExp.title}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Trải nghiệm phản ứng tráng bạc bằng công nghệ Three.js, quan sát lớp gương bạc sáng bóng hình thành trên thành ống nghiệm.
            </p>

            <button
              onClick={() => onNavigateToLab(featuredExp.id)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              Mở phòng Lab 3D
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Exam Arena Shortcut */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white">
                Đề thi 2026
              </span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Phòng Thi Thử Chuẩn 50 Phút
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed">
              28 câu hỏi trọn vẹn 3 phần: Trắc nghiệm 4 phương án, Đúng/Sai và Trả lời ngắn, tự động chấm điểm theo barem Bộ GD&ĐT.
            </p>

            <button
              onClick={() => onNavigateToTab('exam')}
              className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              Vào phòng thi thử ngay
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily Exam Trap Tips */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> Mẹo Hóa 12 Hôm Nay:
            </div>
            <p className="text-[11px] leading-relaxed">
              "Fructose là xeton nhưng VẪN CÓ phản ứng tráng bạc vì trong môi trường kiềm của thuốc thử Tollens, Fructose chuyển hóa thành Glucose. Muốn phân biệt 2 chất này, bắt buộc dùng dung dịch nước brom!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
