"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AgentUpdates } from "@/components/AgentUpdates";

const agentTemplates = [
  {
    name: "Research Assistant",
    agents: ["Web Searcher", "Document Analyzer", "Summary Writer"],
  },
  {
    name: "Creative Writing Helper",
    agents: ["Idea Generator", "Character Developer", "Plot Outliner"],
  },
  {
    name: "Code Review Team",
    agents: ["Syntax Checker", "Security Auditor", "Performance Optimizer"],
  },
];

const allAgents = [
  "Web Searcher",
  "Document Analyzer",
  "Summary Writer",
  "Idea Generator",
  "Character Developer",
  "Plot Outliner",
  "Syntax Checker",
  "Security Auditor",
  "Performance Optimizer",
  "Data Visualizer",
  "Language Translator",
];

export function AgentWorkflow() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedAgents(template.agents);
  };

  const handleAgentToggle = (agent) => {
    setSelectedAgents((prev) =>
      prev.includes(agent)
        ? prev.filter((a) => a !== agent)
        : [...prev, agent]
    );
  };

  const handleStartWorkflow = () => {
    if (prompt.trim() && selectedAgents.length > 0) {
      setIsRunning(true);
    }
  };

  if (isRunning) {
    return <AgentUpdates agents={selectedAgents} prompt={prompt} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Create Agent Workflow</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Templates</h3>
          <ScrollArea className="h-[300px] border rounded-md p-4">
            {agentTemplates.map((template) => (
              <Button
                key={template.name}
                variant={selectedTemplate === template ? "default" : "outline"}
                className="w-full mb-2 justify-start"
                onClick={() => handleTemplateSelect(template)}
              >
                {template.name}
              </Button>
            ))}
          </ScrollArea>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Available Agents</h3>
          <ScrollArea className="h-[300px] border rounded-md p-4">
            {allAgents.map((agent) => (
              <div key={agent} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={agent}
                  checked={selectedAgents.includes(agent)}
                  onCheckedChange={() => handleAgentToggle(agent)}
                />
                <Label htmlFor={agent}>{agent}</Label>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Selected Agents</h3>
        <div className="flex flex-wrap gap-2">
          {selectedAgents.map((agent) => (
            <div key={agent} className="bg-blue-600 text-white px-3 py-1 rounded-full">
              {agent}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Task Prompt</h3>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your task prompt here..."
          className="min-h-[100px]"
        />
      </div>
      <Button className="mt-6" onClick={handleStartWorkflow} disabled={!prompt.trim() || selectedAgents.length === 0}>
        Start Workflow
      </Button>
    </div>
  );
}