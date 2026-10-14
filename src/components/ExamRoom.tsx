import React, { useState, useEffect } from 'react';
import { EXAM_2026_QUESTIONS } from '../data/questionsData';
import { Question } from '../types/chemistry';
import { Clock, Flag, CheckCircle, AlertCircle, HelpCircle, RotateCcw, Award, ChevronRight, ChevronLeft, BookmarkPlus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamRoomProps {
  onSaveMistake?: (questionId: string) => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({ onSaveMistake }) => {
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Time remaining in seconds (50 minutes = 3000 seconds)
  const [timeLeft, setTimeLeft] = useState(3000);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // User answers
  // Part 1: Record<questionId, selectedKey 'A'|'B'|'C'|'D'>
  const [answersP1, setAnswersP1] = useState<Record<string, string>>({});
  // Part 2: Record<questionId, Record<subId 'a'|'b'|'c'|'d', boolean>>
  const [answersP2, setAnswersP2] = useState<Record<string, Record<string, boolean>>>({});
  // Part 3: Record<questionId, string>
  const [answersP3, setAnswersP3] = useState<Record<string, string>>({});

  // Flagged questions
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Calculated Exam Result
  const [scoreResult, setScoreResult] = useState<{
    totalScore: number;
    part1Score: number;
    part2Score: number;
    part3Score: number;
    correctCount: number;
    topicBreakdown: Record<string, { total: number; correct: number }>;
  } | null>(null);

  const currentQuestion = EXAM_2026_QUESTIONS[currentQIndex];

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (examStarted && !examSubmitted && isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, examSubmitted, isTimerRunning, timeLeft]);

  const handleStartExam = () => {
    setExamStarted(true);
    setIsTimerRunning(true);
    setTimeLeft(3000);
    setAnswersP1({});
    setAnswersP2({});
    setAnswersP3({});
    setFlaggedQuestions({});
    setExamSubmitted(false);
    setScoreResult(null);
  };

  const toggleFlag = (id: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Grade Exam
  const handleSubmitExam = () => {
    setIsTimerRunning(false);
    setExamSubmitted(true);

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let correctCount = 0;
    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    EXAM_2026_QUESTIONS.forEach(q => {
      const topic = q.topic.split(' - ')[0] || q.topic;
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[topic].total += 1;

      if (q.type === 'single_choice') {
        const userChoice = answersP1[q.id];
        if (userChoice === q.correctAnswer) {
          p1 += 0.25;
          correctCount += 1;
          topicBreakdown[topic].correct += 1;
        } else if (onSaveMistake) {
          onSaveMistake(q.id);
        }
      } else if (q.type === 'true_false_group') {
        const userChoices = answersP2[q.id] || {};
        let subCorrectCount = 0;

        q.subStatements?.forEach(sub => {
          if (userChoices[sub.id] === sub.isCorrect) {
            subCorrectCount += 1;
          }
        });

        // 2026 Official Scoring Scale for 4 statements:
        // 1 đúng -> 0.1 đ; 2 đúng -> 0.25 đ; 3 đúng -> 0.5 đ; 4 đúng -> 1.0 đ
        if (subCorrectCount === 1) p2 += 0.1;
        else if (subCorrectCount === 2) p2 += 0.25;
        else if (subCorrectCount === 3) p2 += 0.5;
        else if (subCorrectCount === 4) {
          p2 += 1.0;
          correctCount += 1;
          topicBreakdown[topic].correct += 1;
        }

        if (subCorrectCount < 4 && onSaveMistake) {
          onSaveMistake(q.id);
        }
      } else if (q.type === 'short_answer') {
        const userAns = (answersP3[q.id] || '').trim().replace(',', '.');
        const correctAns = (q.correctAnswer || '').trim().replace(',', '.');

        if (userAns && Math.abs(parseFloat(userAns) - parseFloat(correctAns)) < 0.05) {
          p3 += 0.25;
          correctCount += 1;
          topicBreakdown[topic].correct += 1;
        } else if (onSaveMistake) {
          onSaveMistake(q.id);
        }
      }
    });

    const total = parseFloat((p1 + p2 + p3).toFixed(2));
    setScoreResult({
      totalScore: total,
      part1Score: parseFloat(p1.toFixed(2)),
      part2Score: parseFloat(p2.toFixed(2)),
      part3Score: parseFloat(p3.toFixed(2)),
      correctCount,
      topicBreakdown,
    });

    if (total >= 8.0) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner if not started */}
      {!examStarted ? (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Cấu trúc chuẩn Bộ Giáo Dục & Đào Tạo 2026
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              Đề Thi Thử Tốt Nghiệp THPT Môn Hóa Học 12 (Đề Số 01)
            </h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
              Thời gian làm bài: <strong>50 phút</strong> • Gồm 28 câu hỏi chia làm 3 phần chuẩn hóa:
              Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai và Trả lời ngắn tính toán.
            </p>
          </div>

          {/* Exam Structure Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-sky-600 uppercase">Phần I: 18 Câu</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Trắc nghiệm 4 lựa chọn</h4>
              <p className="text-[11px] text-slate-500 mt-1">Mỗi câu 0.25 điểm. Tối đa 4.5 điểm.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-indigo-600 uppercase">Phần II: 4 Câu</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Đúng / Sai (Mỗi câu 4 ý)</h4>
              <p className="text-[11px] text-slate-500 mt-1">Điểm lũy tiến: 0.1, 0.25, 0.5, 1.0 đ/câu. Tối đa 4.0 điểm.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-emerald-600 uppercase">Phần III: 6 Câu</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Trả lời ngắn / Điền số</h4>
              <p className="text-[11px] text-slate-500 mt-1">Mỗi câu 0.25 điểm. Tối đa 1.5 điểm.</p>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            Bắt đầu làm bài thi (Tính giờ 50 phút)
          </button>
        </div>
      ) : (
        /* Exam in Progress / Result Screen */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Working Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Bar with Timer & Status */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Câu hỏi {currentQIndex + 1} / {EXAM_2026_QUESTIONS.length}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                  {currentQuestion.level}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {currentQuestion.topic}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFlag(currentQuestion.id)}
                  className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                    flaggedQuestions[currentQuestion.id]
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Đánh dấu câu hỏi cần xem lại"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xem lại</span>
                </button>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                  <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-sky-600'}`} />
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                <strong className="text-sky-600 mr-2">Câu {currentQIndex + 1}:</strong>
                {currentQuestion.prompt}
              </div>

              {/* Render Type 1: 4 Options Single Choice */}
              {currentQuestion.type === 'single_choice' && currentQuestion.options && (
                <div className="space-y-2.5">
                  {currentQuestion.options.map(opt => {
                    const isSelected = answersP1[currentQuestion.id] === opt.key;
                    const isCorrect = currentQuestion.correctAnswer === opt.key;
                    let optionStyle = 'border-slate-200 dark:border-slate-700 hover:border-sky-300';

                    if (isSelected) {
                      optionStyle = 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200';
                    }

                    if (examSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        disabled={examSubmitted}
                        onClick={() =>
                          setAnswersP1(prev => ({
                            ...prev,
                            [currentQuestion.id]: opt.key,
                          }))
                        }
                        className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {examSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Render Type 2: True / False 4 sub-statements */}
              {currentQuestion.type === 'true_false_group' && currentQuestion.subStatements && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase">
                    Chọn Đúng hoặc Sai cho mỗi nhận định sau:
                  </div>

                  {currentQuestion.subStatements.map(sub => {
                    const currentVal = answersP2[currentQuestion.id]?.[sub.id];
                    return (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-2 flex-1">
                          <span className="font-bold font-mono text-sky-600">{sub.id})</span>
                          <span className="text-slate-800 dark:text-slate-200">{sub.statement}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            disabled={examSubmitted}
                            onClick={() =>
                              setAnswersP2(prev => ({
                                ...prev,
                                [currentQuestion.id]: {
                                  ...(prev[currentQuestion.id] || {}),
                                  [sub.id]: true,
                                },
                              }))
                            }
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                              currentVal === true
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            Đúng
                          </button>

                          <button
                            disabled={examSubmitted}
                            onClick={() =>
                              setAnswersP2(prev => ({
                                ...prev,
                                [currentQuestion.id]: {
                                  ...(prev[currentQuestion.id] || {}),
                                  [sub.id]: false,
                                },
                              }))
                            }
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                              currentVal === false
                                ? 'bg-rose-600 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            Sai
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Render Type 3: Short answer numeric input */}
              {currentQuestion.type === 'short_answer' && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-500 uppercase">
                    Nhập câu trả lời hoặc số tính được:
                  </label>
                  <div className="flex gap-2 max-w-xs">
                    <input
                      type="text"
                      disabled={examSubmitted}
                      value={answersP3[currentQuestion.id] || ''}
                      onChange={e =>
                        setAnswersP3(prev => ({
                          ...prev,
                          [currentQuestion.id]: e.target.value,
                        }))
                      }
                      placeholder="VD: 12.8, 2, 45..."
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  {examSubmitted && (
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Đáp án chính xác: {currentQuestion.correctAnswer}
                    </div>
                  )}
                </div>
              )}

              {/* Show Detailed Solution if Submitted */}
              {examSubmitted && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2 mt-4">
                  <div className="font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Lời giải chi tiết & Phương pháp tư duy:
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-30 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Câu trước
                </button>

                <button
                  disabled={currentQIndex === EXAM_2026_QUESTIONS.length - 1}
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-30 transition-colors flex items-center gap-1"
                >
                  Câu kế tiếp
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Navigation Grid & Submit Column */}
          <div className="lg:col-span-1 space-y-4">
            {/* Score Summary Box if Submitted */}
            {examSubmitted && scoreResult && (
              <div className="glass-panel p-5 rounded-2xl shadow-sm border border-emerald-300 dark:border-emerald-800 space-y-3">
                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-500">Điểm tổng kết:</span>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                    {scoreResult.totalScore} / 10.0
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Số câu chuẩn: {scoreResult.correctCount}/{EXAM_2026_QUESTIONS.length}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs border-t border-slate-200 dark:border-slate-800 pt-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phần I (Trắc nghiệm):</span>
                    <span className="font-mono font-semibold">{scoreResult.part1Score} / 4.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phần II (Đúng/Sai):</span>
                    <span className="font-mono font-semibold">{scoreResult.part2Score} / 4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phần III (Trả lời ngắn):</span>
                    <span className="font-mono font-semibold">{scoreResult.part3Score} / 1.5</span>
                  </div>
                </div>

                <button
                  onClick={handleStartExam}
                  className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Làm lại bài thi
                </button>
              </div>
            )}

            {/* Questions Jump Grid */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Danh sách câu hỏi</span>
                <span className="text-[11px] font-normal text-slate-400">
                  Đã làm: {Object.keys(answersP1).length + Object.keys(answersP2).length + Object.keys(answersP3).length}/{EXAM_2026_QUESTIONS.length}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {EXAM_2026_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered =
                    answersP1[q.id] !== undefined ||
                    answersP2[q.id] !== undefined ||
                    (answersP3[q.id] || '').trim() !== '';
                  const isFlagged = flaggedQuestions[q.id];

                  let btnColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                  if (isAnswered) btnColor = 'bg-sky-600 text-white';
                  if (isFlagged) btnColor = 'bg-amber-400 text-amber-950 font-bold';
                  if (isCurrent) btnColor += ' ring-2 ring-sky-400 font-bold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${btnColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {!examSubmitted && (
                <button
                  onClick={handleSubmitExam}
                  className="w-full mt-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Nộp bài và chấm điểm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
