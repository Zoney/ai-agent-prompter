"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, PlusCircle, Settings, Workflow } from "lucide-react";
import { UserNav } from "@/components/UserNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Sidebar({ onViewChange }) {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Chat 1", type: "chat" },
    { id: 2, title: "Chat 2", type: "chat" },
  ]);

  const addNewConversation = (type: 'chat' | 'agent') => {
    const newId = conversations.length + 1;
    const newConversation = { id: newId, title: `${type === 'chat' ? 'Chat' : 'Agent'} ${newId}`, type };
    setConversations([...conversations, newConversation]);
    onViewChange(type);
  };

  return (
    <div className="w-64 bg-gray-900 p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">AI Assistant</h1>
        <UserNav />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full mb-4">
            <PlusCircle className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => addNewConversation('chat')}>
            <MessageCircle className="mr-2 h-4 w-4" /> New Chat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewConversation('agent')}>
            <Workflow className="mr-2 h-4 w-4" /> New Agent Workflow
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ScrollArea className="flex-grow mb-4">
        {conversations.map((conv) => (
          <Button
            key={conv.id}
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => onViewChange(conv.type)}
          >
            {conv.type === 'chat' ? (
              <MessageCircle className="mr-2 h-4 w-4" />
            ) : (
              <Workflow className="mr-2 h-4 w-4" />
            )}
            {conv.title}
          </Button>
        ))}
      </ScrollArea>
      <Button variant="ghost" className="mt-auto">
        <Settings className="mr-2 h-4 w-4" /> Settings
      </Button>
    </div>
  );
}