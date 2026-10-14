import { Experiment } from '../types/chemistry';

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: 'exp-silver-mirror',
    title: 'Thí nghiệm 1: Phản ứng tráng bạc của Glucose (Tollens Test)',
    category: 'Carbohydrate - Phản ứng tráng gương',
    chapterId: 'chuong-2-carbohydrate',
    lessonId: 'bai-3-glucose-fructose',
    objective: 'Chứng minh trong phân tử Glucose có chứa nhóm chức aldehyde (-CHO) có tính khử mạnh, tạo lớp gương bạc sáng bóng trên thành ống nghiệm.',
    apparatus: [
      'Ống nghiệm thủy tinh sạch (đã rửa kỹ bằng dung dịch kiềm)',
      'Giá để ống nghiệm',
      'Ống nhỏ giọt (pipet pasteur)',
      'Cốc thủy tinh chịu nhiệt chứa nước nóng 60 - 70°C (nồi cách thủy)',
      'Đèn cồn hoặc bình giữ nhiệt'
    ],
    chemicals: [
      'Dung dịch AgNO₃ 1%',
      'Dung dịch NH₃ 5%',
      'Dung dịch Glucose (C₆H₁₂O₆) 2%'
    ],
    safetyNotes: [
      'AgNO₃ có thể làm đen da và quần áo khi tiếp xúc trực tiếp.',
      'Khí NH₃ có mùi khai nồng, nên thao tác nơi thoáng khí hoặc bật quạt hút.',
      'Phức chất bạc nếu để lâu có thể tạo chất nổ fulminate Ag₃N, sau thí nghiệm cần rửa sạch ống nghiệm bằng axit nitric loãng HNO₃.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Lấy dung dịch AgNO₃ vào ống nghiệm',
        instruction: 'Nhỏ khoảng 1 mL dung dịch AgNO₃ 1% vào ống nghiệm sạch.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch AgNO₃ 1%',
        reagentAmount: '1 mL (~20 giọt)',
        phenomenon: 'Dung dịch trong suốt không màu trong ống nghiệm.',
        explanation: 'Chuẩn bị cation Ag⁺ tự do trong dung dịch.',
        liquidColor: '#e0f2fe'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Tạo phức chất [Ag(NH₃)₂]OH (Thuốc thử Tollens)',
        instruction: 'Nhỏ từ từ từng giọt dung dịch NH₃ 5% vào ống nghiệm, lắc đều đến khi kết tủa nâu đen Ag₂O vừa xuất hiện rồi tan hết hoàn toàn thành dung dịch trong suốt.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch NH₃ 5%',
        reagentAmount: 'Từng giọt đến tan hết kết tủa',
        phenomenon: 'Ban đầu xuất hiện vẩn đục màu xám nâu (Ag₂O), sau đó tan nhanh thành dung dịch trong suốt không màu chứa phức [Ag(NH₃)₂]⁺.',
        explanation: 'Phản ứng: 2Ag⁺ + 2NH₃ + H₂O → Ag₂O↓ (nâu) + 2NH₄⁺. Sau đó: Ag₂O + 4NH₃ + H₂O → 2[Ag(NH₃)₂]⁺ + 2OH⁻.',
        reactionEquation: 'Ag⁺ + 2NH₃ + H₂O ⇌ [Ag(NH₃)₂]⁺ + OH⁻',
        liquidColor: '#f1f5f9'
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Thêm dung dịch Glucose',
        instruction: 'Thêm tiếp khoảng 1 mL dung dịch glucose 2% vào ống nghiệm, lắc nhẹ cho đều hỗn hợp.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch Glucose 2%',
        reagentAmount: '1 mL',
        phenomenon: 'Dung dịch vẫn trong suốt không màu ở nhiệt độ phòng.',
        explanation: 'Ở nhiệt độ thường phản ứng diễn ra rất chậm, cần cung cấp năng lượng nhiệt để hoạt hóa phản ứng oxi hóa - khử.',
        liquidColor: '#e2e8f0'
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Đun nóng cách thủy (60 - 70°C)',
        instruction: 'Đặt ống nghiệm vào cốc nước nóng (khoảng 60 - 70°C). Giữ yên không lắc ống nghiệm trong 3 - 5 phút.',
        actionType: 'heat',
        reagentAmount: 'Nước nóng 65°C',
        phenomenon: 'Thành trong của ống nghiệm dần dần xuất hiện một lớp bạc kim loại màu trắng xám rồi sáng bóng như chiếc gương soi.',
        explanation: 'Nhóm -CHO của glucose khử ion [Ag(NH₃)₂]⁺ thành bạc kim loại (Ag). Các nguyên tử Ag kết tinh đều đặn bám chặt vào thành thủy tinh sạch tạo bề mặt tráng gương.',
        reactionEquation: 'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
        liquidColor: '#94a3b8',
        mirrorCoating: true,
        temperature: 65
      }
    ],
    mechanismExplanation: 'Nhóm chức aldehyde (-CHO) trên mạch hở của phân tử Glucose đóng vai trò là chất khử, nhường 2 electron để chuyển thành gốc axit carboxylic (axit gluconic dưới dạng muối amoni gluconat). Phức chất bạc amoniac đóng vai trò là chất oxi hóa, nhận electron chuyển thành bạc kim loại Ag.',
    balancedEquations: [
      'AgNO₃ + 3NH₃ + H₂O → [Ag(NH₃)₂]OH + NH₄NO₃',
      'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH xrightarrow{t°} CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O'
    ],
    quizQuestions: [
      {
        id: 'q-exp-silver-1',
        topic: 'Thí nghiệm tráng bạc',
        level: 'TH',
        type: 'single_choice',
        prompt: 'Vì sao trong bước 4 cần đặt ống nghiệm trong cốc nước nóng và không được lắc ống nghiệm?',
        options: [
          { key: 'A', text: 'Để các nguyên tử Ag kết tinh đều bám thành lớp gương trên thành thủy tinh; nếu lắc, Ag sẽ tạo kết tủa đen lơ lửng.' },
          { key: 'B', text: 'Để tránh khí NH₃ thoát ra ngoài gây mùi khó chịu.' },
          { key: 'C', text: 'Để phản ứng không sinh ra nhiệt lượng quá lớn làm vỡ ống nghiệm.' },
          { key: 'D', text: 'Vì nếu lắc thì dung dịch Glucose sẽ bị phân hủy hoàn toàn.' }
        ],
        correctAnswer: 'A',
        explanation: 'Giữ yên ống nghiệm giúp các nguyên tử bạc kết tinh từ từ và đồng đều bám chặt vào thành thủy tinh tạo thành lớp gương sáng bóng. Nếu lắc mạnh, các tinh thể bạc va chạm gom lại tạo thành kết tủa màu xám đen lơ lửng trong dung dịch.'
      }
    ]
  },
  {
    id: 'exp-esterification',
    title: 'Thí nghiệm 2: Phản ứng Ester hóa (Điều chế Ethyl Acetate)',
    category: 'Ester - Điều chế hữu cơ',
    chapterId: 'chuong-1-ester-lipid',
    lessonId: 'bai-1-ester',
    objective: 'Tìm hiểu phản ứng thuận nghịch giữa axit axetic và ancol etylic có xúc tác H₂SO₄ đặc, quan sát hiện tượng tách lớp và cảm nhận mùi thơm đặc trưng của ester.',
    apparatus: [
      'Ống nghiệm thủy tinh chịu nhiệt A (ống phản ứng)',
      'Ống nghiệm B (ống thu hồi chứa dung dịch NaCl bão hòa)',
      'Ống dẫn khí thủy tinh có đầu uốn cong làm lạnh',
      'Đèn cồn và lưới amiang tản nhiệt',
      'Cốc nước lạnh để ngưng tụ'
    ],
    chemicals: [
      'Axit axetic nguyên chất (CH₃COOH băng)',
      'Ancol etylic nguyên chất (C₂H₅OH 96°)',
      'Axit sunfuric đặc (H₂SO₄ đặc 98%)',
      'Dung dịch NaCl bão hòa'
    ],
    safetyNotes: [
      'Axit H₂SO₄ đặc rất háo nước và ăn mòn da cực mạnh, phải dùng pipet cẩn thận và nhỏ từ từ theo thành ống nghiệm.',
      'C₂H₅OH và ester dễ bắt lửa, không để đèn cồn nghiêng gần miệng ống dẫn.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cho hóa chất vào ống nghiệm phản ứng',
        instruction: 'Cho 2 mL C₂H₅OH nguyên chất, 2 mL CH₃COOH băng vào ống nghiệm, sau đó nhỏ từ từ 1 mL H₂SO₄ đặc, lắc nhẹ.',
        actionType: 'add_reagent',
        reagentName: 'Hỗn hợp C₂H₅OH + CH₃COOH + H₂SO₄ đặc',
        reagentAmount: '5 mL',
        phenomenon: 'Hỗn hợp đồng nhất, ống nghiệm hơi nóng lên do quá trình hòa tan H₂SO₄ đặc tỏa nhiệt mạnh.',
        explanation: 'H₂SO₄ đặc đóng vai trò kép: xúc tác ion H⁺ và chất hút ẩm để chuyển dịch cân bằng.',
        liquidColor: '#f8fafc',
        temperature: 35
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Lắp ống dẫn khí và đun cách thủy / đun nhẹ',
        instruction: 'Lắp ống dẫn khí cong dẫn sang ống nghiệm B chứa 2 mL dung dịch NaCl bão hòa (ngâm trong cốc nước lạnh). Đun sôi nhẹ hỗn hợp trên ngọn lửa đèn cồn 65 - 70°C trong 5 - 7 phút.',
        actionType: 'heat',
        reagentAmount: 'Đèn cồn 70°C',
        phenomenon: 'Hơi ester ethyl acetate bay lên, ngưng tụ trong ống sinh hàn nhỏ từng giọt xuống ống nghiệm B.',
        explanation: 'Ethyl acetate có nhiệt độ sôi thấp (~77°C) nên bay hơi trước axit và ancol, được làm lạnh ngưng tụ thành chất lỏng.',
        reactionEquation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (H₂SO₄ đ, t°)',
        liquidColor: '#e0f2fe',
        bubbles: true,
        temperature: 70
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Quan sát hiện tượng phân lớp ở ống nghiệm B',
        instruction: 'Ngừng đun, quan sát ống nghiệm B chứa dung dịch NaCl bão hòa.',
        actionType: 'observe',
        phenomenon: 'Chất lỏng tách thành 2 lớp rõ rệt: lớp trên không màu, nhẹ hơn, có mùi thơm hoa quả ngọt dịu (mùi dầu chuối/táo); lớp dưới là dung dịch muối ăn NaCl.',
        explanation: 'Ethyl acetate không tan trong dung dịch NaCl bão hòa, có khối lượng riêng d ~ 0.9 g/mL (nhẹ hơn dung dịch muối d ~ 1.2 g/mL) nên nổi hoàn toàn lên bề mặt.',
        liquidColor: '#f1f5f9'
      }
    ],
    mechanismExplanation: 'Phản ứng ester hóa xảy ra theo cơ chế thế nhóm -OH của axit cacboxylic bởi nhóm -OC₂H₅ của ancol. Đây là phản ứng thuận nghịch. Axit sunfuric đặc hút nước sinh ra, làm nồng độ H₂O giảm xuống, theo nguyên lý Le Chatelier cân bằng chuyển dịch theo chiều thuận tạo nhiều ester hơn.',
    balancedEquations: [
      'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (H₂SO₄ đặc, 65 - 70°C)'
    ],
    quizQuestions: [
      {
        id: 'q-exp-ester-1',
        topic: 'Thí nghiệm Ester hóa',
        level: 'TH',
        type: 'single_choice',
        prompt: 'Mục đích chính của việc dẫn hơi este vào dung dịch NaCl bão hòa (thay vì nước cất) là gì?',
        options: [
          { key: 'A', text: 'Để làm giảm độ tan của ethyl acetate, tăng khối lượng riêng của lớp dung dịch đáy giúp este tách lớp nhanh và rõ ràng nhất.' },
          { key: 'B', text: 'Để trung hòa axit axetic bay hơi sang.' },
          { key: 'C', text: 'Để hòa tan ancol etylic còn dư tốt hơn.' },
          { key: 'D', text: 'Để khử mùi khó chịu của este.' }
        ],
        correctAnswer: 'A',
        explanation: 'NaCl bão hòa có nồng độ ion rất cao làm tăng tỷ trọng của dung dịch nước, đồng thời giảm mạnh độ tan của este hữu cơ (hiệu ứng "salting out" muối hóa), giúp lớp este nổi bật lên trên.'
      }
    ]
  },
  {
    id: 'exp-iodine-starch',
    title: 'Thí nghiệm 3: Phản ứng màu của Hồ tinh bột với Iodine (I₂)',
    category: 'Carbohydrate - Phản ứng nhận biết',
    chapterId: 'chuong-2-carbohydrate',
    lessonId: 'bai-4-tinh-bot-cellulose',
    objective: 'Quan sát sự đổi màu xanh tím đặc trưng khi cho dung dịch iodine vào hồ tinh bột và kiểm chứng tính thuận nghịch của cấu trúc xoắn amylose khi đun nóng / để nguội.',
    apparatus: [
      'Ống nghiệm thủy tinh',
      'Ống nhỏ giọt',
      'Đèn cồn',
      'Kẹp gỗ giữ ống nghiệm'
    ],
    chemicals: [
      'Dung dịch hồ tinh bột 1% (trong suốt hơi đục)',
      'Dung dịch thuốc thử Lugol (I₂ trong KI, màu vàng nâu)'
    ],
    safetyNotes: [
      'Iodine có thể gây ố vàng da và độc nếu hít phải lượng lớn.',
      'Cẩn thận khi đun ống nghiệm trên ngọn lửa đèn cồn, hướng miệng ống nghiệm về phía không có người.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cho hồ tinh bột vào ống nghiệm',
        instruction: 'Cho khoảng 2 mL dung dịch hồ tinh bột vào ống nghiệm sạch.',
        actionType: 'add_reagent',
        reagentName: 'Hồ tinh bột 1%',
        reagentAmount: '2 mL',
        phenomenon: 'Chất lỏng trong ống nghiệm có màu trắng đục nhẹ.',
        explanation: 'Amylose và amylopectin phân tán dạng keo trong nước.',
        liquidColor: '#f8fafc'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Nhỏ dung dịch Iodine vào hồ tinh bột',
        instruction: 'Nhỏ 2 - 3 giọt dung dịch iodine (thuốc thử Lugol màu vàng nâu) vào ống nghiệm, lắc đều.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch Iodine',
        reagentAmount: '3 giọt',
        phenomenon: 'Toàn bộ dung dịch lập tức chuyển sang màu XANH TÍM ĐẬM rất bắt mắt.',
        explanation: 'Phân tử amylose trong tinh bột cuộn thành hình xoắn ốc có các khoang rỗng. Các phân tử I₂ chui vào các khoang này tạo hợp chất bọc (phức chất hấp phụ) có màu xanh tím.',
        liquidColor: '#312e81'
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Đun nóng trên ngọn lửa đèn cồn',
        instruction: 'Hơ nóng đều đáy ống nghiệm rồi đun trực tiếp trên ngọn lửa đèn cồn.',
        actionType: 'heat',
        reagentAmount: 'Ngọn lửa đèn cồn 80°C',
        phenomenon: 'Màu xanh tím nhạt dần rồi BIẾN MẤT HOÀN TOÀN, dung dịch trở lại không màu trong suốt!',
        explanation: 'Khi nhiệt độ tăng, các liên kết hydro yếu giữ cấu trúc xoắn bị phá vỡ, chuỗi amylose duỗi thẳng ra giải phóng phân tử I₂ tự do.',
        liquidColor: '#f1f5f9',
        temperature: 80
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Để nguội hoặc ngâm vào nước lạnh',
        instruction: 'Tắt đèn cồn, để ống nghiệm nguội tự nhiên hoặc ngâm vào cốc nước lạnh.',
        actionType: 'observe',
        phenomenon: 'Màu XANH TÍM lại từ từ xuất hiện trở lại như ban đầu!',
        explanation: 'Khi nhiệt độ hạ xuống, chuỗi amylose cuộn xoắn trở lại và tiếp tục nhốt các phân tử I₂ vào bên trong.',
        liquidColor: '#3730a3',
        temperature: 25
      }
    ],
    mechanismExplanation: 'Phản ứng này không phải là phản ứng hóa học thông thường có sự biến đổi liên kết cộng hóa trị, mà là tương tác vật lý - hóa học tạo thành hợp chất bao (inclusion complex) giữa chuỗi xoắn amylose và phân tử I₂. Độ bền của cấu trúc xoắn phụ thuộc rất nhạy cảm vào nhiệt độ.',
    balancedEquations: [
      'Hồ tinh bột + I₂ ⇌ Phức chất màu xanh tím (Thuận nghịch theo nhiệt độ)'
    ],
    quizQuestions: [
      {
        id: 'q-exp-starch-1',
        topic: 'Nhận biết tinh bột',
        level: 'TH',
        type: 'single_choice',
        prompt: 'Hiện tượng màu xanh tím biến mất khi đun nóng và xuất hiện lại khi để nguội chứng tỏ điều gì?',
        options: [
          { key: 'A', text: 'Cấu trúc chuỗi xoắn của tinh bột bị duỗi ra khi nóng và cuộn xoắn lại khi nguội để giữ phân tử I₂.' },
          { key: 'B', text: 'Iodine đã bị thăng hoa bay hơi hết khỏi ống nghiệm.' },
          { key: 'C', text: 'Tinh bột đã bị thủy phân thành glucose khi đun nóng.' },
          { key: 'D', text: 'Iodine phản ứng với nước tạo HI và HIO.' }
        ],
        correctAnswer: 'A',
        explanation: 'Đây là quá trình biến tính thuận nghịch của cấu trúc bậc không gian lò xo của amylose: nóng thì duỗi thẳng thả I₂, nguội thì cuộn lại bẫy I₂.'
      }
    ]
  },
  {
    id: 'exp-biuret-protein',
    title: 'Thí nghiệm 4: Phản ứng màu Biuret nhận biết Protein',
    category: 'Protein - Phức chất màu tím',
    chapterId: 'chuong-3-nitrogen',
    lessonId: 'bai-5-protein-biuret',
    objective: 'Tìm hiểu phản ứng tạo phức chất chelate đặc trưng giữa ion Cu²⁺ trong môi trường kiềm với các liên kết peptide của protein.',
    apparatus: [
      'Ống nghiệm thủy tinh',
      'Giá để ống nghiệm',
      'Pipet nhỏ giọt'
    ],
    chemicals: [
      'Dung dịch CuSO₄ 2%',
      'Dung dịch NaOH 10%',
      'Dung dịch lòng trắng trứng gà (Albumin) 5%'
    ],
    safetyNotes: [
      'Dung dịch NaOH 10% có tính ăn mòn da, tránh dây vào mắt.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cho lòng trắng trứng vào ống nghiệm',
        instruction: 'Cho khoảng 2 mL dung dịch lòng trắng trứng (albumin) vào ống nghiệm.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch Lòng trắng trứng',
        reagentAmount: '2 mL',
        phenomenon: 'Chất lỏng trong suốt, hơi sánh nhẹ.',
        explanation: 'Cung cấp phân tử protein chuỗi dài chứa nhiều liên kết peptide -CO-NH-.',
        liquidColor: '#f8fafc'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Tạo môi trường kiềm mạnh',
        instruction: 'Nhỏ tiếp khoảng 1 mL dung dịch NaOH 10% vào ống nghiệm, lắc đều.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch NaOH 10%',
        reagentAmount: '1 mL',
        phenomenon: 'Dung dịch trong suốt đồng nhất.',
        explanation: 'Môi trường kiềm là bắt buộc để làm giảm liên kết proton hóa trên nguyên tử N của nhóm peptide, giúp ion Cu²⁺ dễ tạo phức.',
        liquidColor: '#f1f5f9'
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Nhỏ từng giọt CuSO₄',
        instruction: 'Nhỏ 2 - 3 giọt dung dịch CuSO₄ 2% vào ống nghiệm, lắc nhẹ.',
        actionType: 'add_reagent',
        reagentName: 'Dung dịch CuSO₄ 2%',
        reagentAmount: '3 giọt',
        phenomenon: 'Ngay lập tức xuất hiện MÀU TÍM hoặc TÍM HOA CÀ đặc trưng tuyệt đẹp!',
        explanation: 'Ion Cu²⁺ tạo phức chelate phối trí đồng thời với các nguyên tử Nitrogen của 4 liên kết peptide lân cận tạo hợp chất phức có màu tím đặc trưng.',
        reactionEquation: 'Protein + Cu(OH)₂ / NaOH → Hợp chất phức màu tím đặc trưng',
        liquidColor: '#7c3aed'
      }
    ],
    mechanismExplanation: 'Phản ứng Biuret đòi hỏi phân tử phải có ít nhất HAI liên kết peptide (-CO-NH-) nối tiếp nhau. Do đó, các tripeptide trở lên và tất cả protein tự nhiên đều cho phản ứng màu biuret màu tím với Cu(OH)₂ trong môi trường kiềm.',
    balancedEquations: [
      'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓ (xanh lam)',
      'Cu(OH)₂ + 2 Peptide-bonds ⇌ [Cu(Peptide)₂]²⁻ (Phức chất màu tím đặc trưng) + 2H₂O'
    ],
    quizQuestions: [
      {
        id: 'q-exp-biuret-1',
        topic: 'Phản ứng Biuret',
        level: 'NB',
        type: 'single_choice',
        prompt: 'Nếu thay dung dịch lòng trắng trứng bằng dipeptide Gly-Ala thì dung dịch sẽ có hiện tượng gì?',
        options: [
          { key: 'A', text: 'Không xuất hiện màu tím, chỉ tạo kết tủa Cu(OH)₂ màu xanh lam không tan.' },
          { key: 'B', text: 'Vẫn xuất hiện màu tím như bình thường.' },
          { key: 'C', text: 'Tạo kết tủa màu đỏ gạch Cu₂O.' },
          { key: 'D', text: 'Tạo lớp gương bạc sáng bóng.' }
        ],
        correctAnswer: 'A',
        explanation: 'Gly-Ala là dipeptide chỉ có DUY NHẤT 1 liên kết peptide. Phản ứng màu Biuret yêu cầu tối thiểu phải có từ 2 liên kết peptide trở lên (từ tripeptide trở lên). Do đó không tạo phức tím mà chỉ có kết tủa xanh Cu(OH)₂.'
      }
    ]
  },
  {
    id: 'exp-galvanic-cell',
    title: 'Thí nghiệm 5: Mô phỏng Pin điện hóa Galvani Zn - Cu',
    category: 'Điện hóa - Biến đổi hóa năng thành điện năng',
    chapterId: 'chuong-5-pin-dien-hoa',
    lessonId: 'bai-6-pin-galvani',
    objective: 'Quan sát sự phát sinh dòng điện từ phản ứng oxi hóa - khử tự diễn biến, đo sức điện động 1.10 V của cặp pin Zn - Cu và hiểu rõ cơ chế của cầu muối.',
    apparatus: [
      'Cốc thủy tinh A (chứa dung dịch ZnSO₄ 1M)',
      'Cốc thủy tinh B (chứa dung dịch CuSO₄ 1M)',
      'Thanh kim loại Kẽm (Zn) sạch',
      'Thanh kim loại Đồng (Cu) sạch',
      'Dây dẫn điện có kẹp cá sấu',
      'Vôn kế điện tử hiển thị số (Digital Voltmeter)',
      'Ống chữ U làm cầu muối (chứa thạch agar bão hòa KCl)'
    ],
    chemicals: [
      'Dung dịch ZnSO₄ 1M (trong suốt)',
      'Dung dịch CuSO₄ 1M (màu xanh lam)',
      'Dung dịch KCl bão hòa trong cầu muối'
    ],
    safetyNotes: [
      'Tránh làm ngắn mạch trực tiếp dây nối.',
      'Cầu muối cần được ngâm sẵn trong dung dịch KCl để tránh bọt khí làm ngắt mạch.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Chuẩn bị hai bán pin Zn và Cu',
        instruction: 'Nhúng thanh Zn vào cốc ZnSO₄ 1M (Bán pin Anode), nhúng thanh Cu vào cốc CuSO₄ 1M (Bán pin Cathode).',
        actionType: 'add_reagent',
        phenomenon: 'Hai cốc riêng biệt, chưa có dòng điện chạy qua vôn kế (vôn kế chỉ 0.00 V).',
        explanation: 'Mạch điện vẫn đang bị hở, chưa có cầu dẫn ion giữa 2 dung dịch.',
        liquidColor: '#38bdf8'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cắm cầu muối chữ U (chứa KCl)',
        instruction: 'Đặt một đầu cầu muối vào cốc ZnSO₄, đầu kia vào cốc CuSO₄.',
        actionType: 'connect_circuit',
        phenomenon: 'Cầu muối tiếp xúc với cả 2 dung dịch, khép kín đường dẫn ion.',
        explanation: 'Cầu muối cho phép các ion K⁺ và Cl⁻ khuếch tán để trung hòa điện tích dư thừa ở 2 cốc.',
        liquidColor: '#0284c7'
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Nối dây dẫn với Vôn kế',
        instruction: 'Nối thanh Zn vào cực âm (-) của vôn kế, nối thanh Cu vào cực dương (+) của vôn kế.',
        actionType: 'observe',
        phenomenon: 'Kim vôn kế lập tức nhảy lên chỉ số: +1.10 V! Đèn LED báo hiệu sáng lên rực rỡ.',
        explanation: 'Sức điện động chuẩn đo được: E°_pin = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 - (-0.76) = 1.10 V.',
        reactionEquation: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)  (E° = 1.10 V)',
        liquidColor: '#0369a1'
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Quan sát diễn biến sau một thời gian',
        instruction: 'Để pin hoạt động liên tục trong 15 phút.',
        actionType: 'observe',
        phenomenon: 'Thanh Zn bị mòn bớt, thanh Cu có một lớp kim loại màu đỏ gạch bám dày thêm, màu xanh lam của cốc CuSO₄ nhạt dần rõ rệt.',
        explanation: 'Tại Anode: Zn → Zn²⁺ + 2e (Zn tan dần). Tại Cathode: Cu²⁺ + 2e → Cu (Cu bám lên điện cực, Cu²⁺ mất dần làm nhạt màu xanh).',
        liquidColor: '#7dd3fc'
      }
    ],
    mechanismExplanation: 'Kim loại Zn có thế khử âm hơn (-0.76V) nên tính khử mạnh hơn Cu. Zn tự nguyện nhường electron tại Anode. Electron di chuyển qua dây dẫn kim loại ngoài tạo nên dòng điện sang Cathode, tại đây ion Cu²⁺ nhận electron và khử thành kim loại Cu tự do.',
    balancedEquations: [
      'Anode (cực âm): Zn(s) → Zn²⁺(aq) + 2e',
      'Cathode (cực dương): Cu²⁺(aq) + 2e → Cu(s)',
      'Tổng quát: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) | E°_pin = 1.10 V'
    ],
    quizQuestions: [
      {
        id: 'q-exp-pin-1',
        topic: 'Pin Galvani',
        level: 'TH',
        type: 'single_choice',
        prompt: 'Nếu rút cầu muối ra khỏi hai cốc dung dịch thì hiện tượng gì sẽ xảy ra với chỉ số vôn kế?',
        options: [
          { key: 'A', text: 'Chỉ số vôn kế lập tức tụt về 0.00 V vì mạch điện bị ngắt.' },
          { key: 'B', text: 'Chỉ số vôn kế tăng gấp đôi lên 2.20 V.' },
          { key: 'C', text: 'Chỉ số vôn kế không đổi vì dây dẫn kim loại vẫn còn.' },
          { key: 'D', text: 'Chỉ số vôn kế đổi dấu thành -1.10 V.' }
        ],
        correctAnswer: 'A',
        explanation: 'Cầu muối có vai trò khép kín mạch điện qua sự dẫn truyền ion. Khi rút cầu muối ra, mạch điện bị hở hoàn toàn nên dòng điện dừng lại ngay lập tức (hiệu điện thế bằng 0).'
      }
    ]
  },
  {
    id: 'exp-electrolysis-cuso4',
    title: 'Thí nghiệm 6: Điện phân dung dịch CuSO₄ với điện cực trơ (Graphite)',
    category: 'Điện hóa - Điện phân dung dịch',
    chapterId: 'chuong-5-pin-dien-hoa',
    lessonId: 'bai-7-dien-phan',
    objective: 'Tìm hiểu quá trình điện phân dung dịch muối đồng sunfat, quan sát bọt khí oxy thoát ra ở Anode và kim loại đồng đỏ bám ở Cathode.',
    apparatus: [
      'Bình điện phân thủy tinh chữ U hoặc cốc 250 mL',
      'Hai thanh điện cực than chì (Graphite) trơ',
      'Nguồn điện một chiều (DC Power Supply 6 - 12V)',
      'Dây dẫn và khóa K',
      'Giấy quỳ tím'
    ],
    chemicals: [
      'Dung dịch CuSO₄ 0.5M (màu xanh lam đặc trưng)'
    ],
    safetyNotes: [
      'Khí sinh ra có thể kèm bọt sương axit sunfuric, tránh ghé sát mặt ngửi trực tiếp miệng bình.',
      'Ngắt nguồn điện DC trước khi chạm tay vào các thanh điện cực.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Rót dung dịch CuSO₄ vào bình điện phân',
        instruction: 'Rót khoảng 100 mL dung dịch CuSO₄ 0.5M vào bình, nhúng 2 điện cực than chì sạch.',
        actionType: 'add_reagent',
        phenomenon: 'Dung dịch có màu xanh lam trong suốt.',
        explanation: 'Trong dung dịch có các ion Cu²⁺, SO₄²⁻ và phân tử H₂O.',
        liquidColor: '#0284c7'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Bật nguồn điện một chiều (DC 9V)',
        instruction: 'Đóng khóa K, cho dòng điện 1 chiều chạy qua bình điện phân.',
        actionType: 'connect_circuit',
        phenomenon: 'Ở Cathode (nối cực âm): có một lớp kim loại màu ĐỎ CAM bám chặt vào điện cực than chì. Ở Anode (nối cực dương): SỦI BỌT KHÍ O₂ KHÔNG MÀU liên tục!',
        explanation: 'Tại Cathode (-): Cu²⁺ + 2e → Cu (Cu màu đỏ bám vào). Tại Anode (+): 2H₂O → O₂↑ + 4H⁺ + 4e (H₂O bị oxi hóa sinh ra khí O₂).',
        reactionEquation: '2CuSO₄ + 2H₂O → 2Cu↓ + O₂↑ + 2H₂SO₄',
        liquidColor: '#38bdf8',
        bubbles: true
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Nhúng mẩu giấy quỳ tím vào dung dịch sau điện phân',
        instruction: 'Dùng đũa thủy tinh chấm dung dịch quanh Anode lên mẩu giấy quỳ tím.',
        actionType: 'observe',
        phenomenon: 'Mẩu giấy quỳ tím lập tức HÓA ĐỎ rõ rệt!',
        explanation: 'Quá trình oxi hóa H₂O ở Anode giải phóng ion H⁺ tạo môi trường axit sunfuric (H₂SO₄) làm quỳ tím đổi màu đỏ.',
        liquidColor: '#e0f2fe'
      }
    ],
    mechanismExplanation: 'Dưới tác dụng của hiệu điện thế ngoài lớn hơn thế phân hủy, ion Cu²⁺ chạy về Cathode (-) nhận electron biến thành Cu kim loại. Ion SO₄²⁻ chạy về Anode (+) nhưng có độ bền oxi hóa cao không thể phóng điện, phân tử nước H₂O nhường electron dễ hơn giải phóng O₂ và sinh ra ion H⁺.',
    balancedEquations: [
      'Cathode (-): Cu²⁺ + 2e → Cu↓',
      'Anode (+): 2H₂O → O₂↑ + 4H⁺ + 4e',
      'Tổng quát: 2CuSO₄ + 2H₂O xrightarrow{dpdd} 2Cu + O₂↑ + 2H₂SO₄'
    ],
    quizQuestions: [
      {
        id: 'q-exp-el-1',
        topic: 'Điện phân CuSO₄',
        level: 'TH',
        type: 'single_choice',
        prompt: 'Sau một thời gian điện phân dung dịch CuSO₄ với điện cực trơ, độ pH của dung dịch thay đổi như thế nào?',
        options: [
          { key: 'A', text: 'pH giảm (tính axit tăng do sinh ra H₂SO₄)' },
          { key: 'B', text: 'pH tăng (tính kiềm tăng)' },
          { key: 'C', text: 'pH không đổi luôn bằng 7' },
          { key: 'D', text: 'pH tăng dần rồi sau đó giảm đột ngột' }
        ],
        correctAnswer: 'A',
        explanation: 'Tại cực dương (Anode), quá trình oxi hóa nước: 2H₂O → O₂ + 4H⁺ + 4e tạo thêm nhiều ion H⁺ làm nồng độ [H⁺] tăng vọt, do đó pH = -log[H⁺] giảm xuống (axit mạnh).'
      }
    ]
  }
];
