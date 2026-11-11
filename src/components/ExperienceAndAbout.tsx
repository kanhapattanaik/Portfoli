import React from 'react';
import { GraduationCap, Code, Compass, Terminal, Shield } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';

export const ExperienceAndAbout: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="pb-10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-neon tracking-wider uppercase mb-2">
          <span>04</span>
          <span aria-hidden="true">·</span>
          <span>BACKGROUND &amp; PHILOSOPHY</span>
        </div>
        <h2 className="font-display-tight text-4xl sm:text-5xl lg:text-6xl text-crisp">
          ENGINEERING JOURNEY<span className="text-neon">.</span>
        </h2>
        <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
          Bridging foundational computer science theory with high-velocity agentic AI workflows and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        {/* Left Column: Timeline Milestones (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-neon" />
            <span>Academic Milestones &amp; Independent Research</span>
          </h3>

          <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node Bullet */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#060606] border-2 border-neon group-hover:bg-neon transition-colors" />

                <div className="text-[11px] font-mono text-neon font-semibold mb-1">
                  {item.period}
                </div>

                <h4 className="font-display-tight text-xl sm:text-2xl text-crisp">
                  {item.role}
                </h4>

                <div className="text-xs font-mono text-muted mb-2">
                  {item.organization}
                </div>

                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/5 text-crisp/80 text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Engineering Principles Bento (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-neon" />
            <span>Core Engineering Principles</span>
          </h3>

          <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp">
              <Terminal className="w-4 h-4 text-neon" />
              <span>1. Systems Over Scripts</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Never ship loose prompt scripts when an event-driven state machine or typed DAG compiler guarantees deterministic outputs and structured rollbacks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp">
              <Shield className="w-4 h-4 text-neon" />
              <span>2. Rigorous Observability &amp; Latency Caps</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Every production pipeline requires sub-second p99 latency targets, token budget enforcement, and zero-trust security postures across Kubernetes clusters.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp">
              <Code className="w-4 h-4 text-neon" />
              <span>3. Anti-Slop, Production-First Code</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Clean TypeScript interfaces, reproducible Docker environments, and battle-tested error handling rather than fragile prototype mocks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
