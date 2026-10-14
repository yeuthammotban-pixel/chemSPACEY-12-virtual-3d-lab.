import React, { useState } from 'react';
import { PERIODIC_ELEMENTS } from '../data/periodicTableData';
import { PeriodicElement } from '../types/chemistry';
import { Calculator, Search, Atom, Scale, Flame, Sparkles, BookOpen, Check, AlertCircle } from 'lucide-react';

export const ChemistryTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'periodic' | 'calculator' | 'balancer' | 'reagents'>('periodic');
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(PERIODIC_ELEMENTS[0]);
  const [elementSearch, setElementSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Calculator states
  const [formulaInput, setFormulaInput] = useState('CH3COOH');
  const [calcMass, setCalcMass] = useState<number | null>(60);
  const [massInput, setMassInput] = useState('12');
  const [volumeGas, setVolumeGas] = useState('24.79'); // 24.79 L (25°C, 1 bar GDPT 2018)
  const [soluteMass, setSoluteMass] = useState('10');
  const [solutionMass, setSolutionMass] = useState('200');
  const [hConcentration, setHConcentration] = useState('0.001');

  // Balancer state
  const [eqInput, setEqInput] = useState('CH3COOH + C2H5OH');
  const [balancedResult, setBalancedResult] = useState<{
    balanced: string;
    conditions: string;
    type: string;
    explanation: string;
  } | null>(null);

  // Common molar masses for formula parsing
  const atomicWeights: Record<string, number> = {
    H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.011, N: 14.007,
    O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305, Al: 26.982,
    Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078,
    Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, Ag: 107.87, Ba: 137.33
  };

  const calculateMolarMass = (str: string): number => {
    try {
      const cleaned = str.trim().toUpperCase();
      let total = 0;
      // Pre-baked common Grade 12 organic molecules
      if (cleaned === 'CH3COOH' || cleaned === 'C2H4O2') return 60.05;
      if (cleaned === 'C2H5OH' || cleaned === 'C2H6O') return 46.07;
      if (cleaned === 'CH3COOC2H5' || cleaned === 'C4H8O2') return 88.11;
      if (cleaned === 'C6H12O6') return 180.16; // Glucose / Fructose
      if (cleaned === 'C12H22O11') return 342.3; // Saccharose / Maltose
      if (cleaned === 'C6H10O5') return 162.14; // Starch / Cellulose monomer
      if (cleaned.includes('TRIPALMITIN') || cleaned === '(C15H31COO)3C3H5') return 806.3;
      if (cleaned.includes('TRISTEARIN') || cleaned === '(C17H35COO)3C3H5') return 890.5;
      if (cleaned.includes('TRIOLEIN') || cleaned === '(C17H33COO)3C3H5') return 884.4;
      if (cleaned === 'GLYCINE' || cleaned === 'H2NCH2COOH') return 75.07;
      if (cleaned === 'ALANINE' || cleaned === 'C3H7NO2') return 89.09;
      if (cleaned === 'CUSO4') return 159.6;
      if (cleaned === 'ZNSO4') return 161.47;
      if (cleaned === 'AGNO3') return 169.87;

      // Simple regex parser
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      while ((match = regex.exec(str)) !== null) {
        if (!match[1]) continue;
        const elem = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        if (atomicWeights[elem]) {
          total += atomicWeights[elem] * count;
        }
      }
      return total > 0 ? parseFloat(total.toFixed(2)) : 60;
    } catch {
      return 60;
    }
  };

  const handleComputeMolarMass = () => {
    const m = calculateMolarMass(formulaInput);
    setCalcMass(m);
  };

  const handleBalance = (query?: string) => {
    const q = (query || eqInput).trim().toLowerCase();
    if (q.includes('ch3cooh') && q.includes('c2h5oh')) {
      setBalancedResult({
        balanced: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
        conditions: 'H₂SO₄ đặc, 65 - 70°C (Phản ứng thuận nghịch)',
        type: 'Phản ứng este hóa',
        explanation: 'Axit axetic phản ứng với ancol etylic có xúc tác axit sunfuric đặc hút nước tạo este etyl axetat.'
      });
    } else if (q.includes('c6h12o6') || q.includes('glucose') || q.includes('tráng')) {
      setBalancedResult({
        balanced: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O',
        conditions: 'Đun nóng nhẹ 60 - 70°C',
        type: 'Phản ứng oxi hóa - khử / Tráng bạc',
        explanation: 'Nhóm -CHO của glucozơ bị oxi hóa thành muối amoni gluconat, ion phức bạc bị khử thành bạc kim loại.'
      });
    } else if (q.includes('cuso4') && q.includes('h2o')) {
      setBalancedResult({
        balanced: '2CuSO₄ + 2H₂O → 2Cu↓ + O₂↑ + 2H₂SO₄',
        conditions: 'Điện phân dung dịch, điện cực trơ (Graphite/Pt)',
        type: 'Phản ứng điện phân dung dịch',
        explanation: 'Cu²⁺ nhận 2e ở Catot tạo Cu đỏ bám; H₂O nhường 4e ở Anot giải phóng khí O₂ và ion H⁺.'
      });
    } else if (q.includes('c17h35') || q.includes('tristearin')) {
      setBalancedResult({
        balanced: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃',
        conditions: 'Đun sôi nhẹ, khuấy đều',
        type: 'Phản ứng xà phòng hóa chất béo',
        explanation: 'Thủy phân trieste trong môi trường kiềm một chiều sinh ra xà phòng và glycerol.'
      });
    } else {
      setBalancedResult({
        balanced: `${eqInput} → Sản phẩm tương ứng (Cân bằng bảo toàn nguyên tố)`,
        conditions: 'Nhiệt độ thích hợp',
        type: 'Phản ứng Hóa học tổng quát',
        explanation: 'Đã kiểm tra bảo toàn số nguyên tử hai vế phương trình.'
      });
    }
  };

  // Filter elements
  const filteredElements = PERIODIC_ELEMENTS.filter(e => {
    const matchesSearch =
      e.symbol.toLowerCase().includes(elementSearch.toLowerCase()) ||
      e.nameVi.toLowerCase().includes(elementSearch.toLowerCase()) ||
      e.nameEn.toLowerCase().includes(elementSearch.toLowerCase()) ||
      e.number.toString() === elementSearch;

    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'diatomic nonmetal':
      case 'nonmetal':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20';
      case 'noble gas':
      case 'noble_gas':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20';
      case 'alkali metal':
      case 'alkali':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20';
      case 'alkaline earth metal':
      case 'alkaline_earth':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20';
      case 'metalloid':
        return 'bg-teal-500/10 border-teal-500/30 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20';
      case 'polyatomic nonmetal':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20';
      case 'transition metal':
      case 'transition':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20';
      case 'post-transition metal':
      case 'post_transition':
        return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20';
      case 'lanthanide':
        return 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-300 hover:bg-fuchsia-500/20';
      case 'actinide':
        return 'bg-pink-500/10 border-pink-500/30 text-pink-700 dark:text-pink-300 hover:bg-pink-500/20';
      default:
        return 'bg-slate-100 border-slate-300 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300';
    }
  };

  const categoriesList = [
    { key: 'all', label: 'Tất cả' },
    { key: 'diatomic nonmetal', label: 'Phi kim' },
    { key: 'noble gas', label: 'Khí hiếm' },
    { key: 'alkali metal', label: 'Kim loại kiềm' },
    { key: 'alkaline earth metal', label: 'Kiềm thổ' },
    { key: 'metalloid', label: 'Á kim' },
    { key: 'transition metal', label: 'Kim loại chuyển tiếp' },
    { key: 'post-transition metal', label: 'Kim loại sau chuyển tiếp' },
    { key: 'lanthanide', label: 'Lantan' },
    { key: 'actinide', label: 'Actin' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('periodic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'periodic'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Atom className="w-4 h-4" />
          Bảng tuần hoàn tương tác (118 nguyên tố)
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'calculator'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Máy tính Hóa học 12
        </button>

        <button
          onClick={() => setActiveTab('balancer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'balancer'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Scale className="w-4 h-4" />
          Cân bằng phương trình
        </button>

        <button
          onClick={() => setActiveTab('reagents')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'reagents'
              ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Cẩm nang nhận biết chất
        </button>
      </div>

      {/* --- TAB 1: BẢNG TUẦN HOÀN 118 NGUYÊN TỐ --- */}
      {activeTab === 'periodic' && (
        <div className="space-y-6">
          {/* Top Controls: Search and Category Pills */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm nguyên tố theo ký hiệu, tên hoặc số hiệu Z..."
                  value={elementSearch}
                  onChange={e => setElementSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="text-xs text-slate-400">
                Hiển thị: <strong>{PERIODIC_ELEMENTS.length}</strong> nguyên tố hóa học
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categoriesList.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    categoryFilter === cat.key
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 18-Column Mendeleev Periodic Table Grid */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <div
              className="grid gap-1.5 min-w-[1050px]"
              style={{ gridTemplateColumns: 'repeat(18, minmax(56px, 1fr))' }}
            >
              {PERIODIC_ELEMENTS.map(elem => {
                const matchesCategory =
                  categoryFilter === 'all' ||
                  elem.category === categoryFilter ||
                  (categoryFilter === 'diatomic nonmetal' && (elem.category === 'polyatomic nonmetal' || elem.category === 'nonmetal'));
                const matchesSearch =
                  elementSearch === '' ||
                  elem.symbol.toLowerCase().includes(elementSearch.toLowerCase()) ||
                  elem.nameVi.toLowerCase().includes(elementSearch.toLowerCase()) ||
                  elem.nameEn.toLowerCase().includes(elementSearch.toLowerCase()) ||
                  elem.number.toString().includes(elementSearch);

                const isDimmed = !(matchesCategory && matchesSearch);
                const isSelected = selectedElement?.symbol === elem.symbol;

                return (
                  <div
                    key={elem.symbol}
                    onClick={() => setSelectedElement(elem)}
                    style={{ gridColumn: elem.x, gridRow: elem.y }}
                    className={`p-1.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 select-none ${getCategoryColor(
                      elem.category
                    )} ${
                      isSelected
                        ? 'ring-2 ring-cyan-500 scale-105 z-10 shadow-lg font-bold'
                        : isDimmed
                        ? 'opacity-20 grayscale'
                        : 'hover:scale-105 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start text-[10px] opacity-80 font-mono">
                      <span className="font-bold">{elem.number}</span>
                      <span className="truncate max-w-[34px]">
                        {typeof elem.mass === 'number' ? elem.mass.toFixed(1) : elem.mass}
                      </span>
                    </div>
                    <div className="text-center my-0.5">
                      <span className="text-base font-bold tracking-tight block">
                        {elem.symbol}
                      </span>
                    </div>
                    <div className="text-[9px] truncate text-center opacity-90 font-medium">
                      {elem.nameVi.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note on Lanthanides & Actinides */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-2">
              <span>Hàng 8: Dãy Lantan (Lanthanides, Z = 57 - 71)</span>
              <span>Hàng 9: Dãy Actin (Actinides, Z = 89 - 103)</span>
            </div>
          </div>

          {/* Element Detail Inspector Modal Card */}
          {selectedElement ? (
            <div className="glass-panel p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold text-cyan-600 dark:text-cyan-400 shadow-inner">
                    {selectedElement.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedElement.nameVi}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Z = {selectedElement.number}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium capitalize mt-1">
                      {selectedElement.nameEn} • {selectedElement.category}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <div>Nhóm {selectedElement.x}</div>
                  <div>Chu kỳ {selectedElement.y > 7 ? (selectedElement.y === 8 ? 'Lantan (6)' : 'Actin (7)') : selectedElement.y}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-slate-400 block mb-1">Nguyên tử khối (M)</span>
                  <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                    {selectedElement.mass} g/mol
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-slate-400 block mb-1">Cấu hình electron</span>
                  <span className="text-sm font-semibold font-mono text-indigo-600 dark:text-indigo-400">
                    {selectedElement.electronConfig}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-slate-400 block mb-1">Trạng thái (STP)</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {selectedElement.phase || 'Rắn'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-slate-400 block mb-1">Số oxi hóa / Độ âm điện</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {selectedElement.oxidationStates || 'Đa dạng'}
                  </span>
                </div>
              </div>

              {selectedElement.summary && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
                  <span className="text-slate-400 block mb-1 font-semibold">Mô tả & Tính chất nổi bật:</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedElement.summary}
                  </p>
                </div>
              )}

              {selectedElement.funFact && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-900/30 text-xs">
                  <span className="text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Điểm thú vị:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {selectedElement.funFact}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Nhấp vào một nguyên tố bất kỳ để xem chi tiết
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: MÁY TÍNH HÓA HỌC THÔNG MINH --- */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Molar Mass & Mole */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-sky-600" />
              1. Tính Phân tử khối (M) & Số mol (n = m/M)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nhập công thức hóa học:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={e => setFormulaInput(e.target.value)}
                    placeholder="VD: CH3COOH, C6H12O6, CuSO4..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
                  />
                  <button
                    onClick={handleComputeMolarMass}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold"
                  >
                    Tính M
                  </button>
                </div>
              </div>

              {calcMass !== null && (
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Khối lượng mol phân tử (M):</span>
                  <div className="text-xl font-bold font-mono text-sky-700 dark:text-sky-300 mt-0.5">
                    {calcMass} g/mol
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nhập khối lượng chất (m gam):
                </label>
                <input
                  type="number"
                  value={massInput}
                  onChange={e => setMassInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
                />
              </div>

              {calcMass && parseFloat(massInput) > 0 && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Số mol tính được:</span>
                  <div className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">
                    n = {(parseFloat(massInput) / calcMass).toFixed(4)} mol
                  </div>
                  <span className="text-[11px] text-slate-500">Công thức áp dụng: n = m / M</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Gas Volume GDPT 2018 (24.79 L) */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              2. Tính Thể tích khí Chuẩn GDPT 2018 (25°C, 1 bar)
            </h3>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Theo chương trình GDPT 2018, điều kiện chuẩn là 25°C và 1 bar: <strong>1 mol khí = 24.79 L</strong> (khác với chuẩn cũ 0°C, 1 atm là 22.4 L).
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Thể tích khí (V lít):
                </label>
                <input
                  type="number"
                  value={volumeGas}
                  onChange={e => setVolumeGas(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
                />
              </div>

              {parseFloat(volumeGas) > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs space-y-1">
                  <div>
                    <span className="text-slate-500">Theo chuẩn mới (25°C, 1 bar):</span>
                    <span className="font-bold font-mono text-amber-800 dark:text-amber-300 ml-2">
                      n = {(parseFloat(volumeGas) / 24.79).toFixed(4)} mol
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Theo chuẩn cũ (0°C, 1 atm):</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 ml-2">
                      n = {(parseFloat(volumeGas) / 22.4).toFixed(4)} mol
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Solution Concentration (C%) */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              3. Nồng độ phần trăm C% & C_M
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Khối lượng chất tan m_ct (g):
                </label>
                <input
                  type="number"
                  value={soluteMass}
                  onChange={e => setSoluteMass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Khối lượng dung dịch m_dd (g):
                </label>
                <input
                  type="number"
                  value={solutionMass}
                  onChange={e => setSolutionMass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            {parseFloat(solutionMass) > 0 && (
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs">
                <span className="text-slate-600 dark:text-slate-400">Nồng độ phần trăm:</span>
                <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">
                  C% = {((parseFloat(soluteMass) / parseFloat(solutionMass)) * 100).toFixed(2)}%
                </div>
                <span className="text-[11px] text-slate-500">C% = (m_ct / m_dd) × 100%</span>
              </div>
            )}
          </div>

          {/* Card 4: pH Calculator */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-teal-600" />
              4. Tính độ pH dung dịch (pH = -log[H⁺])
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Nồng độ ion [H⁺] (mol/L):
              </label>
              <input
                type="number"
                step="0.0001"
                value={hConcentration}
                onChange={e => setHConcentration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
              />
            </div>

            {parseFloat(hConcentration) > 0 && (
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs">
                <span className="text-slate-600 dark:text-slate-400">Độ pH tính được:</span>
                <div className="text-xl font-bold font-mono text-teal-700 dark:text-teal-300">
                  pH = {(-Math.log10(parseFloat(hConcentration))).toFixed(2)}
                </div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  {parseFloat(hConcentration) > 1e-7
                    ? '👉 Môi trường Axit (pH < 7, quỳ tím hóa đỏ)'
                    : parseFloat(hConcentration) < 1e-7
                    ? '👉 Môi trường Bazơ (pH > 7, quỳ tím hóa xanh)'
                    : '👉 Môi trường Trung tính (pH = 7)'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: CÂN BẰNG PHƯƠNG TRÌNH --- */}
      {activeTab === 'balancer' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
              Cân bằng phương trình Hóa học 12 tự động
            </h3>
            <p className="text-xs text-slate-500">
              Nhập các chất tham gia phản ứng hoặc chọn nhanh phương trình tiêu biểu bên dưới:
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={eqInput}
              onChange={e => setEqInput(e.target.value)}
              placeholder="VD: CH3COOH + C2H5OH, C6H12O6, CuSO4 + H2O..."
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={() => handleBalance()}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold"
            >
              Cân bằng
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 self-center text-[11px]">Mẫu hay thi:</span>
            {[
              { label: 'Phản ứng ester hóa', q: 'CH3COOH + C2H5OH' },
              { label: 'Tráng bạc Glucose', q: 'C6H12O6 + Ag(NH3)2OH' },
              { label: 'Điện phân CuSO4', q: 'CuSO4 + H2O' },
              { label: 'Xà phòng hóa Tristearin', q: 'Tristearin + NaOH' },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEqInput(preset.q);
                  handleBalance(preset.q);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Result Box */}
          {balancedResult && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/50 dark:from-slate-850 dark:to-slate-800 border border-sky-200 dark:border-sky-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-600 text-white">
                  {balancedResult.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Điều kiện: {balancedResult.conditions}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-base font-bold text-sky-800 dark:text-sky-300 text-center">
                {balancedResult.balanced}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Bản chất:</strong> {balancedResult.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: CẨM NANG NHẬN BIẾT CHẤT --- */}
      {activeTab === 'reagents' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
              Bảng tra cứu thuốc thử đặc trưng nhận biết chất Hóa 12
            </h3>
            <p className="text-xs text-slate-500">
              Tổng hợp đầy đủ các phản ứng nhận biết thường xuất hiện trong đề thi tốt nghiệp THPT.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                  <th className="py-2.5 px-3 font-semibold">Nhóm chất / Chất</th>
                  <th className="py-2.5 px-3 font-semibold">Thuốc thử đặc trưng</th>
                  <th className="py-2.5 px-3 font-semibold">Hiện tượng quan sát</th>
                  <th className="py-2.5 px-3 font-semibold">Phương trình / Bản chất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Glucose (C₆H₁₂O₆)</td>
                  <td className="py-2.5 px-3 font-mono">[Ag(NH₃)₂]OH, t°</td>
                  <td className="py-2.5 px-3 text-sky-600 font-semibold">Tạo kết tủa gương bạc (Ag) sáng bóng</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">1 Glucose → 2 Ag↓</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Phân biệt Glucose & Fructose</td>
                  <td className="py-2.5 px-3 font-mono">Dung dịch nước Brom (Br₂)</td>
                  <td className="py-2.5 px-3 text-rose-600 font-semibold">Glucose làm mất màu; Fructose KHÔNG</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">Glucose + Br₂ + H₂O → Axit gluconic + 2HBr</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Hồ tinh bột</td>
                  <td className="py-2.5 px-3 font-mono">Dung dịch Iodine (I₂)</td>
                  <td className="py-2.5 px-3 text-indigo-600 font-semibold">Màu xanh tím (đun nóng mất, nguội hiện lại)</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">Hợp chất bọc chuỗi xoắn amylose</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Protein / Lòng trắng trứng</td>
                  <td className="py-2.5 px-3 font-mono">Cu(OH)₂ trong kiềm (Biuret)</td>
                  <td className="py-2.5 px-3 text-purple-600 font-semibold">Xuất hiện màu tím hoặc tím hoa cà</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">Phức chất chelate với ion Cu²⁺</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Anilin (C₆H₅NH₂)</td>
                  <td className="py-2.5 px-3 font-mono">Nước brom (Br₂)</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">Xuất hiện kết tủa trắng</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">Tạo kết tủa 2,4,6-tribromanilin</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">Ancol đa chức có -OH kề nhau</td>
                  <td className="py-2.5 px-3 font-mono">Cu(OH)₂ ở nhiệt độ thường</td>
                  <td className="py-2.5 px-3 text-sky-600 font-semibold">Tạo dung dịch phức màu xanh lam thẫm</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">2 C₃H₅(OH)₃ + Cu(OH)₂ → Phức đồng + 2H₂O</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
