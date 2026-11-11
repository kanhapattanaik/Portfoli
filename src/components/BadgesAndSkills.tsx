import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Cpu, Server, Cloud, Layout, Check } from 'lucide-react';
import { BADGES, SKILL_CATEGORIES } from '../data/portfolioData';

export const BadgesAndSkills: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="pb-10 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neon tracking-wider uppercase mb-2">
            <span>03</span>
            <span aria-hidden="true">·</span>
            <span>CREDENTIALS &amp; COMPETENCIES</span>
          </div>
          <h2 className="font-display-tight text-4xl sm:text-5xl lg:text-6xl text-crisp">
            SKILLS &amp; BADGES<span className="text-neon">.</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Verified industry certifications in cloud infrastructure and generative AI, paired with a production-tested technical stack.
          </p>
        </div>

        {/* Quick summary stat */}
        <div className="flex items-center gap-6 font-mono text-xs text-muted">
          <div>
            <span className="text-neon font-bold text-lg">05+</span>
            <span className="block text-[10px]">VERIFIED CREDENTIALS</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-neon font-bold text-lg">20+</span>
            <span className="block text-[10px]">CORE TECHNOLOGIES</span>
          </div>
        </div>
      </div>

      {/* Part 1: Verified Cloud & AI Badges Grid */}
      <div className="pt-10">
        <h3 className="text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
          <Award className="w-4 h-4 text-neon" />
          <span>Verified Cloud &amp; AI Certifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BADGES.map(badge => (
            <div
              key={badge.id}
              className="p-5 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-neon/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Issuer + date */}
                <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
                  <span className="text-neon font-semibold">{badge.issuer}</span>
                  <span>{badge.date}</span>
                </div>

                {/* Badge title */}
                <h4 className="font-display-tight text-xl text-crisp group-hover:text-neon transition-colors leading-tight">
                  {badge.title}
                </h4>

                {/* Credential ID */}
                <div className="mt-2 text-[10px] font-mono text-muted/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ID: {badge.credentialId}</span>
                </div>

                {/* Validated Skills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {badge.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white/5 text-crisp/80 text-[10px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-5 mt-4 border-t border-white/5">
                <a
                  href={badge.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-neon transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Technical Skill Matrix */}
      <div className="pt-16">
        <h3 className="text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-neon" />
          <span>Production Stack &amp; Proficiency</span>
        </h3>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                selectedCategoryIdx === idx
                  ? 'bg-neon text-carbon font-bold shadow-md'
                  : 'bg-[#121212] text-muted hover:text-crisp border border-white/10'
              }`}
            >
              {cat.icon === 'Bot' && <Cpu className="w-3.5 h-3.5" />}
              {cat.icon === 'Server' && <Server className="w-3.5 h-3.5" />}
              {cat.icon === 'Cloud' && <Cloud className="w-3.5 h-3.5" />}
              {cat.icon === 'Layout' && <Layout className="w-3.5 h-3.5" />}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skill Bars */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES[selectedCategoryIdx].skills.map(skill => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-crisp font-semibold">{skill.name}</span>
                  <span className="text-neon tabular-nums">{skill.level}%</span>
                </div>
                {/* Progress track */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon/70 to-neon rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Core Strengths summary */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-muted">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
              <span>Event-driven &amp; asynchronous microservices with FastAPI &amp; Node.js</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
              <span>Stateful agentic loops with checkpointing and vector memory retrieval</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
              <span>Dockerized deployment pipelines on Google Cloud Run &amp; AWS ECS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
