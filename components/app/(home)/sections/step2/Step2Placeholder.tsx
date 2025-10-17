"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { listTemplates } from "@/lib/workflow/templates";

interface Step2PlaceholderProps {
  onReset: () => void;
  onCreateWorkflow: () => void;
  onLoadWorkflow?: (workflowId: string) => void;
  onLoadTemplate?: (templateId: string) => void;
}

interface Workflow {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

interface WorkflowRun {
  id: string;
  workflowName: string;
  status: 'completed' | 'running' | 'failed';
  startedAt: string;
  duration?: string;
}

export default function Step2Placeholder({ onReset, onCreateWorkflow, onLoadWorkflow, onLoadTemplate }: Step2PlaceholderProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [activeTab, setActiveTab] = useState<"workflows" | "templates" | "runs">("workflows");
  const [selectedRun, setSelectedRun] = useState<any | null>(null);
  const [outputView, setOutputView] = useState<"formatted" | "json">("formatted");
  const templates = listTemplates();

  useEffect(() => {
    // Load workflows from API
    const loadWorkflows = async () => {
      try {
        console.log('📡 Fetching workflows from /api/workflows...');
        const response = await fetch('/api/workflows');
        const data = await response.json();
        console.log('📊 API Response:', data);

        if (data.workflows && Array.isArray(data.workflows)) {
          console.log(`✅ Found ${data.workflows.length} workflows`);
          setWorkflows(data.workflows.map((w: any) => ({
            id: w.id,
            title: w.name,
            description: w.description,
            createdAt: new Date(w.updatedAt || w.createdAt).toLocaleDateString(),
          })));
        } else {
          console.log('⚠️ No workflows array in response');
        }
      } catch (error) {
        console.error('❌ Error loading workflows:', error);
      }
    };

    loadWorkflows();

    // Load workflow runs
    const loadWorkflowRuns = async () => {
      try {
        const response = await fetch('/api/workflow/runs');
        if (response.ok) {
          const data = await response.json();
          setWorkflowRuns(data.runs || []);
        }
      } catch (error) {
        console.error('Error loading workflow runs:', error);
      }
    };

    loadWorkflowRuns();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-accent-100';
      case 'running': return 'text-secondary-100';
      case 'failed': return 'text-primary-100';
      default: return 'text-black-alpha-48';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100';
      case 'running': return 'bg-blue-100';
      case 'failed': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 mt-8"
      >
        <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Tutor Flow Dashboard
        </h2>
        <p className="text-lg text-gray-600">
          Create workflows, use templates, or view your execution history
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("workflows")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "workflows"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
          }`}
        >
          Your Workflows ({workflows.length})
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "templates"
              ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
          }`}
        >
          Templates ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab("runs")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "runs"
              ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
          }`}
        >
          Workflow Runs ({workflowRuns.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "runs" ? (
        /* Workflow Runs - List Layout */
        <div className="max-w-4xl mx-auto mb-32">
          {workflowRuns.length > 0 ? (
            <div className="space-y-12">
              {workflowRuns.map((run, index) => (
                <motion.div
                  key={run.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="relative cursor-pointer"
                  onClick={() => setSelectedRun(run)}
                >
                  <div className="bg-accent-white rounded-12 p-20 border border-border-faint hover:border-accent-100 hover:shadow-lg hover:shadow-accent-100/20 transition-all group">
                    <div className="flex items-center justify-between gap-16">
                      <div className="flex-1">
                        <div className="flex items-center gap-12 mb-8">
                          <h3 className="text-lg font-semibold text-accent-black">{run.workflowName}</h3>
                          <span className={`px-10 py-4 rounded-6 text-xs font-medium capitalize ${getStatusBg(run.status)} ${getStatusColor(run.status)}`}>
                            {run.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-16 text-body-small text-black-alpha-48">
                          <span>Started: {new Date(run.startedAt).toLocaleString()}</span>
                          {run.duration && (
                            <>
                              <span>•</span>
                              <span>Duration: {run.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-accent-100 group-hover:text-accent-200">
                        <span className="text-sm font-medium">View details</span>
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[160px]">
              <p className="text-body-medium text-black-alpha-48">No workflow runs yet</p>
            </div>
          )}
        </div>
      ) : (
        /* Workflows and Templates - Grid Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
          {/* Create Workflow Tile - Always first */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: "easeOut"
            }}
            className="relative cursor-pointer"
            onClick={onCreateWorkflow}
          >
            <div className="bg-accent-white rounded-12 p-24 border-2 border-dashed border-border-light hover:border-heat-100 transition-all h-full flex items-center justify-center min-h-[160px]">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-heat-4 flex items-center justify-center mx-auto mb-12">
                  <svg className="w-24 h-24 text-heat-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-label-large text-accent-black font-medium">Create Workflow</h3>
              </div>
            </div>
          </motion.div>

          {/* Show Workflows or Templates based on tab */}
          {activeTab === "workflows" ? (
          workflows.length > 0 ? (
            workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (index + 1) * 0.1,
                  ease: "easeOut"
                }}
                className="relative cursor-pointer"
                onClick={() => onLoadWorkflow?.(workflow.id)}
              >
                <div className="bg-accent-white rounded-12 p-24 border border-border-faint hover:border-primary-100 hover:shadow-lg hover:shadow-primary-100/20 transition-all h-full min-h-[160px] group">
                  <div className="absolute inset-0 rounded-12 bg-gradient-to-br from-primary-100/5 via-secondary-100/5 to-accent-100/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <h3 className="text-label-large text-accent-black font-medium mb-8">{workflow.title}</h3>
                    {workflow.description && (
                      <p className="text-body-small text-black-alpha-48 mb-12 line-clamp-2">{workflow.description}</p>
                    )}
                    <p className="text-body-small text-black-alpha-32">Updated {workflow.createdAt}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-3 flex items-center justify-center min-h-[160px]">
              <p className="text-body-medium text-black-alpha-48">No saved workflows yet</p>
            </div>
          )
        ) : activeTab === "templates" ? (
          templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: (index + 1) * 0.1,
                ease: "easeOut"
              }}
              className="relative cursor-pointer"
              onClick={() => onLoadTemplate?.(template.id)}
            >
              <div className="bg-accent-white rounded-12 p-24 border border-border-faint hover:border-secondary-100 hover:shadow-lg hover:shadow-secondary-100/20 transition-all h-full min-h-[160px] relative overflow-hidden group">
                <div className="absolute inset-0 rounded-12 bg-gradient-to-br from-secondary-100/5 to-accent-100/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-label-large text-accent-black font-medium mb-8">{template.name}</h3>
                  <p className="text-body-small text-black-alpha-48">{template.description}</p>
                  <div className="mt-12 inline-flex items-center gap-6 text-body-small text-secondary-100 group-hover:text-secondary-200">
                    <span>Use template</span>
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : null}
        </div>
      )}

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="px-24 py-12 text-label-large text-black-alpha-48 hover:text-accent-black transition-colors"
        >
          Back
        </button>
      </motion.div>

      {/* Execution Details Modal */}
      {selectedRun && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedRun(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-24 p-32 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-24 pb-16 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedRun.workflowName}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Execution ID: {selectedRun.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedRun(null)}
                className="p-8 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Status and Metadata */}
            <div className="grid grid-cols-2 gap-16 mb-24">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-12 p-16 border-2 border-purple-200">
                <p className="text-xs font-semibold text-gray-600 mb-6 uppercase tracking-wide">Status</p>
                <span className={`inline-flex items-center px-16 py-8 rounded-full text-base font-bold ${
                  selectedRun.status === 'completed' ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' :
                  selectedRun.status === 'running' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' :
                  selectedRun.status === 'failed' ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' :
                  'bg-gray-500 text-white shadow-lg'
                }`}>
                  {selectedRun.status === 'completed' ? '✓ Completed' :
                   selectedRun.status === 'running' ? '⟳ Running' :
                   selectedRun.status === 'failed' ? '✗ Failed' :
                   selectedRun.status}
                </span>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-12 p-16 border-2 border-purple-200">
                <p className="text-xs font-semibold text-gray-600 mb-6 uppercase tracking-wide">Duration</p>
                <p className="text-2xl font-bold text-purple-700">{selectedRun.duration || 'N/A'}</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-12 p-16 border-2 border-purple-200">
                <p className="text-xs font-semibold text-gray-600 mb-6 uppercase tracking-wide">Started At</p>
                <p className="text-base font-semibold text-gray-900">{new Date(selectedRun.startedAt).toLocaleString()}</p>
              </div>
              {selectedRun.completedAt && (
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-12 p-16 border-2 border-purple-200">
                  <p className="text-xs font-semibold text-gray-600 mb-6 uppercase tracking-wide">Completed At</p>
                  <p className="text-base font-semibold text-gray-900">{new Date(selectedRun.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Output/Results */}
            {selectedRun.output && (
              <div className="mb-24">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-lg font-bold text-gray-900">Execution Output</h3>
                  <div className="flex gap-8 items-center">
                    {/* View Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-4">
                      <button
                        onClick={() => setOutputView("formatted")}
                        className={`px-12 py-6 rounded-md text-sm font-medium transition-all ${
                          outputView === "formatted"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        📝 Formatted
                      </button>
                      <button
                        onClick={() => setOutputView("json")}
                        className={`px-12 py-6 rounded-md text-sm font-medium transition-all ${
                          outputView === "json"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        🔧 JSON
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        const text = typeof selectedRun.output === 'string' 
                          ? selectedRun.output 
                          : JSON.stringify(selectedRun.output, null, 2);
                        navigator.clipboard.writeText(text);
                        alert('Copied to clipboard!');
                      }}
                      className="px-16 py-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
                
                {outputView === "formatted" ? (
                  /* Formatted View */
                  <div className="bg-white rounded-12 p-24 border-2 border-purple-200 shadow-lg">
                    <div className="prose prose-lg max-w-none">
                      {(() => {
                        // Extract just the finalOutput text from the output
                        let text = '';
                        if (typeof selectedRun.output === 'string') {
                          text = selectedRun.output;
                        } else if (selectedRun.output && typeof selectedRun.output === 'object') {
                          // Look for finalOutput in the output object
                          const outputObj = selectedRun.output as any;
                          if (outputObj.finalOutput) {
                            text = outputObj.finalOutput;
                          } else if (outputObj.output) {
                            text = typeof outputObj.output === 'string' ? outputObj.output : JSON.stringify(outputObj.output, null, 2);
                          } else {
                            text = JSON.stringify(selectedRun.output, null, 2);
                          }
                        } else {
                          text = JSON.stringify(selectedRun.output, null, 2);
                        }
                        
                        // Replace escaped newlines with actual newlines
                        text = text.replace(/\\n/g, '\n');
                        
                        // Parse and render markdown properly
                        const lines = text.split('\n');
                        const elements: React.ReactElement[] = [];
                        let listItems: React.ReactElement[] = [];
                        let inList = false;
                        
                        lines.forEach((line: string, idx: number) => {
                          // Handle horizontal rule
                          if (line.trim() === '---' || line.trim() === '***') {
                            if (inList) {
                              elements.push(<ul key={`list-${idx}`} className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                              listItems = [];
                              inList = false;
                            }
                            elements.push(<hr key={idx} className="my-16 border-t-2 border-gray-300" />);
                            return;
                          }
                          
                          // Headers
                          if (line.startsWith('# ')) {
                            if (inList) {
                              elements.push(<ul key={`list-${idx}`} className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                              listItems = [];
                              inList = false;
                            }
                            elements.push(<h1 key={idx} className="text-3xl font-black text-gray-900 mt-24 mb-12 leading-tight">{line.slice(2)}</h1>);
                            return;
                          }
                          if (line.startsWith('## ')) {
                            if (inList) {
                              elements.push(<ul key={`list-${idx}`} className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                              listItems = [];
                              inList = false;
                            }
                            elements.push(<h2 key={idx} className="text-2xl font-bold text-gray-800 mt-20 mb-10 leading-tight">{line.slice(3)}</h2>);
                            return;
                          }
                          if (line.startsWith('### ')) {
                            if (inList) {
                              elements.push(<ul key={`list-${idx}`} className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                              listItems = [];
                              inList = false;
                            }
                            elements.push(<h3 key={idx} className="text-xl font-semibold text-gray-800 mt-16 mb-8 leading-tight">{line.slice(4)}</h3>);
                            return;
                          }
                          
                          // Lists
                          if (line.match(/^[\-\*]\s/) || line.match(/^\d+\.\s/)) {
                            const content = line.replace(/^[\-\*]\s/, '').replace(/^\d+\.\s/, '');
                            const formatted = content.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s]+)/g).map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                              }
                              if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                                return <em key={i} className="italic text-gray-700">{part.slice(1, -1)}</em>;
                              }
                              if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={i} className="bg-gray-200 px-6 py-2 rounded text-sm font-mono text-gray-800">{part.slice(1, -1)}</code>;
                              }
                              // Handle markdown links [text](url)
                              const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                              if (linkMatch) {
                                return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">{linkMatch[1]}</a>;
                              }
                              // Handle plain URLs
                              if (part.match(/^https?:\/\//)) {
                                return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors break-all">{part}</a>;
                              }
                              return part;
                            });
                            listItems.push(<li key={idx} className="text-gray-700 leading-relaxed">{formatted}</li>);
                            inList = true;
                            return;
                          }
                          
                          // Close list if we're no longer in one
                          if (inList && !line.match(/^[\-\*]\s/) && !line.match(/^\d+\.\s/)) {
                            elements.push(<ul key={`list-${idx}`} className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                            listItems = [];
                            inList = false;
                          }
                          
                          // Empty line
                          if (line.trim() === '') {
                            elements.push(<div key={idx} className="h-8" />);
                            return;
                          }
                          
                          // Regular paragraph with inline formatting (including links)
                          const formatted = line.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s]+)/g).map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                            }
                            if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                              return <em key={i} className="italic text-gray-700">{part.slice(1, -1)}</em>;
                            }
                            if (part.startsWith('`') && part.endsWith('`')) {
                              return <code key={i} className="bg-gray-200 px-6 py-2 rounded text-sm font-mono text-gray-800">{part.slice(1, -1)}</code>;
                            }
                            // Handle markdown links [text](url)
                            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                              return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">{linkMatch[1]}</a>;
                            }
                            // Handle plain URLs
                            if (part.match(/^https?:\/\//)) {
                              return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors break-all">{part}</a>;
                            }
                            return part;
                          });
                          
                          elements.push(<p key={idx} className="text-gray-700 text-lg leading-relaxed mb-8">{formatted}</p>);
                        });
                        
                        // Close any remaining list
                        if (inList) {
                          elements.push(<ul key="list-final" className="list-disc ml-24 mb-16 space-y-4">{listItems}</ul>);
                        }
                        
                        return elements;
                      })()}
                    </div>
                  </div>
                ) : (
                  /* JSON View */
                  <div className="bg-gray-900 rounded-12 p-16 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                      {typeof selectedRun.output === 'string' 
                        ? selectedRun.output 
                        : JSON.stringify(selectedRun.output, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {selectedRun.error && (
              <div className="mb-24">
                <h3 className="text-lg font-bold text-red-600 mb-12">Error</h3>
                <div className="bg-red-50 border border-red-200 rounded-12 p-16">
                  <pre className="text-sm text-red-800 font-mono whitespace-pre-wrap">
                    {selectedRun.error}
                  </pre>
                </div>
              </div>
            )}

            {/* Node Results - Only show in JSON view mode */}
            {outputView === "json" && selectedRun.nodeResults && Object.keys(selectedRun.nodeResults).length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-lg font-bold text-gray-900">Node Results</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedRun.nodeResults, null, 2));
                      alert('Copied to clipboard!');
                    }}
                    className="px-16 py-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                  >
                    📋 Copy All Results
                  </button>
                </div>
                <div className="space-y-12">
                  {Object.entries(selectedRun.nodeResults).map(([nodeId, result]: [string, any]) => (
                    <div key={nodeId} className="bg-gray-50 rounded-12 p-16 border border-gray-200">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="font-semibold text-gray-900">{nodeId}</h4>
                        <span className={`text-xs px-8 py-4 rounded-6 font-medium ${
                          result.status === 'completed' ? 'bg-green-100 text-green-800' :
                          result.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      {result.output && (
                        <div className="bg-white rounded-8 p-12 mt-8">
                          <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap">
                            {typeof result.output === 'string' 
                              ? result.output 
                              : JSON.stringify(result.output, null, 2)}
                          </pre>
                        </div>
                      )}
                      {result.error && (
                        <div className="bg-red-50 rounded-8 p-12 mt-8">
                          <pre className="text-xs text-red-700 font-mono whitespace-pre-wrap">
                            {result.error}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-24 pt-16 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedRun(null)}
                className="px-24 py-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}