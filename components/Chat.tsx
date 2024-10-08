"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const readyMadePrompts = [
  "Tell me a joke",
  "What's the weather like today?",
  "Explain quantum computing",
  "Write a short story",
];

export function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (content: string) => {
    if (content.trim()) {
      const newMessages = [
        ...messages,
        { role: "user", content },
        { role: "assistant", content: "This is a placeholder response." },
      ];
      setMessages(newMessages);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
            } max-w-[70%]`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          {readyMadePrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSend(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex space-x-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow min-h-[100px]"
          />
          <Button type="submit" className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}