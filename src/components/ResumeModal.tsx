import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PORTFOLIO_HERO, PROJECTS, BADGES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0c] border border-white/20 rounded-xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#141414]">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="text-neon font-bold">KANHA_PATTANAIK_RESUME.PDF</span>
            <span aria-hidden="true">·</span>
            <span>SPECIFICATION SHEET</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-crisp text-xs font-mono transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neon" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-muted hover:text-crisp flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[82vh] overflow-y-auto font-sans bg-[#0c0c0c] text-crisp selection:bg-neon selection:text-carbon print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black/20">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-display-tight text-3xl sm:text-4xl text-crisp print:text-black">
                  KANHA PATTANAIK
                </h1>
                <p className="font-mono text-neon text-xs sm:text-sm font-semibold tracking-wider mt-0.5 print:text-orange-600">
                  SOFTWARE ENGINEER &amp; AI BUILDER
                </p>
              </div>

              <div className="text-xs font-mono text-muted print:text-gray-600 space-y-0.5 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3 h-3 text-neon" />
                  <span>Odisha, India</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3 h-3 text-neon" />
                  <span>{PORTFOLIO_HERO.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-wider print:text-orange-600">
              Technical Profile
            </h2>
            <p className="text-xs sm:text-sm text-muted print:text-gray-700 leading-relaxed">
              Computer Science &amp; Engineering undergraduate with demonstrated capability in architecting autonomous AI agent workflows, real-time edge computer vision systems, and resilient cloud infrastructure. Recipient of 5+ industry certifications from Google Cloud, AWS, DeepLearning.AI, and Postman.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-wider print:text-orange-600">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-mono">
              <div>
                <span className="font-bold text-crisp print:text-black">Bachelor of Technology in Computer Science &amp; Engineering</span>
                <div className="text-muted print:text-gray-600 text-[11px]">Silicon Institute of Technology / BPUT, Odisha</div>
              </div>
              <span className="text-neon print:text-orange-600">2026 – 2030 (Expected)</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-wider print:text-orange-600">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-muted print:text-gray-700">
              <div><strong className="text-crisp print:text-black">Languages:</strong> Python, TypeScript, Go, C++, SQL, Bash</div>
              <div><strong className="text-crisp print:text-black">AI &amp; Models:</strong> Gemini 2.0/2.5 API, Vertex AI, PyTorch, TensorRT, LangChain, DSPy</div>
              <div><strong className="text-crisp print:text-black">Backend &amp; Web:</strong> FastAPI, Node.js, Express, React 19, Next.js, WebSockets, WebRTC</div>
              <div><strong className="text-crisp print:text-black">Cloud &amp; DevOps:</strong> Docker, Kubernetes, GCP Cloud Run, AWS ECS/S3, Redis, PostgreSQL</div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-wider print:text-orange-600">
              Key Engineering Projects
            </h2>

            {PROJECTS.slice(0, 3).map(p => (
              <div key={p.id} className="space-y-1 text-xs">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="font-bold text-crisp print:text-black">{p.title} — {p.tagline}</span>
                  <span className="text-muted print:text-gray-600 text-[11px]">{p.year}</span>
                </div>
                <p className="text-muted print:text-gray-700 leading-relaxed">
                  {p.description}
                </p>
                <div className="text-[11px] font-mono text-neon/90 print:text-orange-600">
                  Stack: {p.stack.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Badges & Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-wider print:text-orange-600">
              Verified Certifications
            </h2>
            <div className="space-y-1.5 text-xs font-mono text-muted print:text-gray-700">
              {BADGES.map(b => (
                <div key={b.id} className="flex items-baseline justify-between">
                  <span>• {b.title} ({b.issuer})</span>
                  <span className="text-[10px] text-muted">{b.credentialId}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
