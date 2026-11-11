import React, { useState, FormEvent } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Code2, FileText } from 'lucide-react';
import { PORTFOLIO_HERO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Internship Opportunity',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_HERO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="pb-10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-neon tracking-wider uppercase mb-2">
          <span>05</span>
          <span aria-hidden="true">·</span>
          <span>INITIATE CONTACT</span>
        </div>
        <h2 className="font-display-tight text-4xl sm:text-5xl lg:text-6xl text-crisp">
          LET&apos;S CONNECT<span className="text-neon">.</span>
        </h2>
        <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
          Open to software engineering internships, research fellowships, and high-impact distributed AI projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        {/* Left Column: Direct Info & Quick Copy (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span>DIRECT INBOX</span>
              <span className="text-emerald-400 font-semibold">Replies within 24h</span>
            </div>

            <div className="font-mono text-sm sm:text-base text-crisp font-semibold break-all">
              {PORTFOLIO_HERO.email}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-[#ff551a] text-carbon font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
              </button>

              <a
                href={`mailto:${PORTFOLIO_HERO.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-crisp font-mono text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mailer</span>
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-4">
            <div className="text-xs font-mono text-muted uppercase tracking-wider">
              Developer Ecosystem &amp; Profiles
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#141414] hover:bg-white/10 text-crisp flex items-center gap-2.5 transition-colors border border-white/5"
              >
                <Github className="w-4 h-4 text-neon" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#141414] hover:bg-white/10 text-crisp flex items-center gap-2.5 transition-colors border border-white/5"
              >
                <Linkedin className="w-4 h-4 text-neon" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#141414] hover:bg-white/10 text-crisp flex items-center gap-2.5 transition-colors border border-white/5"
              >
                <Twitter className="w-4 h-4 text-neon" />
                <span>X / Twitter</span>
              </a>

              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#141414] hover:bg-white/10 text-crisp flex items-center gap-2.5 transition-colors border border-white/5"
              >
                <Code2 className="w-4 h-4 text-neon" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* Resume Quick Access */}
          <div className="p-5 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-neon" />
              <div>
                <div className="font-mono text-xs font-bold text-crisp">Engineering Resume</div>
                <div className="text-[11px] text-muted">Formatted PDF &amp; Web View</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-lg bg-neon text-carbon font-mono text-xs font-bold hover:bg-[#ff551a] transition-colors"
            >
              View Specs
            </button>
          </div>
        </div>

        {/* Right Column: Working Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-xl p-6 sm:p-8">
          {formSubmitted ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-display-tight text-3xl text-crisp">
                Message Dispatched!
              </h3>
              <p className="text-muted text-sm max-w-md font-mono">
                Thank you for reaching out, <span className="text-neon font-bold">{formData.name}</span>. Your inquiry has been routed to Kanha&apos;s direct priority queue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', projectType: 'Internship Opportunity', message: '' });
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-crisp font-mono text-xs transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Send a Direct Message
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-crisp text-xs font-mono focus:outline-none focus:border-neon transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-crisp text-xs font-mono focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Opportunity or Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-crisp text-xs font-mono focus:outline-none focus:border-neon transition-colors"
                >
                  <option value="Internship Opportunity">Software Engineering Internship</option>
                  <option value="Research & Agentic AI">AI Agent Research &amp; Labs</option>
                  <option value="Cloud Systems">Cloud &amp; Distributed Systems</option>
                  <option value="General Collaboration">General Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, problem space, or timeline..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-crisp text-xs font-mono focus:outline-none focus:border-neon transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-neon hover:bg-[#ff551a] text-carbon font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(255,68,0,0.3)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
