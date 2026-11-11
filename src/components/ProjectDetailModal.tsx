import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]/80">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="text-neon font-bold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-crisp font-semibold">{project.title}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-muted hover:text-crisp flex items-center justify-center transition-colors"
            title="Close modal (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Tagline */}
          <div>
            <h3 className="font-display-tight text-3xl sm:text-4xl text-crisp">
              {project.title}
            </h3>
            <p className="text-neon font-mono text-sm mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Project Visual */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#141414] rounded-lg border border-white/10 text-center">
            {project.metrics.map(metric => (
              <div key={metric.label}>
                <div className="font-mono font-bold text-neon text-lg sm:text-2xl tabular-nums">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-muted mt-0.5 uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive: Problem & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-neon" />
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp uppercase tracking-wider">
                <Layers className="w-4 h-4 text-neon" />
                <span>Architecture &amp; Strategy</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Overview Prose */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-mono font-semibold text-crisp uppercase tracking-wider mb-2">
              System Overview
            </h4>
            <p className="text-muted text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-crisp uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4 text-neon" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#161616] border border-white/10 text-crisp text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-crisp text-xs font-mono font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Inspect Repository</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-[#ff551a] text-carbon text-xs font-mono font-bold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-muted hover:text-crisp transition-colors"
            >
              Close Window [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
