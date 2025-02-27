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
}
