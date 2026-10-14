import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client if key is set and valid
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!aiClient,
    timestamp: new Date().toISOString()
  });
});

// AI Tutor chat & problem solver endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, context, mode } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ.' });
    }

    if (!aiClient) {
      // Offline pedagogical rule-based smart assistant
      let offlineResponse = '';
      const lower = message.toLowerCase();

      if (lower.includes('ester') || lower.includes('este') || lower.includes('thủy phân')) {
        offlineResponse = `**Kiến thức trọng tâm về Ester (Este):**\n\n1. **Khái niệm:** Khi thay nhóm -OH ở nhóm cacboxyl của axit cacboxylic bằng nhóm -OR' thì được este (RCOOR').\n2. **Phản ứng thủy phân:**\n   - Môi trường axit (thuận nghịch): RCOOR' + H₂O ⇌ RCOOH + R'OH (xúc tác H₂SO₄ đặc, đun nóng).\n   - Môi trường kiềm (xà phòng hóa, một chiều): RCOOR' + NaOH → RCOONa + R'OH (đun nóng).\n3. **Hiện tượng nhận biết:** Ester thường nhẹ hơn nước, ít tan trong nước và có mùi thơm hoa quả đặc trưng (Isoamyl axetat mùi chuối chín, Etyl format mùi đào).\n\n*Mẹo nhớ:* Phản ứng xà phòng hóa luôn là phản ứng 1 chiều!`;
      } else if (lower.includes('tráng bạc') || lower.includes('glucose') || lower.includes('glucozo')) {
        offlineResponse = `**Phản ứng tráng bạc (Tráng gương) của Glucose:**\n\n1. **Bản chất:** Do phân tử Glucose có nhóm chức aldehyde (-CHO) ở dạng mạch hở.\n2. **Phương trình ion rút gọn:**\n   CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH xrightarrow{t°} CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O\n3. **Hiện tượng quan sát được:** Bạc kim loại tạo thành bám sáng bóng như gương trên thành ống nghiệm.\n4. **Tỉ lệ mol cần nhớ:** 1 mol Glucose sinh ra 2 mol Ag (n_Ag = 2 * n_Glucose).`;
      } else if (lower.includes('pin') || lower.includes('galvani') || lower.includes('điện phân')) {
        offlineResponse = `**Pin điện hóa Galvani & Điện phân (Hóa 12 GDPT 2018):**\n\n- **Pin Galvani (Zn - Cu):**\n  + Cực âm (Anode): Zn bị oxi hóa: Zn → Zn²⁺ + 2e (thanh Zn mòn dần).\n  + Cực dương (Cathode): Cu²⁺ bị khử: Cu²⁺ + 2e → Cu (Cu bám vào thanh).\n  + Sức điện động chuẩn: E°_pin = E°_Cathode - E°_Anode = +0.34 - (-0.76) = 1.10 V.\n- **Điện phân dung dịch:** Sử dụng dòng điện ngoài để thúc đẩy phản ứng oxi hóa - khử không tự diễn biến.`;
      } else if (lower.includes('cân bằng') || lower.includes('phương trình')) {
        offlineResponse = `**Quy tắc cân bằng phản ứng Hóa học 12:**\n1. Phương pháp Thăng bằng Electron (Oxi hóa - Khử): Tổng số electron cho = Tổng số electron nhận.\n2. Phương pháp Đại số: Đặt ẩn số a, b, c, d... giải hệ phương trình bảo toàn nguyên tố.\n3. Bạn có thể sử dụng ngay công cụ **Cân bằng phương trình** tự động trong tab **Công cụ** của website!`;
      } else {
        offlineResponse = `Chào bạn! Tôi là Trợ lý Hóa học 12. Tôi đã nhận được câu hỏi:\n> "${message}"\n\n**Hướng dẫn tiếp cận:**\n- Hãy xác định chất phản ứng thuộc nhóm chức nào (Ester, Carbohydrate, Amine, Amino acid, hay Kim loại).\n- Viết phương trình phản ứng hóa học có ghi rõ điều kiện (nhiệt độ, xúc tác H₂SO₄, dung dịch kiềm...).\n- Áp dụng định luật bảo toàn: Bảo toàn khối lượng, bảo toàn nguyên tố hoặc bảo toàn electron.\n\n*Gợi ý:* Bạn có thể mở mục **Lý thuyết** hoặc **Phòng thí nghiệm 3D** để quan sát hiện tượng trực quan!`;
      }

      return res.json({
        reply: offlineResponse,
        isFallback: true
      });
    }

    const systemInstruction = `Bạn là Trợ lý Hóa học 12 AI sư phạm hàng đầu Việt Nam, am hiểu sâu sắc Chương trình Giáo dục Phổ thông 2018 và cấu trúc đề thi Tốt nghiệp THPT 2026.
Nhiệm vụ:
1. Giải đáp thắc mắc lý thuyết Hóa học 12 chuẩn xác, súc tích, dễ hiểu.
2. Hiển thị công thức hóa học rõ ràng với chỉ số dưới (ví dụ: H₂SO₄, C₆H₁₂O₆, CH₃COOH, [Ag(NH₃)₂]OH, Fe₂O₃).
3. Hướng dẫn phương pháp giải bài tập từng bước: Phân tích đề bài -> Định hướng bảo toàn (khối lượng, mol, electron) -> Thiết lập phương trình -> Tính ra kết quả.
4. Chỉ ra những "bẫy" sai lầm học sinh lớp 12 hay mắc phải trong đề thi.
5. Giải thích hiện tượng thực nghiệm trong phòng thí nghiệm.
${context ? `Ngữ cảnh bài học/thí nghiệm hiện tại của học sinh: ${context}` : ''}
${mode === 'hint' ? 'Chế độ gợi ý: Chỉ đưa ra gợi ý tư duy và công thức cần dùng, KHÔNG đưa ngay đáp án cuối cùng để học sinh tự làm.' : ''}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return res.json({
      reply: response.text || 'Không có phản hồi từ máy chủ AI.'
    });
  } catch (error: any) {
    console.error('AI chat error:', error);
    return res.status(500).json({
      error: 'Lỗi máy chủ khi kết nối với AI Gemini.',
      details: error.message
    });
  }
});

// Serve frontend: Vite middlewares in dev, static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Chemistry 12 Lab server running on http://0.0.0.0:${PORT}`);
});
