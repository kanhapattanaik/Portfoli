import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Play, RotateCcw, Terminal as TerminalIcon, CheckCircle2, Clock, Activity, Code2, Sparkles } from 'lucide-react';
import { PIPELINE_SIMULATIONS, PipelineSimulation } from '../data/portfolioData';

type WorkbenchTab = 'pipeline' | 'terminal';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
}

export const InteractiveWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('pipeline');
  
  // Pipeline Simulation State
  const [selectedPipelineIndex, setSelectedPipelineIndex] = useState<number>(0);
  const currentPipeline: PipelineSimulation = PIPELINE_SIMULATIONS[selectedPipelineIndex];
  const [running, setRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Terminal CLI State
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'system', content: 'KanhaOS v2.4 (x86_64-pc-linux-gnu)' },
    { type: 'system', content: 'Type "help" to list available commands. Try "skills", "projects", or "whoami".' }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Pipeline execution runner
  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setIsCompleted(false);
    setActiveStepIndex(0);
    setLogs([`[0.00s] Initializing execution mesh for: ${currentPipeline.name}...`]);

    const steps = currentPipeline.steps;

    steps.forEach((step, idx) => {
      // Calculate cumulative delay
      const delay = steps.slice(0, idx).reduce((sum, s) => sum + s.durationMs, 200);

      setTimeout(() => {
        setActiveStepIndex(idx);
        setLogs(prev => [
          ...prev,
          `[+${step.durationMs}ms] [${step.agent}] ${step.action}`,
          `>> Output: ${step.outputSample}`
        ]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setRunning(false);
            setIsCompleted(true);
            setLogs(prev => [
              ...prev,
              `[SUCCESS] Pipeline finished with 100% confidence. Final telemetry recorded.`
            ]);
          }, step.durationMs);
        }
      }, delay);
    });
  };

  const resetSimulation = () => {
    setRunning(false);
    setActiveStepIndex(-1);
    setIsCompleted(false);
    setLogs([]);
  };

  // Terminal CLI commands
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Append to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newEntries: TerminalLine[] = [{ type: 'input', content: `kanha@builder:~$ ${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newEntries.push({
        type: 'output',
        content: `Available commands:
  whoami      - Developer profile & bio summary
  skills      - Technical skills matrix & languages
  projects    - Highlighted production engineering works
  badges      - Verified Cloud & AI certifications
  contact     - Email, GitHub, and social links
  cat arch    - Engineering architecture philosophy
  clear       - Clear terminal window
  help        - Show this reference menu`
      });
    } else if (lower === 'whoami') {
      newEntries.push({
        type: 'output',
        content: `Kanha Pattanaik — Software Engineer & AI Builder.
Based in Odisha, India. Computer Science & Engineering student.
Specialized in Autonomous AI Agent workflows, Low-Latency Edge Inference, and Cloud Architecture.`
      });
    } else if (lower === 'skills') {
      newEntries.push({
        type: 'output',
        content: `LANGUAGES:    Python, TypeScript, Go, C++, SQL, Bash
FRAMEWORKS:   FastAPI, Node.js, Express, React 19, Next.js, PyTorch
AI & AGENTS:  Gemini API, LangChain, Multi-Agent DAGs, RAG, DSPy, TensorRT
CLOUD/INFRA:  Docker, Kubernetes, GCP (Vertex AI), AWS (ECS/S3), Redis, PostgreSQL`
      });
    } else if (lower === 'projects') {
      newEntries.push({
        type: 'output',
        content: `1. OmniFlow AI      - Autonomous Multi-Agent DAG Orchestrator (<18ms dispatch)
2. Neurolab Vision  - Real-Time Multi-Stream Edge Computer Vision (24ms inference)
3. AeroCloud Guard  - Kubernetes Policy Engine & Multi-Cloud Posture Sentinel
4. PulseVoice AI    - Sub-50ms Speech Intelligence & Action Synthesizer`
      });
    } else if (lower === 'badges') {
      newEntries.push({
        type: 'output',
        content: `[VERIFIED] Google Cloud: Generative AI Leader & Cloud Architect
[VERIFIED] AWS: Cloud Practitioner & Solutions Architecture Foundations
[VERIFIED] DeepLearning.AI: Multi-Agent Architectures with AutoGen & CrewAI
[VERIFIED] Postman: API Fundamentals Student Expert
[VERIFIED] Oracle: Cloud Infrastructure Foundations Associate`
      });
    } else if (lower === 'contact') {
      newEntries.push({
        type: 'output',
        content: `Email:    kanhapattanaik018@gmail.com
GitHub:   https://github.com
Location: Odisha, India
Status:   Open to Internships & Software Engineering Roles`
      });
    } else if (lower === 'cat arch' || lower === 'cat architecture' || lower === 'cat architecture.md') {
      newEntries.push({
        type: 'output',
        content: `# Architecture Philosophy:
1. Prefer explicit event-driven state machines over loose LLM loops.
2. Invariant validation must happen in compiled code, not prompt coaxing.
3. Keep inference close to data (Edge TensorRT / In-Memory vector graphs).
4. Measure latency in single-digit milliseconds.`
      });
    } else if (lower === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    } else {
      newEntries.push({
        type: 'error',
        content: `Command not recognized: "${cmd}". Type "help" for a list of commands.`
      });
    }

    setTerminalHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  return (
    <section id="lab" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neon tracking-wider uppercase mb-2">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>INTERACTIVE EXPERIMENTAL BENCH</span>
          </div>
          <h2 className="font-display-tight text-4xl sm:text-5xl lg:text-6xl text-crisp">
            THE AGENT WORKBENCH<span className="text-neon">.</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Test and simulate real distributed multi-agent pipelines or interact directly via the developer shell.
          </p>
        </div>

        {/* Tab switch: Pipeline vs Terminal */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === 'pipeline'
                ? 'bg-neon text-carbon font-bold shadow-md'
                : 'text-muted hover:text-crisp'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pipeline Engine</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all ${
              activeTab === 'terminal'
                ? 'bg-neon text-carbon font-bold shadow-md'
                : 'text-muted hover:text-crisp'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Developer Shell</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      <div className="pt-10">
        {activeTab === 'pipeline' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left Controls & Flow Diagram (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              {/* Pipeline Selector */}
              <div>
                <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                  Select Execution Scenario
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PIPELINE_SIMULATIONS.map((sim, i) => (
                    <button
                      key={sim.id}
                      type="button"
                      disabled={running}
                      onClick={() => {
                        setSelectedPipelineIndex(i);
                        resetSimulation();
                      }}
                      className={`text-left p-3.5 rounded-lg border text-xs font-mono transition-all ${
                        selectedPipelineIndex === i
                          ? 'border-neon bg-neon/10 text-crisp'
                          : 'border-white/10 bg-[#141414] text-muted hover:text-crisp hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-crisp">{sim.name}</div>
                      <div className="text-[11px] text-muted mt-1 line-clamp-1">{sim.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Node Graph Step Track */}
              <div className="space-y-3 py-2">
                <div className="text-xs font-mono text-muted uppercase tracking-wider flex items-center justify-between">
                  <span>DAG Execution Nodes</span>
                  <span className="text-neon">{currentPipeline.steps.length} Nodes</span>
                </div>

                <div className="space-y-3">
                  {currentPipeline.steps.map((step, idx) => {
                    const isActive = activeStepIndex === idx;
                    const isPassed = activeStepIndex > idx || isCompleted;

                    return (
                      <div
                        key={step.node}
                        className={`p-3.5 rounded-lg border transition-all ${
                          isActive
                            ? 'border-neon bg-neon/15 shadow-[0_0_15px_rgba(255,68,0,0.2)]'
                            : isPassed
                            ? 'border-emerald-500/40 bg-emerald-950/10'
                            : 'border-white/5 bg-[#141414]/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {isPassed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : isActive ? (
                              <Activity className="w-4 h-4 text-neon animate-pulse shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-mono text-muted shrink-0">
                                {idx + 1}
                              </div>
                            )}
                            <span className="font-mono text-xs font-bold text-crisp">
                              {step.node}
                            </span>
                            <span className="text-[10px] font-mono text-muted hidden sm:inline">
                              [{step.agent}]
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                            <Clock className="w-3 h-3 text-neon" />
                            <span>{step.durationMs}ms</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted mt-1.5 pl-6">
                          {step.action}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Execution Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={runSimulation}
                    disabled={running}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon hover:bg-[#ff551a] disabled:opacity-50 text-carbon font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,68,0,0.3)] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{running ? 'Executing...' : 'Run Pipeline'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetSimulation}
                    disabled={running}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-crisp text-xs transition-colors cursor-pointer"
                    title="Reset Execution State"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs font-mono text-muted">
                  Status:{' '}
                  <span className={running ? 'text-neon font-bold' : isCompleted ? 'text-emerald-400 font-bold' : 'text-muted'}>
                    {running ? 'DISPATCHING' : isCompleted ? 'VERIFIED' : 'IDLE'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Live Telemetry & Output Console (5 Cols) */}
            <div className="lg:col-span-5 bg-[#090909] border border-white/10 rounded-xl p-5 flex flex-col justify-between h-full font-mono text-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-muted">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-neon" />
                    <span className="font-semibold text-crisp">Telemetry Stream</span>
                  </div>
                  <span className="text-[10px]">JSON Output</span>
                </div>

                {/* Console Log Lines */}
                <div className="mt-4 space-y-2 h-[260px] sm:h-[320px] overflow-y-auto pr-2 text-muted">
                  {logs.length === 0 ? (
                    <div className="text-center text-muted/60 pt-16 font-mono text-xs">
                      Press &quot;Run Pipeline&quot; to stream real-time agent execution traces and payloads.
                    </div>
                  ) : (
                    logs.map((log, i) => (
                      <div
                        key={i}
                        className={`font-mono text-[11px] leading-relaxed ${
                          log.startsWith('>> Output:')
                            ? 'text-neon/90 pl-3'
                            : log.startsWith('[SUCCESS]')
                            ? 'text-emerald-400 font-bold'
                            : 'text-crisp/80'
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Final Payload Card */}
              {isCompleted && (
                <div className="mt-4 p-3.5 bg-[#141414] rounded-lg border border-emerald-500/30 text-[11px] space-y-1">
                  <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                    Verified Execution Telemetry
                  </div>
                  <pre className="text-crisp/90 overflow-x-auto text-[10px]">
                    {JSON.stringify(currentPipeline.finalOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Mode B: Interactive Terminal CLI */
          <div className="bg-[#080808] border border-white/10 rounded-xl p-6 font-mono text-xs shadow-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-muted text-[11px] ml-2">kanha@portfolio: ~ (bash)</span>
              </div>
              <span className="text-muted text-[10px]">Interactive CLI</span>
            </div>

            {/* Scrollable history */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2 text-[12px]">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'input' && (
                    <span className="text-neon font-bold">{item.content}</span>
                  )}
                  {item.type === 'output' && (
                    <pre className="text-crisp/90 whitespace-pre-wrap font-mono mt-0.5">
                      {item.content}
                    </pre>
                  )}
                  {item.type === 'system' && (
                    <span className="text-muted italic">{item.content}</span>
                  )}
                  {item.type === 'error' && (
                    <span className="text-red-400 font-medium">{item.content}</span>
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Input prompt line */}
            <form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
              <span className="text-neon font-bold shrink-0">kanha@builder:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'skills', 'projects', 'contact'..."
                className="w-full bg-transparent text-crisp focus:outline-none font-mono text-xs caret-neon"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
