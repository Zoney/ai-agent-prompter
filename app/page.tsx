"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";
import { AgentWorkflow } from "@/components/AgentWorkflow";

export default function Home() {
  const [currentView, setCurrentView] = useState<'chat' | 'agent'>('chat');

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {currentView === 'chat' ? <Chat /> : <AgentWorkflow />}
      </main>
    </div>
  );
}