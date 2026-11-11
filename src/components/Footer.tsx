import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#060606] py-12 px-4 sm:px-8 lg:px-12 text-xs font-mono text-muted">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display-tight text-lg text-crisp tracking-tight">
            KANHA PATTANAIK
          </span>
          <span aria-hidden="true">·</span>
          <span>ODISHA, INDIA</span>
        </div>

        <div className="text-center sm:text-right flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} KANHA PATTANAIK. ALL RIGHTS RESERVED.</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-muted hover:text-crisp flex items-center justify-center transition-colors shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
