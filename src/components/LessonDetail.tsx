import React, { useState } from 'react';
import { Lesson, Question } from '../types/chemistry';
import { BookOpen, CheckCircle, ChevronRight, AlertTriangle, Eye, FlaskConical, FileText, BookmarkPlus, HelpCircle, Sparkles, Check, ArrowRight } from 'lucide-react';

interface LessonDetailProps {
  lesson: Lesson;
  onNavigateToLab: (experimentId: string) => void;
  onSaveMistake: (questionId: string) => void;
  onSaveNote: (lessonId: string, noteText: string) => void;
  userNote?: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  onNavigateToLab,
  onSaveMistake,
  onSaveNote,
  userNote = '',
  isCompleted = false,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'experiment' | 'notes'>('theory');
  const [readingMode, setReadingMode] = useState<'full' | 'fast' | 'review'>('full');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [noteContent, setNoteContent] = useState(userNote);

  const handleSelectOption = (questionId: string, key: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: key }));
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleHint = (qId: string) => {
    setRevealedHints(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSaveUserNote = () => {
    onSaveNote(lesson.id, noteContent);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
              {lesson.difficulty}
            </span>
            <span className="text-xs text-slate-400">
              ⏱ Thời gian ước tính: {lesson.estimatedMinutes} phút
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lesson.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lesson.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onToggleComplete && (
            <button
              onClick={onToggleComplete}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {isCompleted ? 'Đã hoàn thành bài' : 'Đánh dấu hoàn thành'}
            </button>
          )}

          {lesson.relatedExperimentId && (
            <button
              onClick={() => onNavigateToLab(lesson.relatedExperimentId!)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm flex items-center gap-1.5 transition-all"
            >
              <FlaskConical className="w-4 h-4" />
              Vào Lab 3D thực hành
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher: Lý thuyết - Bài tập - Thí nghiệm - Ghi chú */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'theory'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Phần A: Lý thuyết chuyên sâu
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'exercises'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Phần B: Luyện tập ({lesson.exercises.length} câu)
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            Sổ tay ghi chú riêng
          </button>
        </div>

        {activeTab === 'theory' && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <span className="text-[11px] text-slate-400 px-2">Chế độ đọc:</span>
            <button
              onClick={() => setReadingMode('full')}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                readingMode === 'full' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Đầy đủ
            </button>
            <button
              onClick={() => setReadingMode('fast')}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                readingMode === 'fast' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              1 Trang tóm tắt
            </button>
          </div>
        )}
      </div>

      {/* --- TAB A: LÝ THUYẾT CHUYÊN SÂU --- */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {readingMode === 'fast' ? (
            /* 1-Page Summary View */
            <div className="p-6 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl border border-sky-200 dark:border-sky-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Tóm tắt "1 Trang Kiến Thức" - Học Nhanh Trước Giờ Thi:
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                {lesson.theory.onePageSummary.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-200 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 flex items-center justify-center font-bold shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Full Theory View */
            <div className="space-y-6">
              {/* 1. Objectives */}
              <div className="p-5 bg-sky-50/70 dark:bg-sky-950/30 rounded-2xl border border-sky-200/80 dark:border-sky-900/40 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                  🎯 Mục tiêu cần đạt bài học:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {lesson.theory.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Core Concepts */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  Kiến thức cốt lõi & Bản chất hóa học
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {lesson.theory.coreConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
                    >
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                        {concept.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {concept.explanation}
                      </p>

                      {concept.formulas && concept.formulas.length > 0 && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 font-mono text-xs text-indigo-700 dark:text-indigo-300">
                          {concept.formulas.map((f, fi) => (
                            <div key={fi}>• {f}</div>
                          ))}
                        </div>
                      )}

                      {concept.keyTakeaway && (
                        <div className="text-xs text-amber-800 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/60">
                          💡 {concept.keyTakeaway}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Chemical Reactions with conditions and phenomena */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Phương trình phản ứng & Hiện tượng quan sát được
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.theory.reactions.map((rx, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400">
                          {rx.title}
                        </span>
                        <div className="p-3 my-2 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                          {rx.equation}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          <strong>Điều kiện:</strong> {rx.conditions}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/50 text-xs">
                        <span className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1 mb-0.5">
                          <Eye className="w-3.5 h-3.5 text-amber-600" /> Hiện tượng:
                        </span>
                        <p className="text-amber-800 dark:text-amber-300">{rx.phenomenon}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Comparison Table (if present) */}
              {lesson.theory.comparisonTable && (
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    📊 {lesson.theory.comparisonTable.title}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                          {lesson.theory.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="py-2.5 px-3 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {lesson.theory.comparisonTable.rows.map((row, ri) => (
                          <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                            {row.map((cell, ci) => (
                              <td key={ci} className={`py-2 px-3 ${ci === 0 ? 'font-medium text-slate-900 dark:text-white' : ''}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. Common Traps & Exam Mistakes */}
              <div className="p-5 bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl border border-rose-200/80 dark:border-rose-900/50 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Cảnh báo "Bẫy" Đề Thi & Lỗi Sai Học Sinh Hay Mắc:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {lesson.theory.commonMistakes.map((cm, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/60 space-y-1.5"
                    >
                      <div className="font-semibold text-rose-700 dark:text-rose-400">
                        ❌ Lỗi sai: {cm.mistake}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300">
                        ✔️ Khắc phục: {cm.correction}
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                        📌 Mẹo thi: {cm.examTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB B: BÀI TẬP PHÂN HÓA --- */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500">
            Hệ thống bài tập phân loại theo 4 cấp độ: Nhận biết (NB), Thông hiểu (TH), Vận dụng (VD), Vận dụng cao (VDC).
          </div>

          <div className="space-y-4">
            {lesson.exercises.map((ex, idx) => {
              const userAns = userAnswers[ex.id];
              const isSolutionOpen = revealedSolutions[ex.id];
              const isHintOpen = revealedHints[ex.id];

              return (
                <div
                  key={ex.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                        {ex.level}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Câu {idx + 1}
                      </span>
                    </div>

                    <button
                      onClick={() => onSaveMistake(ex.id)}
                      className="text-xs text-slate-400 hover:text-amber-600 flex items-center gap-1"
                      title="Lưu vào sổ lỗi sai"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      Lưu câu hỏi
                    </button>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                    {ex.prompt}
                  </p>

                  {/* 4 Options if single choice */}
                  {ex.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.options.map(opt => {
                        const isSelected = userAns === opt.key;
                        const isCorrect = ex.correctAnswer === opt.key;
                        let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-sky-300';

                        if (isSelected) {
                          btnStyle = isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-rose-500 bg-rose-50 text-rose-900';
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectOption(ex.id, opt.key)}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[11px] shrink-0">
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Hints and Solution Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    {ex.hints && (
                      <button
                        onClick={() => toggleHint(ex.id)}
                        className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {isHintOpen ? 'Ẩn gợi ý' : 'Xem gợi ý từng bước'}
                      </button>
                    )}

                    <button
                      onClick={() => toggleSolution(ex.id)}
                      className="text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isSolutionOpen ? 'Ẩn lời giải' : 'Xem lời giải chi tiết'}
                    </button>
                  </div>

                  {isHintOpen && ex.hints && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                      <strong>Gợi ý tư duy:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        {ex.hints.map((h, hi) => (
                          <li key={hi}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isSolutionOpen && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        Đáp án đúng: {ex.correctAnswer}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {ex.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB D: SỔ TAY GHI CHÚ RIÊNG --- */}
      {activeTab === 'notes' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BookmarkPlus className="w-4 h-4 text-sky-600" />
            Ghi chú học tập cá nhân cho bài: {lesson.title}
          </h3>
          <p className="text-xs text-slate-500">
            Nơi bạn lưu lại những công thức tự rút ra, mẹo nhớ của thầy cô trên lớp hoặc những điểm cần chú ý cho kỳ thi.
          </p>

          <textarea
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            rows={8}
            placeholder="Viết ghi chú cá nhân tại đây..."
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveUserNote}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              Lưu ghi chú vào tài khoản
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
