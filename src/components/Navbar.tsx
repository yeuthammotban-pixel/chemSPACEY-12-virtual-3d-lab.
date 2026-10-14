import React, { useState } from 'react';
import { TextbookCode } from '../types/chemistry';
import { FlaskConical, Search, Moon, Sun, Flame, BookOpen, Brain, Award, Calculator, Bot, Bookmark, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  activeTextbook: TextbookCode;
  onChangeTextbook: (book: TextbookCode) => void;
  streakDays: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onGlobalSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  activeTextbook,
  onChangeTextbook,
  streakDays,
  isDarkMode,
  onToggleDarkMode,
  onGlobalSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const textbooks: { id: TextbookCode; label: string }[] = [
    { id: 'ket_noi', label: 'Kết nối tri thức' },
    { id: 'canh_dieu', label: 'Cánh Diều' },
    { id: 'chan_troi', label: 'Chân trời sáng tạo' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: BookOpen },
    { id: 'curriculum', label: 'Bài học', icon: BookOpen },
    { id: 'lab', label: 'Lab 3D', icon: FlaskConical },
    { id: 'flashcards', label: 'Ghi nhớ', icon: Brain },
    { id: 'exam', label: 'Thi thử 2026', icon: Award },
    { id: 'tools', label: 'Công cụ', icon: Calculator },
    { id: 'ai', label: 'Trợ lý AI', icon: Bot },
    { id: 'notebook', label: 'Sổ tay', icon: Bookmark },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onGlobalSearch(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo Brand */}
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm md:text-base tracking-tight bg-gradient-to-r from-sky-700 to-indigo-600 dark:from-sky-400 dark:to-indigo-300 bg-clip-text text-transparent">
                CHEMISTRY 12 LAB
              </div>
              <div className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
                HỌC HÓA BẰNG TƯ DUY & TRẢI NGHIỆM
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs relative mx-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Tìm bài học, chất, phản ứng, thí nghiệm..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-500 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none transition-all"
            />
          </form>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utility: Textbook switcher, streak, dark mode */}
          <div className="flex items-center gap-2">
            {/* Textbook Switcher Dropdown */}
            <div className="relative">
              <select
                value={activeTextbook}
                onChange={e => onChangeTextbook(e.target.value as TextbookCode)}
                className="pl-2 pr-6 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer appearance-none"
              >
                {textbooks.map(tb => (
                  <option key={tb.id} value={tb.id}>
                    SGK: {tb.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Streak Counter */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-xs font-bold"
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streakDays}</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm bài học, công thức..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </form>

            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
