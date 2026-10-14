import { Chapter } from '../types/chemistry';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'chuong-1-ester-lipid',
    order: 1,
    title: 'Chương 1: Ester – Lipid. Xà phòng & Chất giặt rửa',
    tagline: 'Khám phá liên kết ester, phản ứng xà phòng hóa và ứng dụng hương liệu',
    color: 'from-amber-500 to-rose-500',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'bai-1-ester',
        chapterId: 'chuong-1-ester-lipid',
        title: 'Bài 1: Ester (Este) & Tính chất hóa học',
        subtitle: 'Cấu tạo nhóm carboxyl biến tính, phản ứng ester hóa & thủy phân',
        estimatedMinutes: 45,
        difficulty: 'Cơ bản',
        prerequisites: ['Axit cacboxylic (Lớp 11)', 'Ancol (Lớp 11)', 'Cân bằng chuyển dịch Le Chatelier'],
        relatedExperimentId: 'exp-esterification',
        bookPageMap: {
          ket_noi: 'Trang 6 - 12 (KNTT Tập 1)',
          canh_dieu: 'Trang 4 - 10 (Cánh Diều Tập 1)',
          chan_troi: 'Trang 8 - 15 (CTST Tập 1)',
        },
        theory: {
          objectives: [
            'Nêu được khái niệm, công thức chung và danh pháp IUPAC/thông thường của ester đơn chức no.',
            'Giải thích được tính chất vật lý (nhiệt độ sôi thấp hơn ancol cùng M do không có liên kết hydro liên phân tử).',
            'Viết đúng phương trình phản ứng thủy phân trong môi trường axit và môi trường kiềm (xà phòng hóa).',
            'Trình bày phương pháp điều chế ester và ứng dụng làm dung môi, hương liệu mỹ phẩm.'
          ],
          coreConcepts: [
            {
              title: '1. Khái niệm & Công thức tổng quát',
              explanation: 'Khi thay thế nhóm -OH ở nhóm carboxyl (-COOH) của axit cacboxylic bằng nhóm -OR\' (với R\' là gốc hydrocarbon) thì thu được ester.',
              formulas: [
                'CTĐC ester đơn chức: RCOOR\' (R là H hoặc gốc hydrocarbon; R\' bắt buộc là hydrocarbon)',
                'Ester no, đơn chức, mạch hở: CnH₂nO₂ (n ≥ 2, M = 14n + 32)',
                'Số đồng phân ester CnH₂nO₂: 2ⁿ⁻² (với 2 ≤ n ≤ 5)'
              ],
              keyTakeaway: 'Lưu ý: HCOO-CH₃ là ester đơn giản nhất (Methyl formate, n=2, M=60).'
            },
            {
              title: '2. Tính chất vật lý & So sánh nhiệt độ sôi',
              explanation: 'Các phân tử ester KHÔNG tạo được liên kết hydro giữa các phân tử với nhau, do đó nhiệt độ sôi và độ tan trong nước của ester thấp hơn nhiều so với ancol và axit cacboxylic có cùng số C hoặc cùng phân tử khối.',
              formulas: ['Thứ tự nhiệt độ sôi (cùng C): Axit > Ancol > Ester > Hydrocarbon'],
              keyTakeaway: 'Ester thường là chất lỏng nhẹ hơn nước, ít tan, có mùi thơm hoa quả đặc trưng (Isoamyl acetate: mùi chuối chín; Ethyl butyrate: mùi dứa; Benzyl acetate: mùi hoa nhài).'
            },
            {
              title: '3. Phản ứng thủy phân trong môi trường kiềm (Xà phòng hóa)',
              explanation: 'Phản ứng xà phòng hóa là phản ứng một chiều, diễn ra nhanh khi đun nóng với dung dịch kiềm (NaOH hoặc KOH), sinh ra muối carboxylate và ancol.',
              formulas: ['RCOOR\' + NaOH → RCOONa + R\'OH (đun nóng, phản ứng 1 chiều)'],
              keyTakeaway: 'Nếu R\' là gốc phenyl (C₆H₅-) thì tỉ lệ mol ester : NaOH = 1 : 2 và sinh ra 2 muối + H₂O!'
            }
          ],
          reactions: [
            {
              title: 'Phản ứng ester hóa (Điều chế Ethyl acetate)',
              equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
              conditions: 'Xúc tác H₂SO₄ đặc, đun hồi lưu 65 - 70°C',
              phenomenon: 'Hỗn hợp sau phản ứng có mùi thơm đặc trưng, khi rót vào dung dịch NaCl bão hòa sẽ tách thành 2 lớp (ester nổi lên trên).',
              explanation: 'H₂SO₄ đặc đóng 2 vai trò: làm chất xúc tác cho phản ứng và hút nước làm chuyển dịch cân bằng sang chiều thuận theo nguyên lý Le Chatelier.'
            },
            {
              title: 'Thủy phân ester của phenol (Trường hợp đặc biệt)',
              equation: 'CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O',
              conditions: 'Đun nóng',
              phenomenon: 'Dung dịch đồng nhất sau khi phản ứng hoàn toàn.',
              explanation: 'Ban đầu tạo ra C₆H₅OH (phenol), phenol có tính axit yếu tiếp tục phản ứng ngay với NaOH dư tạo muối phenolate.'
            }
          ],
          mindmap: {
            title: 'ESTER RCOOR\'',
            details: ['CnH₂nO₂ (no, đơn, hở)', 'Nhiệt độ sôi thấp hơn ancol', 'Mùi thơm hoa quả', 'Nhẹ hơn nước'],
            children: [
              {
                title: 'Thủy phân Axit',
                details: ['Xúc tác H₂SO₄ loãng, t°', 'Phản ứng thuận nghịch ⇌', 'Tạo Axit + Ancol']
              },
              {
                title: 'Thủy phân Kiềm (Xà phòng hóa)',
                details: ['Dung dịch NaOH/KOH, t°', 'Phản ứng 1 chiều →', 'Tạo Muối carboxylat + Ancol/Aldehyd']
              },
              {
                title: 'Trường hợp đặc biệt',
                details: ['Ester fomat HCOO- : có tráng bạc', 'Ester vinyl -CH=CH₂ : tạo aldehyde', 'Ester phenyl -C₆H₅ : phản ứng 1:2 NaOH']
              }
            ]
          },
          comparisonTable: {
            title: 'So sánh phản ứng thủy phân của Ester trong môi trường Axit & Kiềm',
            headers: ['Đặc điểm', 'Thủy phân trong môi trường Axit', 'Thủy phân trong môi trường Kiềm'],
            rows: [
              ['Chất phản ứng', 'RCOOR\' + H₂O', 'RCOOR\' + NaOH (hoặc KOH)'],
              ['Điều kiện', 'H₂SO₄ loãng, đun nóng', 'Dung dịch kiềm, đun nóng'],
              ['Đặc điểm phản ứng', 'Thuận nghịch (2 chiều ⇌)', 'Một chiều hoàn toàn (→)'],
              ['Sản phẩm thu được', 'Axit cacboxylic (RCOOH) + Ancol (R\'OH)', 'Muối natri (RCOONa) + Ancol (R\'OH)'],
              ['Trạng thái sau phản ứng', 'Phân lớp (hỗn hợp cân bằng còn ester)', 'Đồng nhất (khi phản ứng vừa đủ/hoàn toàn)']
            ]
          },
          commonMistakes: [
            {
              mistake: 'Quên rằng ester của axit fomic (HCOOR\') có phản ứng tráng bạc.',
              correction: 'Phân tử HCOOR\' vẫn giữ nguyên nhóm chức aldehyde (-CH=O) ở đầu phân tử nên vẫn khử được [Ag(NH₃)₂]OH tạo kết tủa Ag sáng bóng.',
              examTip: 'Đề thi hay hỏi: "Hợp chất C₂H₄O₂ vừa tác dụng với NaOH vừa có phản ứng tráng bạc" -> Đáp án chính xác là Methyl formate (HCOOCH₃).'
            },
            {
              mistake: 'Nghĩ rằng mọi ester khi xà phòng hóa đều tạo ancol.',
              correction: 'Ester có dạng RCOOCH=CH-R\' sẽ sinh ra aldehyde; ester RCOOC(CH₃)=CH₂ sinh ra ketone; ester của phenol sinh ra 2 muối và nước.',
              examTip: 'Nhớ quy tắc gốc không no đính trực tiếp vào oxi carboxyl.'
            }
          ],
          onePageSummary: [
            'Ester đơn chức: RCOOR\' (R\' ≠ H). Ester no, đơn, hở: CnH₂nO₂ (n ≥ 2).',
            'Nhiệt độ sôi: Axit > Ancol > Este > Hydrocacbon.',
            'Thủy phân axit: Thuận nghịch; Thủy phân kiềm: Một chiều.',
            'Ester fomat (HCOOR\') có tráng bạc: 1 mol HCOOR\' → 2 mol Ag.',
            'Ester phenyl (RCOOC₆H₅) + 2NaOH → RCOONa + C₆H₅ONa + H₂O.'
          ]
        },
        exercises: [
          {
            id: 'ex-ester-01',
            topic: 'Ester - Tính chất',
            level: 'NB',
            type: 'single_choice',
            prompt: 'Chất nào sau đây là ester no, đơn chức, mạch hở?',
            options: [
              { key: 'A', text: 'CH₃COOCH₃' },
              { key: 'B', text: 'CH₂=CH-COOCH₃' },
              { key: 'C', text: 'CH₃COOH' },
              { key: 'D', text: 'CH₃COOC₆H₅' }
            ],
            correctAnswer: 'A',
            explanation: 'CH₃COOCH₃ (Methyl acetate) có CTPT là C₃H₆O₂, đúng dạng CnH₂nO₂ (no, đơn chức, mạch hở). Phương án B không no; C là axit; D là ester thơm.',
            hints: ['Áp dụng công thức tổng quát của ester no đơn chức mạch hở là CnH₂nO₂.']
          },
          {
            id: 'ex-ester-02',
            topic: 'Ester - Tính toán xà phòng hóa',
            level: 'TH',
            type: 'single_choice',
            prompt: 'Xà phòng hóa hoàn toàn 8.8 gam ethyl acetate (CH₃COOC₂H₅, M = 88) bằng dung dịch NaOH vừa đủ. Khối lượng muối CH₃COONa thu được là:',
            options: [
              { key: 'A', text: '8.2 gam' },
              { key: 'B', text: '6.8 gam' },
              { key: 'C', text: '4.1 gam' },
              { key: 'D', text: '9.6 gam' }
            ],
            correctAnswer: 'A',
            explanation: 'Phương trình: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH\nSố mol ester: n = 8.8 / 88 = 0.1 mol.\nTheo phương trình: n_muối = n_ester = 0.1 mol.\nKhối lượng muối: m = 0.1 * (15 + 12 + 32 + 23) = 0.1 * 82 = 8.2 gam.',
            hints: ['Tính số mol ester: n = m / M', 'Bảo toàn số mol nhóm axetat: n_CH₃COONa = n_ester.']
          },
          {
            id: 'ex-ester-03',
            topic: 'Ester - Câu hỏi Đúng/Sai (Định dạng Đề thi 2026)',
            level: 'VD',
            type: 'true_false_group',
            prompt: 'Cho ester X có công thức phân tử C₄H₈O₂. Đun nóng X với dung dịch NaOH thu được chất hữu cơ Y và Z. Biết Z có phản ứng tráng bạc.',
            subStatements: [
              {
                id: 'a',
                statement: 'X có thể là Propyl formate (HCOOCH₂CH₂CH₃).',
                isCorrect: true,
                explanation: 'Đúng. Nếu X là HCOOCH₂CH₂CH₃ thì khi thủy phân tạo HCOONa (muối fomat có phản ứng tráng bạc) và C₃H₇OH.'
              },
              {
                id: 'b',
                statement: 'X chắc chắn có nhiệt độ sôi cao hơn axit acetic (CH₃COOH).',
                isCorrect: false,
                explanation: 'Sai. Ester không có liên kết hydro liên phân tử nên nhiệt độ sôi thấp hơn axit carboxylic có cùng hoặc phân tử khối lân cận.'
              },
              {
                id: 'c',
                statement: 'Có tất cả 2 đồng phân cấu tạo thỏa mãn tính chất của X.',
                isCorrect: true,
                explanation: 'Đúng. Z có tráng bạc nên X bắt buộc là ester của axit fomic: HCOOCH₂CH₂CH₃ và HCOOCH(CH₃)₂ (gốc propyl và isopropyl).'
              },
              {
                id: 'd',
                statement: 'Khi đốt cháy hoàn toàn 1 mol X luôn thu được số mol CO₂ bằng số mol H₂O.',
                isCorrect: true,
                explanation: 'Đúng. X là C₄H₈O₂ (ester no, đơn chức, mạch hở CnH₂nO₂) khi cháy luôn cho n_CO₂ = n_H₂O = 4 mol.'
              }
            ],
            explanation: 'Phân tích: Để sản phẩm có phản ứng tráng bạc thì hoặc là muối fomat (HCOONa) hoặc là aldehyde (từ gốc enol không bền). Vì C₄H₈O₂ là ester no đơn chức nên bắt buộc axit tạo thành là HCOOH.'
          }
        ]
      },
      {
        id: 'bai-2-lipid',
        chapterId: 'chuong-1-ester-lipid',
        title: 'Bài 2: Chất béo (Triglyceride) & Xà phòng',
        subtitle: 'Cấu trúc trieste của glycerol, phản ứng hydro hóa và sản xuất xà phòng',
        estimatedMinutes: 40,
        difficulty: 'Trung bình',
        prerequisites: ['Bài 1: Ester', 'Glycerol C₃H₅(OH)₃ (Lớp 11)'],
        theory: {
          objectives: [
            'Nêu định nghĩa chất béo (triglyceride/triacylglycerol).',
            'Nhớ được công thức, phân tử khối và trạng thái của 4 axit béo tiêu biểu: Panmitic, Stearic, Oleic, Linoleic.',
            'Giải thích được phản ứng hydro hóa chất béo lỏng thành chất béo rắn (bơ nhân tạo).',
            'Hiểu quy trình sản xuất xà phòng và cơ chế tẩy rửa của phân tử xà phòng.'
          ],
          coreConcepts: [
            {
              title: '1. Khái niệm & Công thức của Chất béo',
              explanation: 'Chất béo là trieste của glycerol với các axit béo (axit monocacboxylic có mạch C dài, không phân nhánh, thường có số C chẵn từ 12 đến 24).',
              formulas: [
                'Công thức tổng quát: (RCOO)₃C₃H₅',
                'Axit Panmitic: C₁₅H₃₁COOH (No, M = 256) -> Tripanmitin: (C₁₅H₃₁COO)₃C₃H₅ (M = 806, rắn)',
                'Axit Stearic: C₁₇H₃₅COOH (No, M = 284) -> Tristearin: (C₁₇H₃₅COO)₃C₃H₅ (M = 890, rắn)',
                'Axit Oleic: C₁₇H₃₃COOH (1 nối đôi C=C cis, M = 282) -> Triolein: (C₁₇H₃₃COO)₃C₃H₅ (M = 884, lỏng)'
              ],
              keyTakeaway: 'Chất béo chứa chủ yếu gốc axit no ở thể rắn (mỡ động vật). Chất béo chứa chủ yếu gốc axit không no ở thể lỏng (dầu thực vật).'
            },
            {
              title: '2. Phản ứng thủy phân & Xà phòng hóa',
              explanation: 'Đun nóng chất béo với dung dịch NaOH/KOH thu được xà phòng (hỗn hợp muối natri/kali của axit béo) và glycerol.',
              formulas: ['(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃ (đun nóng)'],
              keyTakeaway: 'Định luật bảo toàn khối lượng luôn đúng: m_chất béo + m_NaOH = m_muối (xà phòng) + m_glycerol. Trong đó n_NaOH = 3 * n_glycerol = 3 * n_chất béo.'
            }
          ],
          reactions: [
            {
              title: 'Phản ứng xà phòng hóa Triolein',
              equation: '(C₁₇H₃₃COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₃COONa + C₃H₅(OH)₃',
              conditions: 'Đun sôi nhẹ, khuấy đều',
              phenomenon: 'Hỗn hợp sánh lại. Khi thêm NaCl bão hòa và để nguội, muối natri của axit béo kết tinh và nổi lên trên thành mảng màu trắng.',
              explanation: 'Muối natri của axit béo có khối lượng riêng nhỏ hơn dung dịch NaCl bão hòa và độ tan giảm mạnh trong môi trường ion Na⁺ cao (hiệu ứng ion chung) nên bị đẩy nổi lên trên.'
            },
            {
              title: 'Phản ứng Hydro hóa (Chuyển dầu thành mỡ bơ nhân tạo)',
              equation: '(C₁₇H₃₃COO)₃C₃H₅ (lỏng) + 3H₂ → (C₁₇H₃₅COO)₃C₃H₅ (rắn)',
              conditions: 'Niken (Ni) xúc tác, nhiệt độ, áp suất',
              phenomenon: 'Dầu lỏng chuyển thành chất béo rắn (margarine/bơ thực vật).',
              explanation: 'Cộng hydro vào liên kết đôi C=C của gốc axit không no biến thành gốc no, dễ vận chuyển và bảo quản chống ôi thiu.'
            }
          ],
          mindmap: {
            title: 'CHẤT BÉO (TRIGLYCERIDE)',
            details: ['Trieste của glycerol với axit béo', 'Nhẹ hơn nước, không tan trong nước'],
            children: [
              {
                title: 'Phân loại',
                details: ['Chất béo no (Rắn): Tripanmitin, Tristearin (mỡ)', 'Chất béo không no (Lỏng): Triolein (dầu)']
              },
              {
                title: 'Tính chất hóa học',
                details: ['Thủy phân môi trường axit (tạo axit béo + glycerol)', 'Thủy phân môi trường kiềm (Xà phòng hóa)', 'Cộng H₂ vào nối đôi C=C (chuyển lỏng -> rắn)', 'Bị oxi hóa bởi O₂ không khí tạo chất ôi khét']
              }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Nhầm lẫn giữa "Dầu mỡ thực vật/động vật" với "Dầu mỡ bôi trơn máy".',
              correction: 'Dầu mỡ ăn là lipid (chất béo - triester). Còn dầu mỡ bôi trơn máy, xăng dầu là hỗn hợp hydrocarbon từ dầu mỏ.',
              examTip: 'Câu hỏi nhận biết rất hay gặp: "Phân biệt dầu thực vật và dầu nhớt máy bay/xe máy bằng phản ứng xà phòng hóa với dung dịch kiềm".'
            }
          ],
          onePageSummary: [
            'Chất béo = (RCOO)₃C₃H₅. Tỉ lệ phản ứng: 1 mol chất béo cần 3 mol NaOH → 3 mol xà phòng + 1 mol glycerol.',
            'Bảo toàn khối lượng: m_chất béo + 40*n_NaOH = m_xà phòng + 92*n_glycerol.',
            'Tripanmitin: (C₁₅H₃₁COO)₃C₃H₅ (M=806, rắn). Tristearin: (C₁₇H₃₅COO)₃C₃H₅ (M=890, rắn).',
            'Triolein: (C₁₇H₃₃COO)₃C₃H₅ (M=884, lỏng). Có phản ứng cộng 3H₂ hoặc cộng 3Br₂.'
          ]
        },
        exercises: [
          {
            id: 'ex-lipid-01',
            topic: 'Chất béo - Bảo toàn khối lượng',
            level: 'TH',
            type: 'single_choice',
            prompt: 'Xà phòng hóa hoàn toàn 17.8 gam tristearin [(C₁₇H₃₅COO)₃C₃H₅, M = 890] bằng lượng dư dung dịch NaOH. Khối lượng glycerol thu được là:',
            options: [
              { key: 'A', text: '1.84 gam' },
              { key: 'B', text: '0.92 gam' },
              { key: 'C', text: '2.76 gam' },
              { key: 'D', text: '3.68 gam' }
            ],
            correctAnswer: 'A',
            explanation: 'n_tristearin = 17.8 / 890 = 0.02 mol.\nTheo phương trình: n_glycerol = n_tristearin = 0.02 mol.\nKhối lượng glycerol C₃H₅(OH)₃: m = 0.02 * 92 = 1.84 gam.',
            hints: ['1 mol chất béo sinh ra đúng 1 mol glycerol C₃H₅(OH)₃ (M = 92).']
          }
        ]
      }
    ]
  },
  {
    id: 'chuong-2-carbohydrate',
    order: 2,
    title: 'Chương 2: Carbohydrate (Cacbohidrat)',
    tagline: 'Phản ứng tráng bạc, thủy phân và tính chất đặc trưng của đường & tinh bột',
    color: 'from-emerald-500 to-teal-500',
    iconName: 'Leaf',
    lessons: [
      {
        id: 'bai-3-glucose-fructose',
        chapterId: 'chuong-2-carbohydrate',
        title: 'Bài 3: Glucose & Fructose (Monosaccharide)',
        subtitle: 'Cấu tạo polyhydroxy aldehyde, phản ứng tráng bạc & tác dụng Cu(OH)₂',
        estimatedMinutes: 50,
        difficulty: 'Trung bình',
        prerequisites: ['Aldehyde (Lớp 11)', 'Ancol đa chức có -OH kề nhau (Lớp 11)'],
        relatedExperimentId: 'exp-silver-mirror',
        bookPageMap: {
          ket_noi: 'Trang 22 - 29 (KNTT Tập 1)',
          canh_dieu: 'Trang 20 - 27 (Cánh Diều Tập 1)',
          chan_troi: 'Trang 24 - 32 (CTST Tập 1)',
        },
        theory: {
          objectives: [
            'Viết được công thức phân tử, công thức cấu tạo mạch hở và dạng vòng của Glucose và Fructose.',
            'Giải thích tính chất ancol đa chức (tác dụng với Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam thẫm).',
            'Giải thích tính chất aldehyde của glucose (phản ứng tráng bạc, làm mất màu nước brom, khử Cu(OH)₂ đun nóng tạo Cu₂O đỏ gạch).',
            'Phân biệt glucose và fructose bằng nước brom (dung dịch Br₂).'
          ],
          coreConcepts: [
            {
              title: '1. Cấu trúc phân tử Glucose (C₆H₁₂O₆, M = 180)',
              explanation: 'Glucose là monosaccharide tiêu biểu. Ở dạng mạch hở, phân tử có 5 nhóm -OH ở 5 nguyên tử C kề nhau và 1 nhóm aldehyde (-CHO) ở đầu mạch.',
              formulas: [
                'CTCT mạch hở thu gọn: CH₂OH-CHOH-CHOH-CHOH-CHOH-CHO (hoặc CH₂OH[CHOH]₄CHO)',
                'Trong dung dịch, glucose tồn tại chủ yếu ở dạng vòng 6 cạnh (α-glucose chiếm ~36% và β-glucose chiếm ~64%)'
              ],
              keyTakeaway: 'Glucose là hợp chất hữu cơ tạp chức (vừa có tính chất của polyalcohol vừa có tính chất của aldehyde).'
            },
            {
              title: '2. Phản ứng tráng bạc & Tác dụng với Cu(OH)₂',
              explanation: 'Nhóm -CHO của glucose dễ dàng bị oxi hóa bởi phức bạc amoniac [Ag(NH₃)₂]OH tạo bạc kim loại bám trên thành thủy tinh (phản ứng tráng gương). Với Cu(OH)₂ ở nhiệt độ thường tạo phức xanh lam, đun nóng tạo kết tủa Cu₂O đỏ gạch.',
              formulas: [
                'Tráng bạc: CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
                'Tác dụng Cu(OH)₂ (t° thường): 2C₆H₁₂O₆ + Cu(OH)₂ → (C₆H₁₁O₆)₂Cu + 2H₂O (phức xanh lam thẫm)',
                'Tác dụng Cu(OH)₂ / NaOH (t° cao): CH₂OH[CHOH]₄CHO + 2Cu(OH)₂ + NaOH → CH₂OH[CHOH]₄COONa + Cu₂O↓ (đỏ gạch) + 3H₂O'
              ],
              keyTakeaway: '1 mol Glucose luôn sinh ra đúng 2 mol Ag kim loại (n_Ag = 2 * n_Glucose).'
            },
            {
              title: '3. Fructose và sự chuyển hóa trong môi trường kiềm',
              explanation: 'Fructose là đồng phân của glucose (C₆H₁₂O₆), dạng mạch hở chứa 1 nhóm ketone (-C=O) ở vị trí C2 và 5 nhóm -OH. Trong môi trường kiềm (như dung dịch [Ag(NH₃)₂]OH), fructose tự động đồng phân hóa thành glucose nên CŨNG CÓ phản ứng tráng bạc!',
              formulas: ['Fructose ⇌ Glucose (xúc tác môi trường kiềm OH⁻)'],
              keyTakeaway: 'Để phân biệt Glucose và Fructose, ta dùng NƯỚC BROM (Br₂). Glucose làm mất màu nước brom, còn Fructose thì KHÔNG (vì nước brom có môi trường axit nhẹ, không chuyển fructose thành glucose được).'
            }
          ],
          reactions: [
            {
              title: 'Phản ứng tráng bạc của Glucose',
              equation: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O',
              conditions: 'Đun nóng nhẹ hoặc ngâm trong cốc nước nóng 60 - 70°C',
              phenomenon: 'Thành ống nghiệm xuất hiện một lớp bạc kim loại sáng bóng soi gương được.',
              explanation: 'Ion Ag⁺ trong phức chất bị nhóm aldehyde của glucose khử thành kim loại Ag tự do.'
            },
            {
              title: 'Lên men rượu từ Glucose',
              equation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑',
              conditions: 'Men rượu (zymase), 30 - 35°C',
              phenomenon: 'Sủi bọt khí CO₂, dung dịch có mùi cồn rượu.',
              explanation: 'Quy trình sản xuất ethanol sinh học và rượu truyền thống từ ngũ cốc, hoa quả.'
            }
          ],
          mindmap: {
            title: 'GLUCOSE (C₆H₁₂O₆)',
            details: ['M = 180, đường nho', 'Có trong máu người (~0.1%)'],
            children: [
              {
                title: 'Tính chất Poliol (5 nhóm -OH kề)',
                details: ['Hòa tan Cu(OH)₂ ở t° thường -> dd xanh lam', 'Tạo este chứa 5 gốc axit (pentaeste)']
              },
              {
                title: 'Tính chất Aldehyd (nhóm -CHO)',
                details: ['Tráng bạc: tạo 2Ag', 'Tác dụng Cu(OH)₂ đun nóng -> Cu₂O đỏ gạch', 'Làm mất màu dung dịch nước brom Br₂', 'Cộng H₂ (Ni, t°) tạo Sorbitol']
              },
              {
                title: 'Phản ứng lên men',
                details: ['Lên men rượu: tạo 2C₂H₅OH + 2CO₂', 'Lên men lactic: tạo axit lactic']
              }
            ]
          },
          comparisonTable: {
            title: 'Bảng so sánh chi tiết Glucose và Fructose',
            headers: ['Tiêu chí', 'Glucose (Đường nho)', 'Fructose (Đường mật ong)'],
            rows: [
              ['Công thức phân tử', 'C₆H₁₂O₆ (M = 180)', 'C₆H₁₂O₆ (M = 180)'],
              ['Đặc điểm nhóm chức mạch hở', 'Polyhydroxy aldehyde (5 nhóm -OH, 1 nhóm -CHO)', 'Polyhydroxy ketone (5 nhóm -OH, 1 nhóm >C=O)'],
              ['Hòa tan Cu(OH)₂ ở t° thường', 'Có (tạo dung dịch phức xanh lam thẫm)', 'Có (tạo dung dịch phức xanh lam thẫm)'],
              ['Phản ứng tráng bạc [Ag(NH₃)₂]OH', 'Có (sinh ra 2 Ag)', 'Có (do chuyển hóa thành glucose trong kiềm)'],
              ['Tác dụng với nước brom (Br₂)', 'Làm mất màu nước brom (tạo axit gluconic)', 'KHÔNG làm mất màu nước brom (DÙNG ĐỂ PHÂN BIỆT)']
            ]
          },
          commonMistakes: [
            {
              mistake: 'Cho rằng Fructose không tráng bạc vì là ketone.',
              correction: 'Fructose vẫn có phản ứng tráng bạc và khử Cu(OH)₂ khi đun nóng vì trong môi trường kiềm của thuốc thử, Fructose chuyển hóa thuận nghịch thành Glucose.',
              examTip: 'Muốn nhận biết Glucose và Fructose BẮT BUỘC dùng dung dịch nước brom Br₂ (nước brom làm mất màu bởi glucose).'
            }
          ],
          onePageSummary: [
            'Glucose: CH₂OH[CHOH]₄CHO. Monosaccharide không bị thủy phân.',
            'Hòa tan Cu(OH)₂ ở nhiệt độ thường → dung dịch phức màu xanh lam.',
            'Phản ứng tráng bạc: 1 mol Glucose sinh ra 2 mol Ag.',
            'Dung dịch nước Brom: Glucose làm mất màu, Fructose không làm mất màu.',
            'Lên men: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.'
          ]
        },
        exercises: [
          {
            id: 'ex-glu-01',
            topic: 'Glucose - Tráng bạc',
            level: 'TH',
            type: 'single_choice',
            prompt: 'Đun nóng 18.0 gam glucose với lượng dư dung dịch [Ag(NH₃)₂]OH đến khi phản ứng hoàn toàn thu được m gam Ag kim loại. Giá trị của m là:',
            options: [
              { key: 'A', text: '21.6 gam' },
              { key: 'B', text: '10.8 gam' },
              { key: 'C', text: '32.4 gam' },
              { key: 'D', text: '43.2 gam' }
            ],
            correctAnswer: 'A',
            explanation: 'Số mol glucose: n = 18 / 180 = 0.1 mol.\nTheo phương trình phản ứng tráng gương: n_Ag = 2 * n_glucose = 2 * 0.1 = 0.2 mol.\nKhối lượng Ag: m = 0.2 * 108 = 21.6 gam.',
            hints: ['Nhớ tỉ lệ tráng gương: 1 mol Glucose → 2 mol Ag.']
          }
        ]
      },
      {
        id: 'bai-4-tinh-bot-cellulose',
        chapterId: 'chuong-2-carbohydrate',
        title: 'Bài 4: Tinh bột & Cellulose (Polysaccharide)',
        subtitle: 'Cấu trúc polymer sinh học, phản ứng màu với Iodine & thủy phân enzym',
        estimatedMinutes: 45,
        difficulty: 'Cơ bản',
        prerequisites: ['Bài 3: Glucose', 'Khái niệm polymer'],
        relatedExperimentId: 'exp-iodine-starch',
        bookPageMap: {
          ket_noi: 'Trang 35 - 42 (KNTT Tập 1)',
          canh_dieu: 'Trang 32 - 38 (Cánh Diều Tập 1)',
          chan_troi: 'Trang 38 - 46 (CTST Tập 1)',
        },
        theory: {
          objectives: [
            'So sánh cấu trúc phân tử của tinh bột (amylose mạch không phân nhánh xoắn ốc, amylopectin mạch phân nhánh) và cellulose (mạch thẳng kéo dài).',
            'Giải thích phản ứng màu đặc trưng của hồ tinh bột với dung dịch iodine (màu xanh tím).',
            'Nêu phương trình thủy phân tinh bột và cellulose (xúc tác axit hoặc men enzym).'
          ],
          coreConcepts: [
            {
              title: '1. Cấu trúc của Tinh bột (C₆H₁₀O₅)ₙ',
              explanation: 'Tinh bột gồm hai thành phần: Amylose (chiếm 20-30%, các mắt xích α-glucose liên kết α-1,4-glycosidic tạo chuỗi xoắn lò xo) và Amylopectin (chiếm 70-80%, có thêm liên kết nhánh α-1,6-glycosidic).',
              formulas: ['Công thức chung: (C₆H₁₀O₅)ₙ (hệ số polime hóa n từ hàng trăm đến hàng triệu)'],
              keyTakeaway: 'Dạng mạch xoắn của amylose có các lỗ rỗng vừa khít để giữ các phân tử I₂ tạo phức hấp phụ màu xanh tím đặc trưng.'
            },
            {
              title: '2. Cấu trúc của Cellulose [C₆H₇O₂(OH)₃]ₙ',
              explanation: 'Cellulose là thành phần chính tạo nên màng tế bào thực vật (gỗ, bông nõn). Gồm các mắt xích β-glucose liên kết β-1,4-glycosidic tạo thành chuỗi mạch thẳng không phân nhánh.',
              formulas: [
                'Viết gọn: (C₆H₁₀O₅)ₙ hoặc [C₆H₇O₂(OH)₃]ₙ (mỗi mắt xích có 3 nhóm -OH tự do)',
                'Tác dụng HNO₃ đặc: [C₆H₇O₂(OH)₃]ₙ + 3nHNO₃ → [C₆H₇O₂(ONO₂)₃]ₙ (Cellulose trinitrate - thuốc súng không khói) + 3nH₂O'
              ],
              keyTakeaway: 'Cellulose KHÔNG cho phản ứng màu với iodine vì mạch thẳng, không có cấu trúc xoắn rỗng.'
            }
          ],
          reactions: [
            {
              title: 'Phản ứng màu với dung dịch Iodine',
              equation: 'Hồ tinh bột + I₂ → Phức chất màu xanh tím',
              conditions: 'Nhiệt độ phòng (khi đun nóng mất màu, để nguội xuất hiện lại)',
              phenomenon: 'Dung dịch chuyển sang màu xanh tím đậm. Đun nóng thì màu xanh biến mất, để nguội màu xanh tím lại hiện ra.',
              explanation: 'Khi đun nóng, cấu trúc xoắn của amylose bị duỗi ra giải phóng I₂, khi nguội cuộn lại giữ I₂ như cũ.'
            },
            {
              title: 'Thủy phân Tinh bột hoàn toàn',
              equation: '(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆ (Glucose)',
              conditions: 'Axit H⁺ hoặc enzyme amylase, đun nóng',
              phenomenon: 'Hỗn hợp sau thủy phân đem trung hòa axit rồi cho tác dụng với [Ag(NH₃)₂]OH thấy xuất hiện kết tủa bạc Ag.',
              explanation: 'Cắt đứt các liên kết glycosidic giải phóng các monomer glucose tự do.'
            }
          ],
          mindmap: {
            title: 'POLYSACCHARIDE (C₆H₁₀O₅)ₙ',
            details: ['Không có vị ngọt', 'Không tan trong nước lạnh'],
            children: [
              {
                title: 'Tinh bột',
                details: ['Mắt xích α-glucose', 'Amylose (mạch xoắn, liên kết 1,4)', 'Amylopectin (phân nhánh, liên kết 1,4 và 1,6)', 'Tác dụng I₂ tạo màu xanh tím']
              },
              {
                title: 'Cellulose',
                details: ['Mắt xích β-glucose', 'Mạch thẳng dài, liên kết β-1,4', 'Tan trong nước Svayte [Cu(NH₃)₄](OH)₂', 'Tác dụng HNO₃ đ tạo thuốc súng không khói']
              }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Cho rằng Tinh bột và Cellulose là đồng phân của nhau vì cùng CTPT (C₆H₁₀O₅)ₙ.',
              correction: 'Sai hoàn toàn. Giá trị hệ số polime hóa n của tinh bột và cellulose rất khác nhau (n của cellulose lớn hơn rất nhiều) và cấu trúc mắt xích khác nhau (α vs β).',
              examTip: 'Tinh bột và cellulose KHÔNG PHẢI là đồng phân của nhau.'
            }
          ],
          onePageSummary: [
            'Tinh bột: α-glucose. Amylose (mạch thẳng xoắn) + Amylopectin (mạch phân nhánh).',
            'Nhận biết tinh bột: Dùng dung dịch I₂ → màu xanh tím (đun nóng mất, nguội hiện lại).',
            'Cellulose: β-glucose mạch kéo dài thẳng. Mỗi mắt xích có 3 nhóm -OH tự do.',
            'Cellulose trinitrate [C₆H₇O₂(ONO₂)₃]ₙ: chất nổ dễ cháy, thuốc súng không khói.'
          ]
        },
        exercises: [
          {
            id: 'ex-starch-01',
            topic: 'Tinh bột - Nhận biết',
            level: 'NB',
            type: 'single_choice',
            prompt: 'Thuốc thử đặc trưng nhất để nhận biết hồ tinh bột là:',
            options: [
              { key: 'A', text: 'Dung dịch Iodine (I₂)' },
              { key: 'B', text: 'Dung dịch [Ag(NH₃)₂]OH' },
              { key: 'C', text: 'Dung dịch Cu(OH)₂' },
              { key: 'D', text: 'Dung dịch NaOH' }
            ],
            correctAnswer: 'A',
            explanation: 'Dung dịch Iodine tương tác với chuỗi xoắn amylose trong hồ tinh bột tạo phức chất có màu xanh tím đặc trưng.',
            hints: ['Hiện tượng chuyển thành màu xanh tím đặc trưng.']
          }
        ]
      }
    ]
  },
  {
    id: 'chuong-3-nitrogen',
    order: 3,
    title: 'Chương 3: Hợp chất chứa Nitrogen (Amine – Amino acid – Peptide & Protein)',
    tagline: 'Tính base của amine, điểm đẳng điện của amino acid và phản ứng màu biuret',
    color: 'from-violet-500 to-purple-600',
    iconName: 'Dna',
    lessons: [
      {
        id: 'bai-5-protein-biuret',
        chapterId: 'chuong-3-nitrogen',
        title: 'Bài 5: Peptide & Protein. Phản ứng màu Biuret',
        subtitle: 'Cấu trúc liên kết peptide, phản ứng đông tụ và phản ứng màu với Cu(OH)₂',
        estimatedMinutes: 45,
        difficulty: 'Nâng cao',
        prerequisites: ['Amino acid', 'Phức chất cơ bản'],
        relatedExperimentId: 'exp-biuret-protein',
        theory: {
          objectives: [
            'Nêu định nghĩa liên kết peptide (-CO-NH-) và phân biệt dipeptide, tripeptide, polypeptide.',
            'Giải thích được phản ứng màu Biuret đặc trưng của protein và peptide có từ 2 liên kết peptide trở lên.',
            'Giải thích hiện tượng đông tụ protein dưới tác dụng của nhiệt độ, axit, kiềm hoặc muối kim loại nặng.'
          ],
          coreConcepts: [
            {
              title: '1. Khái niệm Liên kết Peptide',
              explanation: 'Liên kết peptide là liên kết giữa nhóm carbonyl (-CO-) của gốc α-amino acid này với nhóm amin (-NH-) của gốc α-amino acid khác.',
              formulas: ['Công thức liên kết: -CO-NH- (bắt buộc nối giữa 2 gốc α-amino acid)'],
              keyTakeaway: 'Dipeptide có 1 liên kết peptide; Tripeptide có 2 liên kết peptide; n-peptide có (n-1) liên kết peptide.'
            },
            {
              title: '2. Phản ứng màu Biuret với Cu(OH)₂',
              explanation: 'Trong môi trường kiềm, các hợp chất chứa từ HAI liên kết peptide trở lên (từ tripeptide trở lên và tất cả protein) tạo phức chất chelate với ion Cu²⁺ có màu tím hoặc tím đặc trưng.',
              formulas: ['Protein + Cu(OH)₂ / NaOH → Hợp chất phức màu tím đặc trưng'],
              keyTakeaway: 'Dipeptide KHÔNG có phản ứng màu Biuret (vì chỉ có 1 liên kết peptide)!'
            }
          ],
          reactions: [
            {
              title: 'Phản ứng Biuret của Lòng trắng trứng (Albumin)',
              equation: 'Albumin + Cu(OH)₂ (môi trường kiềm NaOH) → Phức chất màu tím',
              conditions: 'Nhiệt độ phòng',
              phenomenon: 'Xuất hiện màu tím hoặc tím hoa cà đặc trưng rõ rệt.',
              explanation: 'Các nguyên tử N và O trong các liên kết peptide phối trí với ion Cu²⁺ tạo phức chelate bền có màu tím.'
            }
          ],
          mindmap: {
            title: 'PEPTIDE & PROTEIN',
            details: ['Tạo bởi các gốc α-amino acid', 'Bị đông tụ bởi nhiệt độ & pH'],
            children: [
              {
                title: 'Phản ứng thủy phân',
                details: ['Xúc tác axit hoặc kiềm hoặc enzym', 'Thu được hỗn hợp các α-amino acid']
              },
              {
                title: 'Phản ứng màu Biuret',
                details: ['Cần từ 2 liên kết peptide trở lên', 'Thuốc thử: Cu(OH)₂ trong NaOH', 'Hiện tượng: dung dịch màu tím hoa cà', 'Dipeptide KHÔNG CÓ phản ứng này']
              }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Nghĩ rằng dipeptide Gly-Ala có phản ứng màu Biuret.',
              correction: 'Gly-Ala là dipeptide chỉ có 1 liên kết peptide nên KHÔNG có phản ứng màu biuret. Phải từ TRIPEPTIDE trở lên mới có phản ứng màu biuret.',
              examTip: 'Đây là câu hỏi "bẫy kinh điển" xuất hiện hàng năm trong đề thi tốt nghiệp.'
            }
          ],
          onePageSummary: [
            'Liên kết peptide: -CO-NH- giữa 2 gốc α-amino acid.',
            'Dipeptide: 1 liên kết peptide (KHÔNG có phản ứng biuret).',
            'Tripeptide, polypeptide, protein: Có phản ứng màu Biuret (Cu(OH)₂/NaOH → màu tím).',
            'Hiện tượng đông tụ: Trứng luộc chín, riêu cua nổi lên khi nấu canh (do nhiệt độ).'
          ]
        },
        exercises: [
          {
            id: 'ex-pep-01',
            topic: 'Peptide - Phản ứng Biuret',
            level: 'NB',
            type: 'single_choice',
            prompt: 'Chất nào sau đây KHÔNG cho phản ứng màu Biuret với Cu(OH)₂ trong môi trường kiềm?',
            options: [
              { key: 'A', text: 'Gly-Ala (Dipeptide)' },
              { key: 'B', text: 'Gly-Ala-Val (Tripeptide)' },
              { key: 'C', text: 'Lòng trắng trứng (Albumin)' },
              { key: 'D', text: 'Ala-Gly-Phe-Val (Tetrapeptide)' }
            ],
            correctAnswer: 'A',
            explanation: 'Gly-Ala là dipeptide chỉ có 1 liên kết peptide. Quy tắc Biuret yêu cầu phải có từ 2 liên kết peptide trở lên (từ tripeptide trở lên). Do đó Gly-Ala không phản ứng.',
            hints: ['Dipeptide chỉ có 1 liên kết peptide.']
          }
        ]
      }
    ]
  },
  {
    id: 'chuong-5-pin-dien-hoa',
    order: 5,
    title: 'Chương 5: Pin điện & Điện phân (Hóa học điện hóa GDPT 2018)',
    tagline: 'Pin Galvani Zn-Cu, tính thế điện cực chuẩn và điện phân dung dịch',
    color: 'from-blue-600 to-indigo-600',
    iconName: 'Zap',
    lessons: [
      {
        id: 'bai-6-pin-galvani',
        chapterId: 'chuong-5-pin-dien-hoa',
        title: 'Bài 6: Pin Galvani & Thế điện cực chuẩn',
        subtitle: 'Nguyên lý chuyển hóa hóa năng thành điện năng, quy ước Anode/Cathode',
        estimatedMinutes: 50,
        difficulty: 'Nâng cao',
        prerequisites: ['Phản ứng oxi hóa - khử', 'Kim loại phản ứng với muối'],
        relatedExperimentId: 'exp-galvanic-cell',
        theory: {
          objectives: [
            'Mô tả cấu tạo và cơ chế hoạt động của pin điện hóa Zn - Cu (Pin Daniell/Galvani).',
            'Xác định đúng điện cực: Anode (cực âm, nơi xảy ra quá trình oxi hóa) và Cathode (cực dương, nơi xảy ra quá trình khử).',
            'Tính sức điện động chuẩn của pin: E°_pin = E°_Cathode - E°_Anode.',
            'Giải thích vai trò của cầu muối (salt bridge).'
          ],
          coreConcepts: [
            {
              title: '1. Cấu tạo Pin Galvani Kẽm - Đồng (Zn - Cu)',
              explanation: 'Gồm một thanh kẽm nhúng trong dung dịch ZnSO₄ 1M (bán pin Zn) và một thanh đồng nhúng trong dung dịch CuSO₄ 1M (bán pin Cu), nối với nhau bằng dây dẫn kim loại (có gắn vôn kế) và cầu muối chứa dung dịch chất điện li (KCl hoặc KNO₃).',
              formulas: [
                'Cực âm (Anode): Kim loại có tính khử mạnh hơn (Zn) bị oxi hóa: Zn → Zn²⁺ + 2e',
                'Cực dương (Cathode): Cation có tính oxi hóa mạnh hơn (Cu²⁺) bị khử: Cu²⁺ + 2e → Cu',
                'Phương trình phản ứng tổng quát trong pin: Zn + Cu²⁺ → Zn²⁺ + Cu'
              ],
              keyTakeaway: 'Ghi nhớ thần chú điện cực pin: ANODE = OXI HÓA (CỰC ÂM); CATHODE = KHỬ (CỰC DƯƠNG).'
            },
            {
              title: '2. Sức điện động chuẩn của Pin (E°_pin)',
              explanation: 'Sức điện động chuẩn của pin điện hóa là hiệu số giữa thế điện cực chuẩn của cực dương và cực âm.',
              formulas: [
                'E°_pin = E°_Cathode - E°_Anode = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn)',
                'Biết E°(Cu²⁺/Cu) = +0.34 V và E°(Zn²⁺/Zn) = -0.76 V',
                'E°_pin = (+0.34) - (-0.76) = 1.10 V'
              ],
              keyTakeaway: 'Sức điện động chuẩn của pin luôn là một số DƯƠNG (E°_pin > 0).'
            },
            {
              title: '3. Vai trò của Cầu muối (Salt bridge)',
              explanation: 'Cầu muối khép kín mạch điện và duy trì tính trung hòa điện tích cho hai dung dịch bán pin. Khi Zn²⁺ tan ra ở cực âm, anion Cl⁻ từ cầu muối khuếch tán vào để cân bằng; khi Cu²⁺ giảm ở cực dương, cation K⁺ từ cầu muối khuếch tán sang.',
              keyTakeaway: 'Nếu nhấc cầu muối ra khỏi dung dịch, mạch điện bị hở, dòng electron lập tức ngừng chạy (vôn kế về 0).'
            }
          ],
          reactions: [
            {
              title: 'Quá trình tại Anode (Cực âm)',
              equation: 'Zn(s) → Zn²⁺(aq) + 2e',
              conditions: 'Tự diễn biến trong pin',
              phenomenon: 'Thanh Zn mòn dần theo thời gian, giải phóng electron vào mạch ngoài.',
              explanation: 'Kim loại Zn nhường 2e để chuyển thành cation Zn²⁺ tan vào dung dịch.'
            },
            {
              title: 'Quá trình tại Cathode (Cực dương)',
              equation: 'Cu²⁺(aq) + 2e → Cu(s)',
              conditions: 'Tự diễn biến trong pin',
              phenomenon: 'Thanh Cu có một lớp đồng màu đỏ gạch bám dày lên, màu xanh của dung dịch CuSO₄ nhạt dần.',
              explanation: 'Ion Cu²⁺ nhận 2e từ mạch ngoài khử thành kim loại Cu bám lên điện cực.'
            }
          ],
          mindmap: {
            title: 'PIN GALVANI Zn - Cu',
            details: ['Hóa năng -> Điện năng', 'E° = 1.10 V'],
            children: [
              {
                title: 'Anode (Cực âm - Zn)',
                details: ['Xảy ra quá trình OXI HÓA', 'Zn → Zn²⁺ + 2e', 'Thanh Zn bị mòn dần']
              },
              {
                title: 'Cathode (Cực dương - Cu)',
                details: ['Xảy ra quá trình KHỬ', 'Cu²⁺ + 2e → Cu', 'Đồng đỏ bám lên điện cực', 'Màu xanh CuSO₄ nhạt dần']
              },
              {
                title: 'Dòng điện & Cầu muối',
                details: ['Dòng electron chạy từ Zn sang Cu qua dây dẫn', 'Dòng điện quy ước từ Cu sang Zn', 'Cầu muối trung hòa điện tích']
              }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Nhầm lẫn cực âm/dương giữa Pin điện hóa và Bình điện phân.',
              correction: 'Trong Pin Galvani: Anode là cực ÂM, Cathode là cực DƯƠNG. Trong bình điện phân (cần nguồn điện ngoài): Anode nối cực DƯƠNG, Cathode nối cực ÂM. Nhưng ở cả hai: Anode LUÔN xảy ra OXI HÓA, Cathode LUÔN xảy ra KHỬ.',
              examTip: 'Ghi nhớ quy tắc bất biến: Anode = Oxi hóa (A-O: nguyên âm); Cathode = Khử (C-K: phụ âm).'
            }
          ],
          onePageSummary: [
            'Pin Galvani: Tự phát sinh dòng điện (Hóa năng → Điện năng).',
            'Anode (cực âm): Zn → Zn²⁺ + 2e (Quá trình Oxi hóa).',
            'Cathode (cực dương): Cu²⁺ + 2e → Cu (Quá trình Khử).',
            'Sức điện động chuẩn: E°_pin = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = 0.34 - (-0.76) = 1.10 V.',
            'Cầu muối: Đóng kín mạch và trung hòa điện tích.'
          ]
        },
        exercises: [
          {
            id: 'ex-pin-01',
            topic: 'Pin điện hóa - Tính thế',
            level: 'TH',
            type: 'single_choice',
            prompt: 'Cho thế điện cực chuẩn: E°(Ag⁺/Ag) = +0.80 V và E°(Cu²⁺/Cu) = +0.34 V. Sức điện động chuẩn của pin Cu - Ag là:',
            options: [
              { key: 'A', text: '+0.46 V' },
              { key: 'B', text: '+1.14 V' },
              { key: 'C', text: '-0.46 V' },
              { key: 'D', text: '+0.23 V' }
            ],
            correctAnswer: 'A',
            explanation: 'Trong pin Cu - Ag, Ag⁺ có tính oxi hóa mạnh hơn nên Ag đóng vai trò Cathode (cực dương); Cu đóng vai trò Anode (cực âm).\nE°_pin = E°_Cathode - E°_Anode = E°(Ag⁺/Ag) - E°(Cu²⁺/Cu) = (+0.80) - (+0.34) = +0.46 V.',
            hints: ['E°_pin = E°(dương) - E°(âm) = E°(lớn hơn) - E°(bé hơn).']
          }
        ]
      },
      {
        id: 'bai-7-dien-phan',
        chapterId: 'chuong-5-pin-dien-hoa',
        title: 'Bài 7: Điện phân dung dịch & Định luật Faraday',
        subtitle: 'Cơ chế điện phân nóng chảy và dung dịch, thứ tự phóng điện ở các điện cực',
        estimatedMinutes: 45,
        difficulty: 'Nâng cao',
        prerequisites: ['Bài 6: Pin điện', 'Dãy điện hóa kim loại'],
        relatedExperimentId: 'exp-electrolysis-cuso4',
        theory: {
          objectives: [
            'Nêu bản chất của sự điện phân (dùng dòng điện một chiều để thúc đẩy phản ứng oxi hóa - khử).',
            'Xác định đúng thứ tự phóng điện của các ion tại Cathode (khử cation) và Anode (oxi hóa anion).',
            'Viết phương trình điện phân dung dịch CuSO₄ với điện cực trơ.',
            'Áp dụng định luật bảo toàn electron và công thức Faraday m = (A * I * t) / (n * F).'
          ],
          coreConcepts: [
            {
              title: '1. Bản chất sự điện phân',
              explanation: 'Điện phân là quá trình oxi hóa - khử xảy ra trên bề mặt các điện cực khi có dòng điện một chiều đi qua chất điện li nóng chảy hoặc dung dịch chất điện li.',
              formulas: ['Cathode (cực âm nối với cực âm nguồn điện): Xảy ra quá trình KHỬ', 'Anode (cực dương nối với cực dương nguồn điện): Xảy ra quá trình OXI HÓA'],
              keyTakeaway: 'Điện năng được chuyển hóa thành Hóa năng.'
            },
            {
              title: '2. Thứ tự phóng điện trong dung dịch (Điện cực trơ Pt hoặc Graphite)',
              explanation: 'Tại Cathode (cực âm): Cation có tính oxi hóa mạnh hơn phóng điện trước: Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ (axit) > Fe²⁺ > Zn²⁺ > H₂O. (Các ion kim loại mạnh Al³⁺, Mg²⁺, Na⁺, K⁺, Ca²⁺, Ba²⁺ KHÔNG bị khử trong dung dịch nước, thay vào đó là H₂O bị khử: 2H₂O + 2e → H₂↑ + 2OH⁻).\nTại Anode (cực dương trơ): Gốc không chứa oxi dễ phóng điện: S²⁻ > I⁻ > Br⁻ > Cl⁻ > H₂O (các gốc SO₄²⁻, NO₃⁻ không bị oxi hóa, H₂O bị oxi hóa: 2H₂O → O₂↑ + 4H⁺ + 4e).',
              keyTakeaway: 'Khi điện phân dung dịch CuSO₄: Cu²⁺ phóng điện ở Cathode, H₂O phóng điện ở Anode tạo khí O₂ và ion H⁺ (dung dịch có tính axit mạnh dần).'
            }
          ],
          reactions: [
            {
              title: 'Điện phân dung dịch CuSO₄ (điện cực trơ)',
              equation: '2CuSO₄ + 2H₂O → 2Cu↓ (Cathode) + O₂↑ (Anode) + 2H₂SO₄',
              conditions: 'Dòng điện một chiều, điện cực trơ',
              phenomenon: 'Ở Cathode: Có kim loại đồng Cu màu đỏ bám vào; Ở Anode: Sủi bọt khí O₂ không màu; Màu xanh lam của dung dịch nhạt dần.',
              explanation: 'Tại Cathode: Cu²⁺ + 2e → Cu; Tại Anode: 2H₂O → O₂ + 4H⁺ + 4e.'
            }
          ],
          mindmap: {
            title: 'ĐIỆN PHÂN DUNG DỊCH',
            details: ['Điện năng -> Hóa năng', 'Dùng nguồn điện 1 chiều'],
            children: [
              {
                title: 'Cathode (Cực âm)',
                details: ['Thu hút Cation (+) về', 'Quá trình KHỬ', 'Cu²⁺ + 2e → Cu (Cu đỏ bám)', 'H₂O bị khử nếu gặp ion Na⁺, Al³⁺']
              },
              {
                title: 'Anode (Cực dương)',
                details: ['Thu hút Anion (-) về', 'Quá trình OXI HÓA', '2H₂O → O₂↑ + 4H⁺ + 4e (Sủi bọt O₂)', 'Tạo dung dịch axit H₂SO₄']
              }
            ]
          },
          commonMistakes: [
            {
              mistake: 'Nghĩ rằng ion Al³⁺ hoặc Na⁺ có thể bị khử thành kim loại trong dung dịch nước.',
              correction: 'Thế khử của ion kim loại kiềm, kiềm thổ, nhôm quá âm nên nước sẽ bị khử trước giải phóng H₂. Muốn điều chế kim loại Na, Al bắt buộc phải điện phân NÓNG CHẢY (NaCl nóng chảy, Al₂O₃ nóng chảy pha criolit).',
              examTip: 'Điện phân dung dịch NaCl chỉ thu được NaOH + Cl₂ + H₂, KHÔNG bao giờ ra kim loại Na.'
            }
          ],
          onePageSummary: [
            'Điện phân: Dùng dòng điện ngoài tạo phản ứng oxi hóa - khử.',
            'Cathode (cực âm): Nhận e (Khử cation). Cu²⁺ + 2e → Cu.',
            'Anode (cực dương): Nhường e (Oxi hóa anion/nước). 2H₂O → O₂ + 4H⁺ + 4e.',
            'Điện phân dung dịch CuSO₄: 2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄ (dd đổi từ màu xanh sang trong suốt, có tính axit).'
          ]
        },
        exercises: [
          {
            id: 'ex-el-01',
            topic: 'Điện phân dung dịch CuSO₄',
            level: 'TH',
            type: 'single_choice',
            prompt: 'Điện phân dung dịch CuSO₄ với hai điện cực trơ bằng dòng điện không đổi. Hiện tượng quan sát được tại cực dương (Anode) là:',
            options: [
              { key: 'A', text: 'Sủi bọt khí không màu (O₂)' },
              { key: 'B', text: 'Có kim loại màu đỏ bám vào' },
              { key: 'C', text: 'Sủi bọt khí màu vàng lục' },
              { key: 'D', text: 'Xuất hiện kết tủa màu xanh lam' }
            ],
            correctAnswer: 'A',
            explanation: 'Tại Anode (cực dương), ion SO₄²⁻ không bị oxi hóa, phân tử nước bị oxi hóa: 2H₂O → O₂↑ + 4H⁺ + 4e sinh ra bọt khí O₂ không màu.',
            hints: ['Gốc sunfat SO₄²⁻ không bị oxi hóa ở Anode; H₂O bị oxi hóa giải phóng khí O₂.']
          }
        ]
      }
    ]
  }
];
