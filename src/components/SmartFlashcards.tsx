import React, { useState } from 'react';
import { Flashcard, MindmapNode } from '../types/chemistry';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { RotateCw, CheckCircle2, AlertCircle, Sparkles, Filter, ChevronRight, Brain, Clock, HelpCircle } from 'lucide-react';

interface SmartFlashcardsProps {
  onReviewCard?: (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
}

export const SmartFlashcards: React.FC<SmartFlashcardsProps> = () => {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('chemistry12_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeMode, setActiveMode] = useState<'flashcard' | 'mindmap'>('flashcard');
  const [selectedMindmapChapter, setSelectedMindmapChapter] = useState(CHAPTERS_DATA[0].id);

  // Filter cards
  const filteredCards = cards.filter(c => activeFilter === 'all' || c.chapterId === activeFilter);
  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    let newInterval = 1;
    let newRepetition = currentCard.repetition;
    let newEase = currentCard.easeFactor;

    if (rating === 'again') {
      newInterval = 1;
      newRepetition = 0;
      newEase = Math.max(1.3, newEase - 0.2);
    } else if (rating === 'hard') {
      newInterval = 2;
      newRepetition += 1;
      newEase = Math.max(1.3, newEase - 0.15);
    } else if (rating === 'good') {
      newInterval = currentCard.interval === 1 ? 4 : Math.round(currentCard.interval * newEase);
      newRepetition += 1;
    } else if (rating === 'easy') {
      newInterval = currentCard.interval === 1 ? 7 : Math.round(currentCard.interval * newEase * 1.3);
      newRepetition += 1;
      newEase += 0.15;
    }

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + newInterval);

    const updated = cards.map(c =>
      c.id === currentCard.id
        ? {
            ...c,
            interval: newInterval,
            repetition: newRepetition,
            easeFactor: newEase,
            dueDate: nextDueDate.toISOString(),
          }
        : c
    );

    setCards(updated);
    localStorage.setItem('chemistry12_flashcards', JSON.stringify(updated));

    // Next card
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentChapter = CHAPTERS_DATA.find(c => c.id === selectedMindmapChapter) || CHAPTERS_DATA[0];
  const sampleLesson = currentChapter.lessons[0];

  return (
    <div className="space-y-6">
      {/* Header and Mode switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Hệ thống Ghi nhớ Thông minh (Spaced Repetition & Mindmap)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ứng dụng thuật toán lặp lại ngắt quãng để tối ưu hóa khả năng ghi nhớ dài hạn trước kỳ thi.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveMode('flashcard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'flashcard'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Thẻ Flashcard ({filteredCards.length})
          </button>
          <button
            onClick={() => setActiveMode('mindmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'mindmap'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Sơ đồ tư duy (Mindmap)
          </button>
        </div>
      </div>

      {activeMode === 'flashcard' ? (
        <div className="space-y-6">
          {/* Topic Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Lọc theo chuyên đề:
            </span>
            <button
              onClick={() => {
                setActiveFilter('all');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Tất cả ({cards.length})
            </button>
            {CHAPTERS_DATA.map(ch => (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveFilter(ch.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === ch.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {ch.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Flashcard Component */}
          {currentCard ? (
            <div className="flex flex-col items-center">
              <div
                onClick={handleFlip}
                className="w-full max-w-xl min-h-[300px] p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative group select-none"
              >
                {/* Card Top Pill Badge */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                      {currentCard.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Thẻ {currentIndex + 1}/{filteredCards.length}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-sky-600 transition-colors">
                    <RotateCw className="w-3.5 h-3.5" />
                    Bấm để lật thẻ
                  </span>
                </div>

                {/* Card Content (Front or Back) */}
                <div className="my-6 text-center">
                  {!isFlipped ? (
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Câu hỏi / Hiện tượng cần nhớ:
                      </span>
                      <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-relaxed whitespace-pre-line">
                        {currentCard.front}
                      </p>
                      {currentCard.hint && (
                        <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 py-1.5 px-3 rounded-xl inline-block">
                          💡 Gợi ý: {currentCard.hint}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-2">
                        Đáp án & Giải thích cốt lõi:
                      </span>
                      <div className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line text-left bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                        {currentCard.back}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Status */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Lặp lại: {currentCard.interval} ngày
                  </span>
                  <span>Độ dễ nhớ: {currentCard.easeFactor.toFixed(1)}x</span>
                </div>
              </div>

              {/* Spaced Repetition Feedback Buttons (when flipped) */}
              {isFlipped ? (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-xl">
                  <button
                    onClick={() => handleRating('again')}
                    className="flex-1 min-w-[110px] py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-all flex flex-col items-center gap-0.5"
                  >
                    <span>Chưa nhớ (1 ngày)</span>
                    <span className="text-[10px] font-normal opacity-80">Ôn lại ngay</span>
                  </button>

                  <button
                    onClick={() => handleRating('hard')}
                    className="flex-1 min-w-[110px] py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold transition-all flex flex-col items-center gap-0.5"
                  >
                    <span>Khó nhớ (2 ngày)</span>
                    <span className="text-[10px] font-normal opacity-80">Hơi lúng túng</span>
                  </button>

                  <button
                    onClick={() => handleRating('good')}
                    className="flex-1 min-w-[110px] py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-all flex flex-col items-center gap-0.5"
                  >
                    <span>Đã nhớ (4 ngày)</span>
                    <span className="text-[10px] font-normal opacity-80">Nhớ khá tốt</span>
                  </button>

                  <button
                    onClick={() => handleRating('easy')}
                    className="flex-1 min-w-[110px] py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all flex flex-col items-center gap-0.5"
                  >
                    <span>Nhớ sâu (7 ngày)</span>
                    <span className="text-[10px] font-normal opacity-80">Rất tự tin</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-xs text-slate-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Bấm vào thẻ để xem đáp án và chọn mức độ nhớ
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Chưa có thẻ trong chuyên đề này.
            </div>
          )}
        </div>
      ) : (
        /* --- MINDMAP INTERACTIVE VIEW --- */
        <div className="space-y-6">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
            {CHAPTERS_DATA.map(ch => (
              <button
                key={ch.id}
                onClick={() => setSelectedMindmapChapter(ch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedMindmapChapter === ch.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {ch.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Interactive Mindmap Tree View */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="text-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                Sơ đồ tư duy tổng hợp: {sampleLesson.title}
              </span>
            </div>

            {/* Mindmap visual node hierarchy */}
            <div className="flex flex-col items-center gap-6">
              {/* Central Node */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg text-center max-w-sm">
                <h3 className="font-bold text-base">{sampleLesson.theory.mindmap.title}</h3>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  {sampleLesson.theory.mindmap.details?.map((d, i) => (
                    <span key={i} className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connecting line */}
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

              {/* Branches */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {sampleLesson.theory.mindmap.children?.map((branch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 transition-all shadow-sm"
                  >
                    <h4 className="font-bold text-sm text-sky-800 dark:text-sky-300 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                      {branch.title}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {branch.details?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-1.5">
                          <span className="text-sky-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
