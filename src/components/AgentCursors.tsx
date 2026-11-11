import React, { useEffect, useState, useRef } from 'react';

interface CursorState {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  status: string;
  speed: number;
}

const AGENTS = [
  { name: 'Agent Gemini', color: '#3B82F6', status: 'Verifying Latency' },
  { name: 'Agent Claude', color: '#FF7B00', status: 'Refactoring AST' },
  { name: 'Agent GPT-4o', color: '#10B981', status: 'Synthesizing Pipeline' },
  { name: 'Agent DeepSeek', color: '#6366F1', status: 'Evaluating HNSW' },
  { name: 'Kanha (Builder)', color: '#FF4400', status: 'Deploying Service' },
  { name: 'Reviewer Daemon', color: '#EC4899', status: 'Audit Passed' }
];

interface AgentCursorsProps {
  enabled: boolean;
}

export const AgentCursors: React.FC<AgentCursorsProps> = ({ enabled }) => {
  const [cursors, setCursors] = useState<CursorState[]>([]);
  const [visitorClicks, setVisitorClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCursors([]);
      return;
    }

    const initial = AGENTS.map((agent, i) => {
      const startX = Math.random() * (window.innerWidth - 100) + 50;
      const startY = Math.random() * (window.innerHeight - 100) + 50;
      return {
        id: `agent-${i}`,
        name: agent.name,
        color: agent.color,
        x: startX,
        y: startY,
        targetX: Math.random() * (window.innerWidth - 120) + 60,
        targetY: Math.random() * (window.innerHeight - 120) + 60,
        status: agent.status,
        speed: 0.03 + Math.random() * 0.03
      };
    });

    setCursors(initial);

    const interval = setInterval(() => {
      setCursors(prev =>
        prev.map(c => {
          // If close to target, pick new random target
          const dx = c.targetX - c.x;
          const dy = c.targetY - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40 || Math.random() < 0.08) {
            return {
              ...c,
              targetX: Math.random() * (window.innerWidth - 140) + 70,
              targetY: Math.random() * (window.innerHeight - 140) + 70
            };
          }
          return c;
        })
      );
    }, 1200);

    const animate = () => {
      setCursors(prev =>
        prev.map(c => {
          const nextX = c.x + (c.targetX - c.x) * c.speed;
          const nextY = c.y + (c.targetY - c.y) * c.speed;
          return {
            ...c,
            x: nextX,
            y: nextY
          };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [enabled]);

  // Allow visitor to click to create ripple
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const clickId = Date.now();
      setVisitorClicks(prev => [...prev.slice(-4), { id: clickId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setVisitorClicks(prev => prev.filter(c => c.id !== clickId));
      }, 900);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Clicks ripple feedback */}
      {visitorClicks.map(click => (
        <div
          key={click.id}
          className="absolute w-8 h-8 rounded-full border border-neon/80 -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ left: click.x, top: click.y }}
        />
      ))}

      {/* Floating Agent Cursors */}
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className="absolute top-0 left-0 transition-opacity duration-300 flex items-start"
          style={{
            transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
            willChange: 'transform'
          }}
        >
          {/* Arrow cursor SVG */}
          <svg
            className="w-4 h-4 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.65 3.12a.7.7 0 00-.97.77l3.8 14.54a.7.7 0 001.32.06l2.9-6.42 6.42-2.9a.7.7 0 00.06-1.32L5.65 3.12z"
              fill={cursor.color}
              stroke="#060606"
              strokeWidth="1.5"
            />
          </svg>

          {/* Figma-style Agent Label Pill */}
          <div
            className="ml-1.5 mt-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-tight shadow-lg border border-black/30 flex items-center gap-1.5 whitespace-nowrap select-none"
            style={{
              backgroundColor: cursor.color,
              color: '#060606'
            }}
          >
            <span>{cursor.name}</span>
            <span className="opacity-75 text-[9px] hidden sm:inline">· {cursor.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
