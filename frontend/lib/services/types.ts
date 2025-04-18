export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string | AIResponse;
  timestamp: Date;
}

export interface AIResponse {
  summary: string;
  details: string[];
  action_items: string[];
} 