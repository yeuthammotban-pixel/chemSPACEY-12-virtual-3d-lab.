import { Flashcard } from '../types/chemistry';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-01',
    chapterId: 'chuong-1-ester-lipid',
    topic: 'Ester',
    category: 'Hiện tượng',
    front: 'Các ester sau đây có mùi thơm đặc trưng của quả gì?\n1. Isoamyl acetate\n2. Ethyl butyrate\n3. Benzyl acetate',
    back: '1. Isoamyl acetate: Mùi chuối chín\n2. Ethyl butyrate: Mùi dứa (thơm)\n3. Benzyl acetate: Mùi hoa nhài\n\nỨng dụng: Dùng làm hương liệu trong thực phẩm, mỹ phẩm và bánh kẹo.',
    hint: 'Nhớ chuối chín - isoamyl, hoa nhài - benzyl.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-02',
    chapterId: 'chuong-1-ester-lipid',
    topic: 'Lipid',
    category: 'Công thức',
    front: 'Nêu công thức phân tử, phân tử khối (M) và trạng thái của Triolein và Tristearin.',
    back: '1. Triolein: (C₁₇H₃₃COO)₃C₃H₅\n- M = 884\n- Không no (có 3 liên kết C=C cis)\n- Thể LỎNG (dầu thực vật)\n\n2. Tristearin: (C₁₇H₃₅COO)₃C₃H₅\n- M = 890\n- No\n- Thể RẮN (mỡ động vật)',
    hint: 'Oleic thiếu 2H so với stearic, nên lỏng.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-03',
    chapterId: 'chuong-1-ester-lipid',
    topic: 'Ester',
    category: 'Bẫy đề thi',
    front: 'Ester của phenol (RCOOC₆H₅) khi tác dụng với dung dịch NaOH đun nóng có tỉ lệ mol và sản phẩm như thế nào?',
    back: 'RCOOC₆H₅ + 2NaOH → RCOONa + C₆H₅ONa + H₂O\n\n- Tỉ lệ mol: 1 mol ester : 2 mol NaOH\n- Sản phẩm: 2 MUỐI + 1 NƯỚC (KHÔNG sinh ra ancol!)\n- Đây là dấu hiệu nhận biết ester của phenol trong bài toán đốt cháy và thủy phân.',
    hint: 'Phenol sinh ra có tính axit nên tác dụng tiếp với NaOH.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-04',
    chapterId: 'chuong-2-carbohydrate',
    topic: 'Carbohydrate',
    category: 'Phản ứng',
    front: 'Làm thế nào để phân biệt dung dịch Glucose và Fructose bằng phương pháp hóa học?',
    back: 'Dùng DUNG DỊCH NƯỚC BROM (Br₂):\n- Glucose: Làm MẤT MÀU nước brom (nhóm -CHO bị oxi hóa thành axit gluconic).\n- Fructose: KHÔNG làm mất màu nước brom (môi trường nước brom có tính axit nhẹ, Fructose không thể chuyển hóa thành Glucose).\n\nLưu ý: Thuốc thử AgNO₃/NH₃ hay Cu(OH)₂/NaOH KHÔNG phân biệt được vì môi trường kiềm làm fructose chuyển thành glucose.',
    hint: 'Dùng nước brom vì môi trường axit.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-05',
    chapterId: 'chuong-2-carbohydrate',
    topic: 'Carbohydrate',
    category: 'Hiện tượng',
    front: 'Nêu hiện tượng khi nhỏ dung dịch Iodine vào hồ tinh bột ở nhiệt độ thường, sau đó đun nóng và để nguội.',
    back: '1. Ở t° thường: Dung dịch chuyển sang màu XANH TÍM đặc trưng (do phân tử I₂ chui vào các khoang xoắn của amylose).\n2. Khi đun nóng: Màu xanh tím BIẾN MẤT (do chuỗi xoắn bị duỗi thẳng giải phóng I₂).\n3. Khi để nguội: Màu xanh tím XUẤT HIỆN TRỞ LẠI (chuỗi amylose cuộn xoắn lại bẫy I₂).',
    hint: 'Biến tính thuận nghịch theo nhiệt độ.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-06',
    chapterId: 'chuong-3-nitrogen',
    topic: 'Peptide',
    category: 'Định nghĩa',
    front: 'Điều kiện để một hợp chất tham gia phản ứng màu Biuret với Cu(OH)₂ trong môi trường kiềm là gì? Hiện tượng?',
    back: '- Điều kiện: Phải có từ HAI LIÊN KẾT PEPTIDE (-CO-NH-) trở lên trong phân tử (tức là từ TRIPEPTIDE trở lên hoặc tất cả protein).\n- Hiện tượng: Tạo phức chất chelate màu TÍM hoặc tím hoa cà đặc trưng.\n\nChú ý: Dipeptide (như Gly-Ala) KHÔNG có phản ứng màu Biuret!',
    hint: 'Từ tripeptide trở lên mới có màu tím.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-07',
    chapterId: 'chuong-5-pin-dien-hoa',
    topic: 'Pin điện hóa',
    category: 'Công thức',
    front: 'Nêu công thức tính sức điện động chuẩn của pin điện hóa (E°_pin) và xác định cực Anode, Cathode trong pin Galvani Zn - Cu.',
    back: '1. Công thức: E°_pin = E°_Cathode - E°_Anode = E°(dương) - E°(âm) > 0\n\n2. Trong pin Zn - Cu:\n- Anode (cực âm): Thanh Zn nhúng trong Zn²⁺ (xảy ra quá trình OXI HÓA: Zn → Zn²⁺ + 2e).\n- Cathode (cực dương): Thanh Cu nhúng trong Cu²⁺ (xảy ra quá trình KHỬ: Cu²⁺ + 2e → Cu).\n- Sức điện động chuẩn: E°_pin = +0.34 - (-0.76) = 1.10 V.',
    hint: 'E° pin = E° cực dương - E° cực âm = 1.10 V.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  },
  {
    id: 'fc-08',
    chapterId: 'chuong-5-pin-dien-hoa',
    topic: 'Điện phân',
    category: 'Bẫy đề thi',
    front: 'Có thể điều chế kim loại Natri (Na) hoặc Nhôm (Al) bằng phương pháp điện phân dung dịch muối của chúng được không? Vì sao?',
    back: 'KHÔNG THỂ!\n- Do ion Na⁺ và Al³⁺ có tính oxi hóa rất yếu (thế điện cực rất âm), trong dung dịch nước phân tử H₂O sẽ bị khử trước ở catot giải phóng khí H₂:\n2H₂O + 2e → H₂↑ + 2OH⁻\n\n- Để điều chế Na, Al: BẮT BUỘC dùng phương pháp ĐIỆN PHÂN NÓNG CHẢY (NaCl nóng chảy, Al₂O₃ nóng chảy pha criolit Na₃AlF₆).',
    hint: 'H₂O phóng điện trước kim loại kiềm trong dung dịch.',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString()
  }
];
