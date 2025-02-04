'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import { Send, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResourceCreatorModal } from './components/ResourceCreatorModal';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 6,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true);
    handleSubmit(e)
    setIsTyping(false)
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-black text-white">
      <header className="w-full text-center border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">RAG AI</h1>
        <Button 
          onClick={() => setIsResourceModalOpen(true)}
          size="sm"
          className="bg-white/10 border-white/10 text-white hover:bg-white/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Information 
        </Button>
      </header>
      
      <div className="w-full lg:w-5/12 flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${m.role === 'user' ? 'bg-blue-600' : 'bg-white/10'}`}>
              <p className="whitespace-pre-wrap">
                {m.content || (
                  <span className="italic text-gray-400">
                    {'calling tool:  ' + m?.toolInvocations?.[0].toolName}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-white/10">
              <p className="text-gray-400">Ai is typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full lg:w-5/12 border-t border-white/10 p-4">
        <form onSubmit={onSubmit} className="flex space-x-2">
          <Input
            className="flex-1 bg-white/10 border-white/10 text-white placeholder-white/50 focus:ring-white focus:border-white"
            value={input}
            placeholder="send a massage "
            onChange={handleInputChange}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-white/10 border-white/10 text-white hover:bg-white/20" 
            disabled={isTyping}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">send massage</span>
          </Button>
        </form>
      </div>

      <ResourceCreatorModal 
        isOpen={isResourceModalOpen} 
        onClose={() => setIsResourceModalOpen(false)} 
      />
    </div>
  );
}
