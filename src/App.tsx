/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CurriculumView } from './components/CurriculumView';
import { LessonDetail } from './components/LessonDetail';
import { LabCatalogView } from './components/LabCatalogView';
import { SmartFlashcards } from './components/SmartFlashcards';
import { ExamRoom } from './components/ExamRoom';
import { ChemistryTools } from './components/ChemistryTools';
import { AiAssistant } from './components/AiAssistant';
import { NotebookAndMistakes } from './components/NotebookAndMistakes';
import { CHAPTERS_DATA } from './data/chaptersData';
import { EXPERIMENTS_DATA } from './data/experimentsData';
import { TextbookCode, UserProgress } from './types/chemistry';
import { Search, X, BookOpen, FlaskConical, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string>('bai-1-ester');
  const [activeLabExpId, setActiveLabExpId] = useState<string>('exp-silver-mirror');
  const [activeTextbook, setActiveTextbook] = useState<TextbookCode>('ket_noi');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('chemistry12_dark') === 'true';
  });

  // Global search modal state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persisted user progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('chemistry12_user_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing progress:', e);
      }
    }
    return {
      completedLessons: ['bai-1-ester'],
      lessonScores: {},
      streakDays: 3,
      lastStudyDate: new Date().toISOString().split('T')[0],
      flashcardStates: {},
      mistakeBookIds: ['exam-p1-07'],
      notes: {
        'bai-1-ester': 'Chú ý: HCOOR\' có phản ứng tráng bạc. Khi thủy phân este phenyl cần tỉ lệ 1:2 NaOH tạo 2 muối và nước.',
      },
      examHistory: [],
    };
  });

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('chemistry12_dark', String(isDarkMode));
  }, [isDarkMode]);

  // Persist progress effect
  useEffect(() => {
    localStorage.setItem('chemistry12_user_progress', JSON.stringify(progress));
  }, [progress]);

  const handleToggleCompleteLesson = (lessonId: string) => {
    setProgress(prev => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const updated = alreadyCompleted
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const handleSaveMistake = (questionId: string) => {
    setProgress(prev => {
      if (prev.mistakeBookIds.includes(questionId)) return prev;
      return { ...prev, mistakeBookIds: [...prev.mistakeBookIds, questionId] };
    });
  };

  const handleRemoveMistake = (questionId: string) => {
    setProgress(prev => ({
      ...prev,
      mistakeBookIds: prev.mistakeBookIds.filter(id => id !== questionId),
    }));
  };

  const handleSaveNote = (lessonId: string, noteText: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: noteText,
      },
    }));
  };

  const handleNavigateToLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('lesson_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLab = (experimentId: string) => {
    setActiveLabExpId(experimentId);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    setSearchModalOpen(true);
  };

  // Find active lesson object
  const activeLesson =
    CHAPTERS_DATA.flatMap(ch => ch.lessons).find(l => l.id === activeLessonId) ||
    CHAPTERS_DATA[0].lessons[0];

  // Search Results
  const searchResultsLessons = CHAPTERS_DATA.flatMap(ch => ch.lessons).filter(
    l =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.theory.coreConcepts.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const searchResultsExps = EXPERIMENTS_DATA.filter(
    e =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.objective.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-lab-mesh text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeTextbook={activeTextbook}
        onChangeTextbook={setActiveTextbook}
        streakDays={progress.streakDays}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onGlobalSearch={handleGlobalSearch}
      />

      {/* Main Content Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            activeTextbook={activeTextbook}
            onNavigateToLesson={handleNavigateToLesson}
            onNavigateToTab={setActiveTab}
            onNavigateToLab={handleNavigateToLab}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumView
            activeTextbook={activeTextbook}
            completedLessons={progress.completedLessons}
            onSelectLesson={handleNavigateToLesson}
            onNavigateToLab={handleNavigateToLab}
          />
        )}

        {activeTab === 'lesson_detail' && (
          <LessonDetail
            lesson={activeLesson}
            onNavigateToLab={handleNavigateToLab}
            onSaveMistake={handleSaveMistake}
            onSaveNote={handleSaveNote}
            userNote={progress.notes[activeLesson.id] || ''}
            isCompleted={progress.completedLessons.includes(activeLesson.id)}
            onToggleComplete={() => handleToggleCompleteLesson(activeLesson.id)}
          />
        )}

        {activeTab === 'lab' && (
          <LabCatalogView
            initialExpId={activeLabExpId}
            onNavigateToLesson={handleNavigateToLesson}
          />
        )}

        {activeTab === 'flashcards' && <SmartFlashcards />}

        {activeTab === 'exam' && <ExamRoom onSaveMistake={handleSaveMistake} />}

        {activeTab === 'tools' && <ChemistryTools />}

        {activeTab === 'ai' && <AiAssistant />}

        {activeTab === 'notebook' && (
          <NotebookAndMistakes
            mistakeIds={progress.mistakeBookIds}
            notes={progress.notes}
            onRemoveMistake={handleRemoveMistake}
            onUpdateNote={handleSaveNote}
            onNavigateToLesson={handleNavigateToLesson}
          />
        )}
      </main>

      {/* Global Search Dialog Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-sky-600" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm công thức, phản ứng, bài học, thí nghiệm..."
                className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-100"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Lessons results */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Bài học liên quan ({searchResultsLessons.length}):
                </span>
                {searchResultsLessons.length > 0 ? (
                  <div className="space-y-2">
                    {searchResultsLessons.map(ls => (
                      <div
                        key={ls.id}
                        onClick={() => {
                          handleNavigateToLesson(ls.id);
                          setSearchModalOpen(false);
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-sky-600" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                              {ls.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate max-w-md">
                              {ls.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-sky-600 font-semibold">Xem bài →</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Không tìm thấy bài học phù hợp.</p>
                )}
              </div>

              {/* Experiments results */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Thí nghiệm 3D liên quan ({searchResultsExps.length}):
                </span>
                {searchResultsExps.length > 0 ? (
                  <div className="space-y-2">
                    {searchResultsExps.map(exp => (
                      <div
                        key={exp.id}
                        onClick={() => {
                          handleNavigateToLab(exp.id);
                          setSearchModalOpen(false);
                        }}
                        className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100/60 border border-indigo-200 dark:border-indigo-900 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <FlaskConical className="w-4 h-4 text-indigo-600" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                              {exp.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate max-w-md">
                              {exp.objective}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-indigo-600 font-semibold">Mở Lab 3D →</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Không tìm thấy thí nghiệm phù hợp.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 bg-white/60 dark:bg-slate-900/60 text-xs text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">CHEMISTRY 12 LAB</span> — Nền tảng Hóa học 12 theo Chương trình Giáo dục Phổ thông 2018 Việt Nam.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Kết nối tri thức</span>
            <span>•</span>
            <span>Cánh Diều</span>
            <span>•</span>
            <span>Chân trời sáng tạo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
