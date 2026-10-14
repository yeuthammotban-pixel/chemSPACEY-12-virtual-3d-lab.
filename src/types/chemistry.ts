export type TextbookCode = 'ket_noi' | 'canh_dieu' | 'chan_troi';

export interface TextbookInfo {
  id: TextbookCode;
  name: string;
  publisher: string;
  description: string;
}

export type QuestionLevel = 'NB' | 'TH' | 'VD' | 'VDC'; // Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao
export type QuestionType = 'single_choice' | 'true_false_group' | 'short_answer';

export interface SubStatement {
  id: string; // 'a' | 'b' | 'c' | 'd'
  statement: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  lessonId?: string;
  chapterId?: string;
  topic: string;
  level: QuestionLevel;
  type: QuestionType;
  prompt: string;
  options?: { key: string; text: string }[];
  correctAnswer?: string; // e.g. 'A' or number for short answer
  subStatements?: SubStatement[]; // For true_false_group (4 items a,b,c,d)
  explanation: string;
  hints?: string[];
  commonTrap?: string;
}

export interface CoreConcept {
  title: string;
  explanation: string;
  formulas?: string[];
  keyTakeaway?: string;
}

export interface ChemicalReaction {
  title: string;
  equation: string;
  conditions: string;
  phenomenon: string;
  explanation: string;
}

export interface MindmapNode {
  title: string;
  details?: string[];
  children?: MindmapNode[];
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  examTip: string;
}

export interface LessonTheory {
  objectives: string[];
  coreConcepts: CoreConcept[];
  reactions: ChemicalReaction[];
  mindmap: MindmapNode;
  comparisonTable?: ComparisonTable;
  commonMistakes: CommonMistake[];
  onePageSummary: string[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  prerequisites: string[];
  theory: LessonTheory;
  exercises: Question[];
  relatedExperimentId?: string;
  bookPageMap?: Record<TextbookCode, string>;
}

export interface Chapter {
  id: string;
  order: number;
  title: string;
  tagline: string;
  color: string;
  iconName: string;
  lessons: Lesson[];
}

export interface ExperimentStep {
  stepNumber: number;
  title: string;
  instruction: string;
  actionType: 'add_reagent' | 'heat' | 'stir' | 'connect_circuit' | 'observe';
  reagentName?: string;
  reagentAmount?: string;
  phenomenon: string;
  explanation: string;
  reactionEquation?: string;
  liquidColor?: string;
  precipitateColor?: string;
  bubbles?: boolean;
  temperature?: number;
  mirrorCoating?: boolean;
}

export interface Experiment {
  id: string;
  title: string;
  category: string;
  chapterId: string;
  lessonId: string;
  objective: string;
  apparatus: string[];
  chemicals: string[];
  safetyNotes: string[];
  steps: ExperimentStep[];
  mechanismExplanation: string;
  balancedEquations: string[];
  quizQuestions: Question[];
}

export interface Flashcard {
  id: string;
  chapterId: string;
  topic: string;
  category: 'Công thức' | 'Phản ứng' | 'Hiện tượng' | 'Bẫy đề thi' | 'Định nghĩa';
  front: string;
  back: string;
  hint?: string;
  interval: number; // in days
  repetition: number;
  easeFactor: number;
  dueDate: string; // ISO date string
}

export interface UserProgress {
  completedLessons: string[];
  lessonScores: Record<string, number>;
  streakDays: number;
  lastStudyDate: string;
  flashcardStates: Record<string, { interval: number; repetition: number; easeFactor: number; dueDate: string }>;
  mistakeBookIds: string[];
  notes: Record<string, string>; // lessonId -> note string
  examHistory: {
    id: string;
    date: string;
    score: number;
    totalQuestions: number;
    correctCount: number;
    part1Score: number;
    part2Score: number;
    part3Score: number;
    timeSpentSeconds: number;
  }[];
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  nameVi: string;
  nameEn: string;
  name?: string;
  mass: number | string;
  group: number;
  period: number;
  x: number;
  y: number;
  category: string;
  electronConfig: string;
  oxidationStates?: string;
  electronegativity?: number;
  commonCompounds?: string[];
  funFact?: string;
  phase?: string;
  summary?: string;
}

