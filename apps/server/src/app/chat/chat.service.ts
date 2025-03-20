import { Injectable } from '@nestjs/common';

const CHAT_API_URL = 'https://api.chatanywhere.org/v1/chat/completions';
const model = 'gpt-3.5-turbo';

@Injectable()
export class ChatService {
  async sendMessage(messages: { role: string; content: string }[]) {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHAT_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });
    const data = await response.json();
    return data;
  }

  async generateSubTasks(description: string) {
    const prompt = `
      請將以下內容智能分割成獨立的子任務：
      "${description}"
      回傳格式為 JSON: {"tasks": ["任務1", "任務2", ...]}
      如果無法分析，請回傳 JSON: {"tasks": [], "error": "錯誤訊息"}
      錯誤訊息: 請用三個英文單字以內或是八個中文字以內表達
    `;

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHAT_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    return data;
  }
}
