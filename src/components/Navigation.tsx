import React from 'react';
import { Bot, FileText } from 'lucide-react';

interface NavigationProps {
  agentsEnabled: boolean;
  onToggleAgents: () => void;
  onOpenResume: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  agentsEnabled,
  onToggleAgents,
  onOpenResume
}) => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
      <nav className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-full bg-[#101010]/90 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Brand Zone: Circular KP badge */}
        <a
          href="#home"
          className="w-7 h-7 rounded-full bg-neon flex items-center justify-center text-carbon font-mono font-bold text-xs tracking-tighter hover:scale-105 transition-transform shrink-0"
          title="Kanha Pattanaik — Home"
        >
          KP
        </a>

        {/* Zone 2: Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-medium text-crisp/80">
          <a
            href="#home"
            className="px-2.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="#work"
            className="px-2.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Work
          </a>
          <a
            href="#lab"
            className="px-2.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Live Lab
          </a>
          <a
            href="#skills"
            className="px-2.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Skills &amp; Badges
          </a>
          <a
            href="#contact"
            className="px-2.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </div>

        {/* Separator hairline */}
        <div className="h-4 w-px bg-white/10 shrink-0" />

        {/* Zone 3: Utility Controls & Primary Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Agent Cursors Toggle */}
          <button
            type="button"
            onClick={onToggleAgents}
            title={agentsEnabled ? 'Mute AI Agent Cursors' : 'Activate Live AI Agent Cursors'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              agentsEnabled
                ? 'bg-neon/15 text-neon border border-neon/30'
                : 'bg-white/5 text-muted hover:text-crisp border border-transparent'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Agents</span>
            <span className="text-[9px] font-bold opacity-80">{agentsEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Resume CTA */}
          <button
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-crisp text-xs font-mono transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-neon" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-flex px-3 py-1 rounded-full bg-neon text-carbon text-xs font-mono font-bold tracking-wider hover:bg-[#ff551a] transition-colors whitespace-nowrap"
          >
            HIRE ME
          </a>
        </div>
      </nav>
    </header>
  );
};
