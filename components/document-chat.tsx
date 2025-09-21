import { getBackendUrl } from "../lib/api";
("use client");

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface DocumentChatProps {
  documentName: string;
  documentId?: string;
}

const suggestedQuestions = [
  "What happens if I miss a payment?",
  "Can I work remotely?",
  "How much notice is required for termination?",
  "What are the non-compete restrictions?",
  "Are there any hidden fees?",
];

export function DocumentChat({ documentName, documentId }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hi! I'm your Legal Guardian AI. I've analyzed your ${documentName} and I'm ready to answer any questions you have about it. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${getBackendUrl()}/api/v1/analysis/qa/${documentId || "unknown"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ question: content }),
        }
      );
      const data = await res.json();
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          data.answer || "Sorry, I couldn't find an answer to that question.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, there was an error fetching the answer.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ask Questions About Your Document
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 chat-scroll">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg break-words ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "ai" ? (
                        <div className="prose prose-sm prose-invert max-w-none overflow-hidden">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-lg font-bold text-white mb-2 mt-3 first:mt-0">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-md font-semibold text-white mb-2 mt-3 first:mt-0">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm font-medium text-white mb-1 mt-2 first:mt-0">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-sm text-muted-foreground mb-2 leading-relaxed first:mt-0 last:mb-0">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="text-sm text-muted-foreground list-disc pl-4 mb-2 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="text-sm text-muted-foreground list-decimal pl-4 mb-2 space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-sm text-muted-foreground">
                                  {children}
                                </li>
                              ),
                              strong: ({ children }) => (
                                <strong className="text-yellow-300 font-semibold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="text-blue-300 italic">
                                  {children}
                                </em>
                              ),
                              code: ({ children }) => (
                                <code className="bg-gray-700 px-1 py-0.5 rounded text-yellow-200 text-xs">
                                  {children}
                                </code>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-blue-400 pl-2 italic text-gray-400 my-2">
                                  {children}
                                </blockquote>
                              ),
                              hr: () => <hr className="border-gray-600 my-2" />,
                              table: ({ children }) => (
                                <table className="text-sm border-collapse border border-gray-600 my-2">
                                  {children}
                                </table>
                              ),
                              th: ({ children }) => (
                                <th className="border border-gray-600 px-2 py-1 bg-gray-700 font-semibold text-white">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="border border-gray-600 px-2 py-1 text-muted-foreground">
                                  {children}
                                </td>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2 flex-shrink-0">
              <Input
                placeholder="Ask a question about your document..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
                disabled={isLoading}
                className="text-black"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Questions */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 bg-transparent"
                  onClick={() => handleSendMessage(question)}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="text-xs">
                  TIP
                </Badge>
                <p className="text-muted-foreground">
                  Ask specific "what if" scenarios to understand implications
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="text-xs">
                  TIP
                </Badge>
                <p className="text-muted-foreground">
                  Reference specific sections or clauses for detailed
                  explanations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="text-xs">
                  TIP
                </Badge>
                <p className="text-muted-foreground">
                  Ask about industry standards to compare your contract
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
