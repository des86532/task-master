import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import type { ChatMessage } from '@task-master/shared';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async sendMessage(@Body() messages: ChatMessage[]) {
    if (messages.length === 0) {
      return { error: '請提供 message' };
    }

    const response = await this.chatService.sendMessage(messages);
    return response;
  }

  @Post('generate-subtasks')
  async generateSubTasks(@Body('description') description: string) {
    if (!description) {
      return { error: '請提供描述' };
    }

    const response = await this.chatService.generateSubTasks(description);
    return response;
  }
}
