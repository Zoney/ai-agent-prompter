"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskTab() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="p-2 bg-gray-700 rounded-lg">
            {task}
          </div>
        ))}
      </ScrollArea>
      <div className="flex p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task for the AI..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
    </div>
  );
}