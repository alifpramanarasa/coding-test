import { useMutation } from '@tanstack/react-query';
import { ChatbotService } from '../services/chatbot-service';
import { ChatMessage, AIResponse } from '../services/types';

export function useChatbot() {
  const chatbotService = ChatbotService.getInstance();

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<AIResponse> => {
      return chatbotService.generateResponse(message);
    },
  });

  return {
    sendMessage: sendMessageMutation.mutateAsync,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
  };
} 