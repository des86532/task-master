'use client';
import { useEffect, useRef, useState } from 'react';
import { Input, Button } from '@heroui/react';
import { postChatMessage } from '@/app/_api/chat';
import { useIndexedDB } from '@/app/_hooks/useIndexedDB';

export default function Chat() {
  const [message, setMessage] = useState('');
  const { messages, addMessage, clearMessages } = useIndexedDB();
  const [isLoading, setIsLoading] = useState(false);
  const chatroomRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!message) return;
    try {
      setIsLoading(true);

      const newMessage = {
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };
      await addMessage(newMessage);

      const response = await postChatMessage([...messages, newMessage]);

      // Check if response has error
      if (response.error) {
        throw new Error(response.error);
      }

      // Check if response has the expected structure
      if (!response.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from server');
      }

      await addMessage({
        role: 'assistant',
        content: response.choices[0].message.content,
        timestamp: Date.now(),
      });

      setMessage('');
    } catch (error) {
      console.error('Chat error:', error);
      alert('聊天服務暫時無法使用，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatroomRef.current) {
      chatroomRef.current.scrollTo({
        top: chatroomRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="p-8 h-full">
      <div
        ref={chatroomRef}
        className="overflow-y-auto p-2 max-h-[calc(100%-40px)] min-h-80 rounded-md border scrollbar-hide"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div className="inline-flex px-2 py-1 bg-gray-200 rounded-md">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="輸入訊息..."
        />
        <Button onPress={sendMessage} isLoading={isLoading} className="ml-2">
          發送
        </Button>
        <Button onPress={clearMessages} className="ml-2" color="danger">
          清除對話
        </Button>
      </div>
    </div>
  );
}
