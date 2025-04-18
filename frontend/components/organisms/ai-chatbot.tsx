'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../atoms/card';
import { Button } from '../atoms/button';
import { Send, Bot, User, Loader2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage, AIResponse } from '../../lib/services/types';
import { useChatbot } from '../../lib/hooks/use-chatbot';

function AIChatMessage({ content, onActionItemClick }: { content: string | AIResponse; onActionItemClick: (prompt: string) => void }) {
  if (typeof content === 'string') {
    return <div>{content}</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {content.details.map((detail, index) => (
            <div key={index} className="text-sm">{detail}</div>
          ))}
        </CardContent>
      </Card>

      {content.action_items.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Action Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {content.action_items.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => onActionItemClick(item)}
              >
                <ChevronRight className="h-4 w-4" />
                {item}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { sendMessage, isLoading, error } = useChatbot();

  const handleSend = async (prompt?: string) => {
    const messageToSend = prompt || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await sendMessage(messageToSend);
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleActionItemClick = (actionItem: string) => {
    handleSend(actionItem);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Sales Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[800px] flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>Ask me anything about sales data, representatives, or deals.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <AIChatMessage 
                      content={message.content} 
                      onActionItemClick={handleActionItemClick}
                    />
                  </div>
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg p-3 bg-muted flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about sales data..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              disabled={isLoading}
            />
            <Button onClick={() => handleSend()} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 