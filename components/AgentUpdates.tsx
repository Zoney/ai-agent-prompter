"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Update = {
  agent: string;
  message: string;
  timestamp: Date;
};

export function AgentUpdates({ agents, prompt }) {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const newUpdate = {
        agent: randomAgent,
        message: `Processing task: ${prompt.slice(0, 20)}...`,
        timestamp: new Date(),
      };
      setUpdates((prevUpdates) => [...prevUpdates, newUpdate]);
    }, 2000);

    return () => clearInterval(interval);
  }, [agents, prompt]);

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Agent Workflow Updates</h2>
      <ScrollArea className="flex-grow border rounded-md p-4">
        {updates.map((update, index) => (
          <div key={index} className="mb-4 p-3 bg-gray-800 rounded-lg">
            <div className="font-semibold text-blue-400">{update.agent}</div>
            <div>{update.message}</div>
            <div className="text-sm text-gray-400">
              {update.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}