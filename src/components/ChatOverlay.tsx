/**
 * ChatOverlay Component
 * Tatva AI chat interface with ready prompts and chat input
 * Slides up from bottom with relevant context prompts
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { typographyClasses } from "@/lib/design-tokens";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  onAddNote?: (note: string) => void;
}

export function ChatOverlay({ isOpen, onClose, videoTitle, onAddNote }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const readyPrompts = [
    "How does semaglutide work in the body?",
    "What are the side effects of Ozempic?",
    "Is Ozempic approved for weight loss?",
    "What's the difference between Ozempic and Wegovy?",
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const sendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Based on the video content about ${videoTitle}, here's a response to your question: "${text}". This is a simulated AI response. In production, this would connect to the actual Tatva AI service.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Chat Overlay Panel */}
      <div className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h3 className={`${typographyClasses.h3SemiBold} text-gray-900`}>
              Tatva AI Assistant
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <span className="text-4xl mb-3">💬</span>
              <p className={`${typographyClasses.sh1} text-gray-600 mb-6`}>
                Ask me anything about Ozempic and GLP-1 medications
              </p>

              {/* Ready Prompts */}
              <div className="space-y-2 w-full">
                <p className={`${typographyClasses.caption1Bold} text-gray-500 mb-3`}>
                  Quick prompts:
                </p>
                {readyPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors group"
                  >
                    <p className={`${typographyClasses.sh1} text-purple-700 group-hover:text-purple-900`}>
                      {prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className={`${typographyClasses.sh1} leading-relaxed`}>
                        {message.text}
                      </p>
                    </div>
                    {message.sender === "ai" && (
                      <button
                        onClick={() => {
                          const noteText = `[AI: ${videoTitle}] ${message.text}`;
                          onAddNote?.(noteText);
                        }}
                        className="text-xs text-purple-600 font-semibold hover:text-purple-700 self-start pl-2"
                      >
                        + Add to Notes
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white rounded-t-3xl">
          <div className="flex gap-2 items-end">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4379842 C3.03521743,10.5950816 3.19218622,10.752179 3.50612381,10.752179 L16.6915026,11.5376659 C16.6915026,11.5376659 17.1624089,11.5376659 17.1624089,12.0089581 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
