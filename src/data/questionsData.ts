import { Question } from '../types/chemistry';

export const EXAM_2026_QUESTIONS: Question[] = [
  // --- PHẦN I: 18 CÂU TRẮC NGHIỆM 4 PHƯƠNG ÁN (Mỗi câu 0.25 điểm) ---
  {
    id: 'exam-p1-01',
    topic: 'Ester - Danh pháp',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Ester có công thức cấu tạo thu gọn CH₃COOC₂H₅ có tên gọi là:',
    options: [
      { key: 'A', text: 'Ethyl acetate' },
      { key: 'B', text: 'Methyl acetate' },
      { key: 'C', text: 'Ethyl formate' },
      { key: 'D', text: 'Methyl propionate' }
    ],
    correctAnswer: 'A',
    explanation: 'CH₃COOC₂H₅ được tạo thành từ gốc axit axetic (CH₃COO-) và gốc ancol etylic (-C₂H₅). Tên gọi là Ethyl acetate (hoặc Etyl axetat).'
  },
  {
    id: 'exam-p1-02',
    topic: 'Lipid - Axit béo',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Chất nào sau đây là axit béo no thường gặp trong chất béo mỡ động vật?',
    options: [
      { key: 'A', text: 'Axit stearic (C₁₇H₃₅COOH)' },
      { key: 'B', text: 'Axit oleic (C₁₇H₃₃COOH)' },
      { key: 'C', text: 'Axit linoleic (C₁₇H₃₁COOH)' },
      { key: 'D', text: 'Axit axetic (CH₃COOH)' }
    ],
    correctAnswer: 'A',
    explanation: 'Axit stearic có công thức C₁₇H₃₅COOH là axit béo no có mạch cacbon dài không phân nhánh.'
  },
  {
    id: 'exam-p1-03',
    topic: 'Carbohydrate - Phân loại',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Carbohydrate nào sau đây thuộc loại monosaccharide không bị thủy phân?',
    options: [
      { key: 'A', text: 'Glucose' },
      { key: 'B', text: 'Saccharose' },
      { key: 'C', text: 'Tinh bột' },
      { key: 'D', text: 'Cellulose' }
    ],
    correctAnswer: 'A',
    explanation: 'Glucose và Fructose là các monosaccharide (đường đơn) đơn giản nhất, không bị thủy phân.'
  },
  {
    id: 'exam-p1-04',
    topic: 'Carbohydrate - Nhận biết tinh bột',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Hồ tinh bột tác dụng với dung dịch chất nào sau đây tạo hợp chất có màu xanh tím?',
    options: [
      { key: 'A', text: 'Iodine (I₂)' },
      { key: 'B', text: 'Cu(OH)₂' },
      { key: 'C', text: 'AgNO₃ trong NH₃' },
      { key: 'D', text: 'Dung dịch Brom' }
    ],
    correctAnswer: 'A',
    explanation: 'Dung dịch Iodine tương tác đặc trưng với chuỗi xoắn amylose trong hồ tinh bột tạo phức chất màu xanh tím.'
  },
  {
    id: 'exam-p1-05',
    topic: 'Amine - Tính base',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Dãy các chất nào sau đây được sắp xếp theo chiều tính base giảm dần?',
    options: [
      { key: 'A', text: 'CH₃NH₂ > NH₃ > C₆H₅NH₂' },
      { key: 'B', text: 'C₆H₅NH₂ > NH₃ > CH₃NH₂' },
      { key: 'C', text: 'NH₃ > CH₃NH₂ > C₆H₅NH₂' },
      { key: 'D', text: 'CH₃NH₂ > C₆H₅NH₂ > NH₃' }
    ],
    correctAnswer: 'A',
    explanation: 'Gốc đẩy e (-CH₃) làm tăng mật độ điện tích âm trên N nên tính base mạnh hơn NH₃; gốc hút e thơm (-C₆H₅) làm giảm mạnh mật độ e trên N nên anilin có tính base rất yếu không đổi màu quỳ tím.'
  },
  {
    id: 'exam-p1-06',
    topic: 'Amino acid - Khái niệm',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Chất nào sau đây là amino acid đơn giản nhất (axit 2-aminoetanoic)?',
    options: [
      { key: 'A', text: 'Glycine (H₂N-CH₂-COOH)' },
      { key: 'B', text: 'Alanine (CH₃-CH(NH₂)-COOH)' },
      { key: 'C', text: 'Valine' },
      { key: 'D', text: 'Lysine' }
    ],
    correctAnswer: 'A',
    explanation: 'Glycine (H₂N-CH₂-COOH, M = 75) là α-amino acid đơn giản nhất không có đồng phân quang học.'
  },
  {
    id: 'exam-p1-07',
    topic: 'Peptide - Phản ứng màu Biuret',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Chất nào sau đây KHÔNG có phản ứng màu Biuret với Cu(OH)₂ trong môi trường kiềm?',
    options: [
      { key: 'A', text: 'Gly-Ala' },
      { key: 'B', text: 'Ala-Gly-Val' },
      { key: 'C', text: 'Lòng trắng trứng (Albumin)' },
      { key: 'D', text: 'Gly-Ala-Gly-Ala' }
    ],
    correctAnswer: 'A',
    explanation: 'Gly-Ala là dipeptide chỉ có 1 liên kết peptide. Phản ứng màu biuret đòi hỏi phải có từ 2 liên kết peptide trở lên (từ tripeptide trở lên).'
  },
  {
    id: 'exam-p1-08',
    topic: 'Polymer - Trùng ngưng',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Polymer nào sau đây được điều chế bằng phản ứng trùng ngưng?',
    options: [
      { key: 'A', text: 'Nilon-6,6' },
      { key: 'B', text: 'Polyethylene (PE)' },
      { key: 'C', text: 'Poly(vinyl chloride) (PVC)' },
      { key: 'D', text: 'Cao su buna' }
    ],
    correctAnswer: 'A',
    explanation: 'Nilon-6,6 được điều chế bằng phản ứng trùng ngưng giữa hexamethylenediamine và axit adipic (kèm giải phóng H₂O).'
  },
  {
    id: 'exam-p1-09',
    topic: 'Pin điện hóa - Khái niệm điện cực',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Trong pin điện hóa Galvani Zn - Cu, tại cực âm (Anode) xảy ra quá trình nào?',
    options: [
      { key: 'A', text: 'Oxi hóa kim loại kẽm (Zn → Zn²⁺ + 2e)' },
      { key: 'B', text: 'Khử kim loại kẽm' },
      { key: 'C', text: 'Khử ion đồng (Cu²⁺ + 2e → Cu)' },
      { key: 'D', text: 'Oxi hóa ion đồng' }
    ],
    correctAnswer: 'A',
    explanation: 'Trong pin Galvani, Anode là cực âm, tại đây luôn xảy ra quá trình OXI HÓA chất khử mạnh hơn: Zn → Zn²⁺ + 2e.'
  },
  {
    id: 'exam-p1-10',
    topic: 'Pin điện hóa - Tính thế chuẩn',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Cho thế điện cực chuẩn E°(Zn²⁺/Zn) = -0.76 V và E°(Cu²⁺/Cu) = +0.34 V. Sức điện động chuẩn của pin Zn - Cu là:',
    options: [
      { key: 'A', text: '1.10 V' },
      { key: 'B', text: '0.42 V' },
      { key: 'C', text: '-1.10 V' },
      { key: 'D', text: '1.42 V' }
    ],
    correctAnswer: 'A',
    explanation: 'E°_pin = E°_Cathode - E°_Anode = (+0.34) - (-0.76) = 1.10 V.'
  },
  {
    id: 'exam-p1-11',
    topic: 'Điện phân - Nguyên tắc',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Khi điện phân dung dịch CuSO₄ với điện cực trơ, tại cực âm (Cathode) xảy ra quá trình:',
    options: [
      { key: 'A', text: 'Khử ion Cu²⁺ (Cu²⁺ + 2e → Cu)' },
      { key: 'B', text: 'Oxi hóa ion Cu²⁺' },
      { key: 'C', text: 'Oxi hóa phân tử nước' },
      { key: 'D', text: 'Khử ion SO₄²⁻' }
    ],
    correctAnswer: 'A',
    explanation: 'Tại Cathode (cực âm của bình điện phân), các cation chuyển về và xảy ra quá trình khử: Cu²⁺ + 2e → Cu.'
  },
  {
    id: 'exam-p1-12',
    topic: 'Kim loại - Tính chất vật lý',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Kim loại có độ dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại là:',
    options: [
      { key: 'A', text: 'Bạc (Ag)' },
      { key: 'B', text: 'Đồng (Cu)' },
      { key: 'C', text: 'Nhôm (Al)' },
      { key: 'D', text: 'Vàng (Au)' }
    ],
    correctAnswer: 'A',
    explanation: 'Dãy dẫn điện giảm dần: Ag > Cu > Au > Al > Fe.'
  },
  {
    id: 'exam-p1-13',
    topic: 'Ăn mòn kim loại',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Để bảo vệ vỏ tàu biển bằng thép (hợp kim của sắt) khỏi bị ăn mòn điện hóa trong nước biển, người ta gắn vào vỏ tàu những tấm kim loại nào?',
    options: [
      { key: 'A', text: 'Kẽm (Zn)' },
      { key: 'B', text: 'Đồng (Cu)' },
      { key: 'C', text: 'Bạc (Ag)' },
      { key: 'D', text: 'Thiếc (Sn)' }
    ],
    correctAnswer: 'A',
    explanation: 'Phương pháp bảo vệ bằng điện cực hi sinh (bảo vệ catot): Kẽm có tính khử mạnh hơn sắt, nên trong cặp Zn-Fe, Zn đóng vai trò anode bị ăn mòn thay cho sắt.'
  },
  {
    id: 'exam-p1-14',
    topic: 'Phức chất - GDPT 2018',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Trong phức chất [Cu(H₂O)₆]²⁺, ion Cu²⁺ đóng vai trò là:',
    options: [
      { key: 'A', text: 'Nguyên tử/ion trung tâm' },
      { key: 'B', text: 'Phối tử (ligand)' },
      { key: 'C', text: 'Cầu ngoại' },
      { key: 'D', text: 'Chất khử' }
    ],
    correctAnswer: 'A',
    explanation: 'Cu²⁺ là ion kim loại chuyển tiếp đóng vai trò là nguyên tử/ion trung tâm nhận cặp electron tự do từ các phân tử H₂O (phối tử).'
  },
  {
    id: 'exam-p1-15',
    topic: 'Ester - Thủy phân kiềm',
    level: 'TH',
    type: 'single_choice',
    prompt: 'Đun nóng methyl formate (HCOOCH₃) với dung dịch NaOH vừa đủ thu được muối là:',
    options: [
      { key: 'A', text: 'HCOONa' },
      { key: 'B', text: 'CH₃COONa' },
      { key: 'C', text: 'CH₃ONa' },
      { key: 'D', text: 'C₂H₅COONa' }
    ],
    correctAnswer: 'A',
    explanation: 'HCOOCH₃ + NaOH → HCOONa (Natri fomat) + CH₃OH.'
  },
  {
    id: 'exam-p1-16',
    topic: 'Carbohydrate - Tính chất Cellulose',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Cellulose trinitrate được ứng dụng phổ biến làm:',
    options: [
      { key: 'A', text: 'Thuốc súng không khói' },
      { key: 'B', text: 'Phân bón hóa học' },
      { key: 'C', text: 'Dung môi pha sơn' },
      { key: 'D', text: 'Hương liệu tạo mùi chuối' }
    ],
    correctAnswer: 'A',
    explanation: 'Cellulose trinitrate là hợp chất nổ rất mạnh, bắt cháy nhanh và không để lại khói bụi.'
  },
  {
    id: 'exam-p1-17',
    topic: 'Kim loại chuyển tiếp dãy thứ nhất',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Cấu hình electron nguyên tử của sắt (Fe, Z = 26) ở trạng thái cơ bản là:',
    options: [
      { key: 'A', text: '[Ar] 3d⁶ 4s²' },
      { key: 'B', text: '[Ar] 3d⁸' },
      { key: 'C', text: '[Ar] 3d⁵ 4s³' },
      { key: 'D', text: '[Ar] 4s² 4p⁶' }
    ],
    correctAnswer: 'A',
    explanation: 'Fe có 26 electron: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² hay viết gọn là [Ar] 3d⁶ 4s².'
  },
  {
    id: 'exam-p1-18',
    topic: 'Hóa học và Môi trường',
    level: 'NB',
    type: 'single_choice',
    prompt: 'Khí nào sau đây là nguyên nhân chính gây ra hiệu ứng nhà kính làm trái đất nóng lên?',
    options: [
      { key: 'A', text: 'Carbon dioxide (CO₂)' },
      { key: 'B', text: 'Oxygen (O₂)' },
      { key: 'C', text: 'Nitrogen (N₂)' },
      { key: 'D', text: 'Helium (He)' }
    ],
    correctAnswer: 'A',
    explanation: 'Khí CO₂ và CH₄ là các khí nhà kính giữ nhiệt hồng ngoại bức xạ lại bề mặt Trái Đất.'
  },

  // --- PHẦN II: 4 CÂU ĐÚNG / SAI (Mỗi câu gồm 4 lệnh a, b, c, d - Tổng 4.0 điểm) ---
  {
    id: 'exam-p2-01',
    topic: 'Chuyên đề Ester - Lipid',
    level: 'VD',
    type: 'true_false_group',
    prompt: 'Tiến hành thí nghiệm xà phòng hóa chất béo: Cho vào bát sứ 2 gam mỡ lợn và 5 mL dung dịch NaOH 40%. Đun sôi nhẹ hỗn hợp trong khoảng 30 phút và liên tục khuấy đều, thỉnh thoảng thêm vài giọt nước cất. Sau đó rót thêm 10 mL dung dịch NaCl bão hòa nóng, khuấy nhẹ rồi để nguội.',
    subStatements: [
      {
        id: 'a',
        statement: 'Mục đích của việc thêm nước cất trong quá trình đun là để bù đắp lượng nước bay hơi, tránh hỗn hợp bị cạn khô làm cháy chất hữu cơ.',
        isCorrect: true,
        explanation: 'Đúng. Khi đun sôi 30 phút nước bốc hơi nhanh, nếu không thêm nước phản ứng thủy phân không diễn ra được và mỡ sẽ bị cháy khét.'
      },
      {
        id: 'b',
        statement: 'Thêm dung dịch NaCl bão hòa nhằm mục đích tăng khối lượng riêng của dung dịch và làm giảm độ tan của muối axit béo, giúp xà phòng tách lớp và nổi lên trên.',
        isCorrect: true,
        explanation: 'Đúng. Đây là kỹ thuật muối hóa (salting-out).'
      },
      {
        id: 'c',
        statement: 'Phần chất lỏng phía dưới sau khi tách xà phòng chứa glycerol và không có phản ứng hòa tan Cu(OH)₂.',
        isCorrect: false,
        explanation: 'Sai. Phần chất lỏng đáy chứa glycerol C₃H₅(OH)₃ là ancol đa chức có 3 nhóm -OH kề nhau, hòa tan rất tốt Cu(OH)₂ tạo dung dịch phức màu xanh lam thẫm.'
      },
      {
        id: 'd',
        statement: 'Nếu thay mỡ lợn bằng dầu bôi trơn xe máy thì thí nghiệm vẫn thu được xà phòng tương tự.',
        isCorrect: false,
        explanation: 'Sai. Dầu bôi trơn máy là hỗn hợp hydrocacbon từ dầu mỏ, không chứa liên kết este nên không phản ứng xà phòng hóa với NaOH.'
      }
    ],
    explanation: 'Quy trình xà phòng hóa chất béo: Đun hồi lưu bù nước -> Thêm NaCl bão hòa tách xà phòng -> Lớp váng xà phòng nổi lên, lớp đáy là glycerol + NaOH dư + NaCl.'
  },
  {
    id: 'exam-p2-02',
    topic: 'Chuyên đề Carbohydrate',
    level: 'VD',
    type: 'true_false_group',
    prompt: 'Cho các carbohydrate sau: Glucose, Fructose, Saccharose, Tinh bột và Cellulose.',
    subStatements: [
      {
        id: 'a',
        statement: 'Tất cả các chất trên đều tham gia phản ứng thủy phân trong môi trường axit khi đun nóng.',
        isCorrect: false,
        explanation: 'Sai. Glucose và Fructose là monosaccharide không bị thủy phân.'
      },
      {
        id: 'b',
        statement: 'Glucose và Fructose đều có phản ứng tráng bạc với thuốc thử [Ag(NH₃)₂]OH.',
        isCorrect: true,
        explanation: 'Đúng. Glucose có nhóm -CHO; Fructose trong môi trường kiềm chuyển hóa thành Glucose nên cũng tráng bạc.'
      },
      {
        id: 'c',
        statement: 'Có thể phân biệt Glucose và Fructose bằng dung dịch nước brom (Br₂).',
        isCorrect: true,
        explanation: 'Đúng. Glucose làm mất màu nước brom tạo axit gluconic, còn Fructose không làm mất màu nước brom.'
      },
      {
        id: 'd',
        statement: 'Tinh bột và Cellulose là đồng phân của nhau vì đều có công thức phân tử chung là (C₆H₁₀O₅)ₙ.',
        isCorrect: false,
        explanation: 'Sai. Hệ số polyme hóa n của chúng rất khác nhau và cấu trúc mắt xích khác nhau (α vs β) nên không phải đồng phân.'
      }
    ],
    explanation: 'Carbohydrate chia làm 3 nhóm: Monosaccharide (không thủy phân), Disaccharide (thủy phân ra 2 phân tử đường đơn), Polysaccharide (thủy phân ra nhiều phân tử glucose).'
  },
  {
    id: 'exam-p2-03',
    topic: 'Chuyên đề Pin điện hóa và Điện phân',
    level: 'VD',
    type: 'true_false_group',
    prompt: 'Một nhóm học sinh thiết lập một pin điện hóa Galvani Kẽm - Bạc gồm hai bán pin: thanh Zn nhúng trong Zn(NO₃)₂ 1M và thanh Ag nhúng trong AgNO₃ 1M. Cho thế điện cực chuẩn: E°(Zn²⁺/Zn) = -0.76 V và E°(Ag⁺/Ag) = +0.80 V.',
    subStatements: [
      {
        id: 'a',
        statement: 'Thanh kẽm (Zn) đóng vai trò là cực âm (Anode) và thanh bạc (Ag) là cực dương (Cathode).',
        isCorrect: true,
        explanation: 'Đúng. Zn có thế âm hơn nên tính khử mạnh hơn, đóng vai trò Anode (cực âm).'
      },
      {
        id: 'b',
        statement: 'Sức điện động chuẩn của pin Zn - Ag đo được bằng vôn kế là 1.56 V.',
        isCorrect: true,
        explanation: 'Đúng. E°_pin = E°(Ag⁺/Ag) - E°(Zn²⁺/Zn) = +0.80 - (-0.76) = 1.56 V.'
      },
      {
        id: 'c',
        statement: 'Trong quá trình pin hoạt động, dòng electron di chuyển từ thanh bạc sang thanh kẽm qua dây dẫn ngoài.',
        isCorrect: false,
        explanation: 'Sai. Electron sinh ra do Zn bị oxi hóa ở cực âm nên dòng electron chạy từ thanh Zn sang thanh Ag.'
      },
      {
        id: 'd',
        statement: 'Khối lượng thanh bạc tăng lên trong khi khối lượng thanh kẽm giảm đi.',
        isCorrect: true,
        explanation: 'Đúng. Tại thanh Ag: Ag⁺ + 1e → Ag bám vào làm thanh Ag nặng lên. Tại thanh Zn: Zn → Zn²⁺ + 2e tan vào dung dịch làm thanh Zn mòn đi.'
      }
    ],
    explanation: 'Quy tắc Pin Galvani: Kim loại có tính khử mạnh hơn là Anode (cực âm, bị mòn). Kim loại có thế dương hơn là Cathode (cực dương, cation phóng điện bám vào làm tăng khối lượng).'
  },
  {
    id: 'exam-p2-04',
    topic: 'Chuyên đề Hợp chất chứa Nitrogen và Polymer',
    level: 'VD',
    type: 'true_false_group',
    prompt: 'Cho các phát biểu về amine, amino acid, protein và polymer sau:',
    subStatements: [
      {
        id: 'a',
        statement: 'Anilin (C₆H₅NH₂) phản ứng với dung dịch nước brom tạo kết tủa trắng 2,4,6-tribromoaniline.',
        isCorrect: true,
        explanation: 'Đúng. Nhóm -NH₂ kích hoạt nhân thơm mạnh ở các vị trí ortho và para.'
      },
      {
        id: 'b',
        statement: 'Dipeptide Ala-Gly làm đổi màu dung dịch quỳ tím sang màu xanh lam.',
        isCorrect: false,
        explanation: 'Sai. Ala-Gly có 1 nhóm -NH₂ và 1 nhóm -COOH tự do nên dung dịch có môi trường gần như trung tính, không đổi màu quỳ tím.'
      },
      {
        id: 'c',
        statement: 'Các amino acid thiên nhiên hầu hết là các α-amino acid và tồn tại chủ yếu ở dạng ion lưỡng cực.',
        isCorrect: true,
        explanation: 'Đúng. Do tương tác nội phân tử giữa nhóm -COOH axit và nhóm -NH₂ bazơ tạo H₃N⁺-R-COO⁻.'
      },
      {
        id: 'd',
        statement: 'Poly(methyl methacrylate) (thủy tinh hữu cơ plexiglas) được điều chế bằng phản ứng trùng hợp methyl methacrylate.',
        isCorrect: true,
        explanation: 'Đúng. CH₂=C(CH₃)COOCH₃ trùng hợp tạo plexiglas trong suốt và bền cơ học.'
      }
    ],
    explanation: 'Tổng hợp kiến thức Amine, Amino acid và Polyme.'
  },

  // --- PHẦN III: 6 CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN / TÍNH TOÁN (Mỗi câu 0.25 điểm - Tổng 1.5 điểm) ---
  {
    id: 'exam-p3-01',
    topic: 'Ester - Tính khối lượng kết tủa Ag',
    level: 'TH',
    type: 'short_answer',
    prompt: 'Thủy phân hoàn toàn 4.4 gam ethyl formate (HCOOC₂H₅, M = 74) trong dung dịch NaOH đun nóng. Lấy toàn bộ dung dịch sau phản ứng cho tác dụng với lượng dư dung dịch AgNO₃ trong NH₃, đun nhẹ. Tính khối lượng kim loại Ag (gam) kết tủa tối đa thu được. (Cho Ag = 108). Làm tròn đến 1 chữ số thập phân.',
    correctAnswer: '12.8',
    explanation: 'Phương trình thủy phân: HCOOC₂H₅ + NaOH → HCOONa + C₂H₅OH.\nSố mol HCOOC₂H₅ = 4.4 / 74 ≈ 0.05946 mol.\nMuối HCOONa có nhóm -CHO nên tráng bạc: 1 HCOONa → 2 Ag.\nSố mol Ag = 2 * 0.05946 = 0.1189 mol.\nKhối lượng Ag = 0.1189 * 108 ≈ 12.8 gam.'
  },
  {
    id: 'exam-p3-02',
    topic: 'Lipid - Số mol liên kết Pi',
    level: 'TH',
    type: 'short_answer',
    prompt: 'Một phân tử triacylglycerol X (chất béo) được tạo thành từ 1 gốc panmitat (C₁₅H₃₁COO-) và 2 gốc oleat (C₁₇H₃₃COO-). Hỏi 1 phân tử X có tổng cộng bao nhiêu liên kết đôi C=C giữa các nguyên tử carbon trong toàn bộ phân tử?',
    correctAnswer: '2',
    explanation: 'Gốc panmitat là gốc no (0 liên kết C=C). Mỗi gốc oleat có 1 liên kết C=C. Do đó phân tử chứa 2 gốc oleat sẽ có đúng 2 liên kết C=C.'
  },
  {
    id: 'exam-p3-03',
    topic: 'Carbohydrate - Lên men rượu hiệu suất',
    level: 'VD',
    type: 'short_answer',
    prompt: 'Lên men m gam glucose thành ethanol với hiệu suất toàn bộ quá trình là 80%. Toàn bộ khí CO₂ sinh ra được dẫn vào nước vôi trong dư thu được 40 gam kết tủa CaCO₃ (M = 100). Tính giá trị của m (gam).',
    correctAnswer: '45',
    explanation: 'Số mol CaCO₃ = 40 / 100 = 0.4 mol = số mol CO₂ sinh ra.\nPhương trình lên men: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.\nTheo lý thuyết: n_glucose lý thuyết = n_CO₂ / 2 = 0.4 / 2 = 0.2 mol.\nVì hiệu suất H = 80% nên n_glucose thực tế cần dùng = 0.2 / 0.8 = 0.25 mol.\nKhối lượng glucose: m = 0.25 * 180 = 45 gam.'
  },
  {
    id: 'exam-p3-04',
    topic: 'Peptide - Tính số liên kết peptide',
    level: 'NB',
    type: 'short_answer',
    prompt: 'Một oligopeptide X có mạch hở được tạo từ các amino acid có cấu tạo: Gly-Ala-Val-Gly-Ala. Số liên kết peptide (-CO-NH-) có trong một phân tử X là bao nhiêu?',
    correctAnswer: '4',
    explanation: 'Peptide này gồm 5 gốc amino acid (pentapeptide). Số liên kết peptide = số mắt xích - 1 = 5 - 1 = 4.'
  },
  {
    id: 'exam-p3-05',
    topic: 'Pin điện hóa - Tính suất điện động',
    level: 'TH',
    type: 'short_answer',
    prompt: 'Cho thế điện cực chuẩn: E°(Ni²⁺/Ni) = -0.26 V và E°(Ag⁺/Ag) = +0.80 V. Sức điện động chuẩn của pin điện hóa Ni - Ag (E°_pin) bằng bao nhiêu vôn (V)? Nhập kết quả dưới dạng số thập phân dùng dấu chấm (ví dụ: 1.06).',
    correctAnswer: '1.06',
    explanation: 'E°_pin = E°_Cathode - E°_Anode = E°(Ag⁺/Ag) - E°(Ni²⁺/Ni) = (+0.80) - (-0.26) = 1.06 V.'
  },
  {
    id: 'exam-p3-06',
    topic: 'Điện phân dung dịch - Định luật Faraday',
    level: 'VDC',
    type: 'short_answer',
    prompt: 'Điện phân 200 mL dung dịch CuSO₄ 1M với điện cực trơ, cường độ dòng điện I = 9.65 A trong thời gian 2000 giây (hiệu suất 100%). Biết F = 96500 C/mol. Tính khối lượng Cu kim loại (gam) bám trên catot. Cho Cu = 64. Làm tròn đến 2 chữ số thập phân.',
    correctAnswer: '6.4',
    explanation: 'Số mol electron trao đổi: n_e = (I * t) / F = (9.65 * 2000) / 96500 = 0.2 mol.\nSố mol Cu²⁺ ban đầu = 0.2 * 1 = 0.2 mol.\nTại Cathode: Cu²⁺ + 2e → Cu.\nCần 2 mol e để khử 1 mol Cu²⁺. Do đó n_Cu bám = n_e / 2 = 0.2 / 2 = 0.1 mol.\nKhối lượng Cu bám = 0.1 * 64 = 6.4 gam.'
  }
];
