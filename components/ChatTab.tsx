"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatTab() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      // Here you would typically send the message to your AI backend
      // and then add the AI's response to the messages
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg ${message.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"} max-w-[70%]`}>
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="flex p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}