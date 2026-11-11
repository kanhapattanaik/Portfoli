import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Cpu } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'All' | 'AI & Agents' | 'Cloud & Systems' | 'Computer Vision' | 'Full-Stack & UI';

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = [
    'All',
    'AI & Agents',
    'Cloud & Systems',
    'Computer Vision',
    'Full-Stack & UI'
  ];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neon tracking-wider uppercase mb-2">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>FEATURED SYSTEMS</span>
          </div>
          <h2 className="font-display-tight text-4xl sm:text-5xl lg:text-6xl text-crisp">
            ENGINEERED WORKS<span className="text-neon">.</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Production-grade autonomous agent engines, low-latency edge inference models, and cloud-native systems built with rigorous benchmarks.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#121212] rounded-lg border border-white/10 overflow-x-auto max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-neon text-carbon font-bold shadow-md'
                  : 'text-muted hover:text-crisp hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pt-10">
        {filteredProjects.map((project, idx) => {
          const isLarge = idx === 0 || idx === 1;
          const colSpan = isLarge ? 'lg:col-span-6' : 'lg:col-span-6 xl:col-span-4';

          return (
            <div
              key={project.id}
              className={`project-card rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer ${colSpan}`}
              onClick={() => onSelectProject(project)}
            >
              <div>
                {/* Media Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80" />

                  {/* Corner Category Tag */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-crisp">
                    {project.category}
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-muted">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title & Tagline */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display-tight text-2xl sm:text-3xl text-crisp group-hover:text-neon transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted text-xs sm:text-sm mt-1 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-neon group-hover:bg-neon/10 flex items-center justify-center shrink-0 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-neon transition-colors" />
                    </div>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 mt-4 bg-[#141414] rounded-lg border border-white/5 text-center">
                    {project.metrics.map(metric => (
                      <div key={metric.label}>
                        <div className="font-mono font-bold text-neon text-sm sm:text-base tabular-nums">
                          {metric.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-muted uppercase">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.stack.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 text-crisp/80 text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-muted text-[10px] font-mono self-center">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 text-xs font-mono">
                <span className="text-neon group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Architecture Deep-Dive</span>
                  <span>-&gt;</span>
                </span>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-muted hover:text-crisp hover:bg-white/5 rounded transition-colors"
                    title="View GitHub repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-muted hover:text-crisp hover:bg-white/5 rounded transition-colors"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Callout Footer Strip */}
      <div className="mt-12 p-6 rounded-xl bg-[#0c0c0c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-neon" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-crisp">
              Explore 40+ Additional Labs &amp; Experimental Repositories
            </h4>
            <p className="text-xs text-muted">
              Including SIMD optimizations, microservice prototypes, Wasm modules, and agentic workflows.
            </p>
          </div>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-crisp text-xs font-mono font-medium transition-colors shrink-0"
        >
          <Github className="w-4 h-4" />
          <span>Browse GitHub Labs</span>
        </a>
      </div>
    </section>
  );
};
