import React, { useState } from 'react';
import { Question } from '../types/chemistry';
import { EXAM_2026_QUESTIONS } from '../data/questionsData';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { Bookmark, CheckCircle2, Trash2, RotateCcw, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';

interface NotebookAndMistakesProps {
  mistakeIds: string[];
  notes: Record<string, string>;
  onRemoveMistake: (qId: string) => void;
  onUpdateNote: (lessonId: string, text: string) => void;
  onNavigateToLesson: (lessonId: string) => void;
}

export const NotebookAndMistakes: React.FC<NotebookAndMistakesProps> = ({
  mistakeIds,
  notes,
  onRemoveMistake,
  onUpdateNote,
  onNavigateToLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'mistakes' | 'notes'>('mistakes');
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Collect all questions from Exam and Chapters
  const allQuestionsMap: Record<string, Question> = {};
  EXAM_2026_QUESTIONS.forEach(q => { allQuestionsMap[q.id] = q; });
  CHAPTERS_DATA.forEach(ch => {
    ch.lessons.forEach(ls => {
      ls.exercises.forEach(ex => {
        allQuestionsMap[ex.id] = ex;
      });
    });
  });

  const mistakeQuestions = mistakeIds
    .map(id => allQuestionsMap[id])
    .filter(Boolean);

  const toggleExplanation = (id: string) => {
    setShowExplanation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'mistakes'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Sổ lỗi sai cần khắc phục ({mistakeQuestions.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'notes'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Ghi chú cá nhân ({Object.keys(notes).length})
        </button>
      </div>

      {activeTab === 'mistakes' ? (
        <div className="space-y-4">
          <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200">
            <strong>Sổ lỗi sai (Mistake Book):</strong> Khi bạn làm sai bất kỳ câu hỏi nào trong phần luyện tập hoặc thi thử, hệ thống sẽ tự động lưu vào đây để bạn làm lại, giúp biến điểm yếu thành điểm số vững chắc.
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Sổ lỗi sai đang trống!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tuyệt vời! Bạn chưa có câu làm sai nào, hoặc đã làm lại và nắm vững tất cả các câu trước đó.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mistakeQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                        {q.topic}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Câu #{idx + 1}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveMistake(q.id)}
                      className="text-xs text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                      title="Đã nắm vững, xóa khỏi sổ sai"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Đã nắm vững
                    </button>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                    {q.prompt}
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="text-sky-600 hover:text-sky-700 font-semibold"
                    >
                      {showExplanation[q.id] ? 'Ẩn lời giải' : 'Xem lại lời giải chi tiết'}
                    </button>
                  </div>

                  {showExplanation[q.id] && (
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        Đáp án đúng: {q.correctAnswer}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Notes View */
        <div className="space-y-4">
          {Object.entries(notes).length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <Bookmark className="w-10 h-10 text-sky-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Chưa có ghi chú nào
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bạn có thể mở bất kỳ bài học nào và ghi lại công thức hoặc mẹo nhớ trong tab "Sổ tay ghi chú".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notes).map(([lessonId, text]) => (
                <div
                  key={lessonId}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 block mb-1">
                      Ghi chú bài học: {lessonId}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {text}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateToLesson(lessonId)}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start pt-2"
                  >
                    Mở bài học này →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
