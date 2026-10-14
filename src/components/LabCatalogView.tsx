import React, { useState } from 'react';
import { Experiment } from '../types/chemistry';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { ThreeLabViewer } from './ThreeLabViewer';
import { FlaskConical, Sparkles, CheckCircle2, ChevronRight, ArrowLeft, ShieldAlert } from 'lucide-react';

interface LabCatalogViewProps {
  initialExpId?: string;
  onNavigateToLesson: (lessonId: string) => void;
}

export const LabCatalogView: React.FC<LabCatalogViewProps> = ({ initialExpId, onNavigateToLesson }) => {
  const [selectedExpId, setSelectedExpId] = useState<string | null>(initialExpId || null);

  const activeExp = EXPERIMENTS_DATA.find(e => e.id === selectedExpId);

  return (
    <div className="space-y-6">
      {/* If an experiment is open, render the active ThreeLabViewer workspace */}
      {activeExp ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedExpId(null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh mục thí nghiệm
            </button>

            <button
              onClick={() => onNavigateToLesson(activeExp.lessonId)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              Mở bài lý thuyết liên quan →
            </button>
          </div>

          {/* Interactive 3D Simulation Workbench */}
          <ThreeLabViewer experiment={activeExp} />

          {/* Post-Experiment Chemical Quiz */}
          {activeExp.quizQuestions && activeExp.quizQuestions.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Câu hỏi kiểm tra & Vận dụng sau thí nghiệm:
              </h3>

              {activeExp.quizQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs space-y-3">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Câu hỏi: {q.prompt}
                  </div>
                  {q.options && (
                    <div className="space-y-1.5">
                      {q.options.map(opt => (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border text-xs ${
                            opt.key === q.correctAnswer
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 font-bold text-emerald-900 dark:text-emerald-200'
                              : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                          }`}
                        >
                          <span className="font-bold mr-2">{opt.key}.</span>
                          {opt.text}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-slate-500 text-[11px] pt-1">
                    <strong>Giải thích khoa học:</strong> {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Experiments Grid Catalog */
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Phòng Thí Nghiệm Hóa Học 3D Tương Tác (Three.js Virtual Lab)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Quan sát biến đổi màu sắc, kết tủa lắng đọng, tạo bọt khí và tương tác trực tiếp với bàn thí nghiệm ảo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERIMENTS_DATA.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-xs flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      Thí nghiệm #{idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {exp.steps.length} bước thao tác
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {exp.objective}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-500">Hóa chất:</span>
                    {exp.chemicals.slice(0, 2).map((c, ci) => (
                      <span key={ci} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                        {c.split('(')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExpId(exp.id)}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <FlaskConical className="w-4 h-4" />
                  Mở bàn thí nghiệm 3D
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
