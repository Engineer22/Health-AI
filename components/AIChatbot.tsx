import { useState } from "react";
import { Bot, Send, AlertCircle, Minimize2, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import OpenAI from "openai";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please add your OpenAI API key in the project settings.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful healthcare assistant. Provide clear, concise medical information and always recommend consulting healthcare professionals for specific medical advice."
          },
          {
            role: "user",
            content: input
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.choices[0].message.content || "I apologize, but I couldn't generate a response.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive"
      });
      console.error("OpenAI API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalate = () => {
    toast({
      title: "Query Escalated",
      description: "A healthcare provider will be notified of your query.",
    });
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="rounded-full p-4 h-14 w-14 bg-primary hover:bg-primary/90"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Health Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(false)}
          className="h-8 w-8"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleEscalate}
          disabled={isLoading}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Escalate to Provider
        </Button>
      </div>
    </Card>
  );
};

export default AIChatbot;
