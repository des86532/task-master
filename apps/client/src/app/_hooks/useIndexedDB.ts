import { useState, useEffect } from 'react';
import type { ChatMessage } from '@task-master/shared';
import {
  initDB,
  addMessage,
  getAllMessages,
  deleteMessage,
  clearAllMessages,
} from '@/app/_utils/indexedDB';

export const useIndexedDB = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        await loadMessages();
      } catch (err) {
        setError(err as Error);
      }
    };
    initialize();
  }, []);

  const loadMessages = async () => {
    try {
      const allMessages = await getAllMessages();
      setMessages(allMessages.sort((a, b) => a.timestamp - b.timestamp));
    } catch (err) {
      setError(err as Error);
    }
  };

  const addNewMessage = async (message: Omit<ChatMessage, 'id'>) => {
    try {
      await addMessage(message);
      await loadMessages();
    } catch (err) {
      setError(err as Error);
    }
  };

  const removeMessage = async (id: number) => {
    try {
      await deleteMessage(id);
      await loadMessages();
    } catch (err) {
      setError(err as Error);
    }
  };

  const clearMessages = async () => {
    try {
      await clearAllMessages();
      setMessages([]);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    messages,
    error,
    addMessage: addNewMessage,
    deleteMessage: removeMessage,
    clearMessages,
  };
};
