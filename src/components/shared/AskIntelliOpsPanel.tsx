'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Brain,
  Send,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  chatResponses,
  suggestionChips,
  findBestResponse,
  type ChatResponse,
} from '@/lib/mock/chatResponses';

// ── Types ──────────────────────────────────────────────────────────────────

interface AskIntelliOpsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  response?: ChatResponse;
  isStreaming?: boolean;
  displayedText?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const THINKING_DELAY = 800;
const STREAM_DELAY_MS = 35;

const techBadgeStyles: Record<string, string> = {
  LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
};

const confidenceColor = (v: number) =>
  v >= 0.9
    ? 'text-green-600 dark:text-green-400'
    : v >= 0.7
      ? 'text-amber-600 dark:text-amber-400'
      : v >= 0.5
        ? 'text-orange-600 dark:text-orange-400'
        : 'text-red-600 dark:text-red-400';

// ── Component ──────────────────────────────────────────────────────────────

export default function AskIntelliOpsPanel({
  isOpen,
  onClose,
  onNavigate,
}: AskIntelliOpsPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  );
  const [displayedTexts, setDisplayedTexts] = useState<
    Record<string, { text: string; isStreaming: boolean }>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordIndexRef = useRef<Record<string, number>>({});

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedTexts]);

  // Stream text word by word
  const streamMessage = useCallback((messageId: string, text: string) => {
    const words = text.split(' ');
    wordIndexRef.current[messageId] = 0;
    setStreamingMessageId(messageId);
    setDisplayedTexts((prev) => ({
      ...prev,
      [messageId]: { text: '', isStreaming: true },
    }));

    const tick = () => {
      const index = wordIndexRef.current[messageId] || 0;
      if (index >= words.length) {
        setDisplayedTexts((prev) => ({
          ...prev,
          [messageId]: { ...prev[messageId], isStreaming: false },
        }));
        setStreamingMessageId(null);
        return;
      }

      setDisplayedTexts((prev) => ({
        ...prev,
        [messageId]: {
          ...prev[messageId],
          text: words.slice(0, index + 1).join(' '),
        },
      }));
      wordIndexRef.current[messageId] = index + 1;
      streamingTimerRef.current = setTimeout(tick, STREAM_DELAY_MS);
    };

    // Initial delay before starting stream
    streamingTimerRef.current = setTimeout(tick, 400);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate thinking delay then show AI response
    setTimeout(() => {
      const response = findBestResponse(inputValue);

      if (response) {
        const aiMessage: Message = {
          id: `msg-ai-${Date.now()}`,
          type: 'ai',
          content: response.answer,
          response,
          isStreaming: true,
        };

        setMessages((prev) => [...prev, aiMessage]);
        streamMessage(aiMessage.id, response.answer);
      } else {
        // Fallback response
        const fallbackText =
          "I don't have specific data on that yet, but I'm constantly learning from production incidents, deployments, and test results. Try asking about recent releases, defects, incidents, or service health!";

        const aiMessage: Message = {
          id: `msg-ai-${Date.now()}`,
          type: 'ai',
          content: fallbackText,
        };

        setMessages((prev) => [...prev, aiMessage]);
        streamMessage(aiMessage.id, fallbackText);
      }
    }, THINKING_DELAY);
  }, [inputValue, streamMessage]);

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      const userMessage: Message = {
        id: `msg-user-${Date.now()}`,
        type: 'user',
        content: query,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');

      setTimeout(() => {
        const response = findBestResponse(query);

        if (response) {
          const aiMessage: Message = {
            id: `msg-ai-${Date.now()}`,
            type: 'ai',
            content: response.answer,
            response,
            isStreaming: true,
          };

          setMessages((prev) => [...prev, aiMessage]);
          streamMessage(aiMessage.id, response.answer);
        }
      }, THINKING_DELAY);
    }, 0);
  };

  const handleNavigateToSection = (sectionId: string) => {
    onNavigate?.(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-[420px] z-50 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ask IntelliOps
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Suggestion Chips (shown when no messages) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 mt-4"
                >
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Try asking about:
                  </p>
                  <div className="grid gap-2">
                    {suggestionChips.map((chip) => (
                      <button
                        key={chip.query}
                        onClick={() => handleSuggestedQuery(chip.query)}
                        className="text-left px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-700 dark:text-purple-300 font-medium group-hover:text-purple-900 dark:group-hover:text-purple-200">
                            {chip.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-purple-400 dark:text-purple-600 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'user' ? (
                    // User Message
                    <div className="bg-purple-600 dark:bg-purple-700 text-white rounded-lg px-4 py-3 max-w-xs text-sm">
                      {message.content}
                    </div>
                  ) : (
                    // AI Message
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-sm space-y-3">
                      {/* Thinking indicator */}
                      {streamingMessageId === message.id &&
                        !displayedTexts[message.id]?.text && (
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <span
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: '0ms' }}
                              />
                              <span
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: '150ms' }}
                              />
                              <span
                                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                style={{ animationDelay: '300ms' }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Thinking...
                            </span>
                          </div>
                        )}

                      {/* Streamed text */}
                      {displayedTexts[message.id]?.text && (
                        <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                          {displayedTexts[message.id].text}
                          {streamingMessageId === message.id && (
                            <span className="inline-block w-1.5 h-4 bg-purple-600 dark:bg-purple-400 ml-0.5 animate-pulse rounded-sm" />
                          )}
                        </p>
                      )}

                      {/* Technique badges */}
                      {message.response &&
                        !displayedTexts[message.id]?.isStreaming && (
                          <div className="flex flex-wrap gap-1 pt-2">
                            {message.response.techniques.map((tech) => (
                              <span
                                key={tech}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${techBadgeStyles[tech]}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Confidence score */}
                      {message.response &&
                        !displayedTexts[message.id]?.isStreaming && (
                          <div className="flex items-center gap-1 pt-1">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              Confidence:
                            </span>
                            <span
                              className={`text-[10px] font-semibold ${confidenceColor(
                                message.response.confidence
                              )}`}
                            >
                              {Math.round(
                                message.response.confidence * 100
                              )}%
                            </span>
                          </div>
                        )}

                      {/* Source references */}
                      {message.response &&
                        !displayedTexts[message.id]?.isStreaming && (
                          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Sources:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {message.response.sources.map((source) => (
                                <span
                                  key={source.id}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-[9px] text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-help"
                                  title={source.title}
                                >
                                  <span>{source.type.toUpperCase()}</span>
                                  <span>{source.id}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Navigate to section button */}
                      {message.response?.relatedSection &&
                        !displayedTexts[message.id]?.isStreaming && (
                          <button
                            onClick={() =>
                              handleNavigateToSection(
                                message.response!.relatedSection!
                              )
                            }
                            className="w-full mt-2 px-3 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 text-white rounded font-medium text-xs transition-colors flex items-center justify-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            Explore This Topic
                          </button>
                        )}
                    </div>
                  )}
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || !!streamingMessageId}
                  className="p-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message (Enter)"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Press Enter to send • Try questions about releases, defects, or
                incidents
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
