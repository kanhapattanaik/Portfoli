import React, { useState, ChangeEvent } from 'react';
import { ArrowRight, Terminal, Upload, Sparkles, RefreshCw } from 'lucide-react';
import { PORTFOLIO_HERO } from '../data/portfolioData';

const DEFAULT_PORTRAIT = '/src/assets/images/hero_kanha_portrait_1794373200960.jpg';

export const Hero: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(DEFAULT_PORTRAIT);
  const [isBW, setIsBW] = useState<boolean>(true);
  const [isCutoutShape, setIsCutoutShape] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1.0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoSrc(reader.result);
        showNotice('Custom portrait loaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const showNotice = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleResetPhoto = () => {
    setPhotoSrc(DEFAULT_PORTRAIT);
    setIsBW(true);
    setIsCutoutShape(true);
    setZoom(1.0);
    setOffsetY(0);
    showNotice('Reset to studio default');
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto flex flex-col justify-between overflow-hidden"
    >
      {/* Toast Notice */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] text-crisp border border-neon/50 px-4 py-2 rounded-lg font-mono text-xs shadow-xl animate-bounce">
          {copiedNotification}
        </div>
      )}

      {/* Hero Content Stage */}
      <div className="relative w-full my-auto pt-2 sm:pt-4">
        {/* Layer 1: Giant Full-Width PORTFOLIO Text */}
        <div className="relative z-[1] w-full flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <h1 className="hero-portfolio-title text-center w-full">PORTFOLIO</h1>
        </div>

        {/* Layer 2: 3-Column Overlap Grid */}
        <div className="relative z-[2] -mt-6 sm:-mt-14 md:-mt-20 lg:-mt-28 xl:-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Left Column: Bio & Greeting (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 order-2 lg:order-1 relative z-20">
            <div>
              <p className="font-serif-italic italic text-crisp text-xl sm:text-2xl tracking-wide mb-1 drop-shadow">
                Hello, I&apos;m
              </p>
              <h2 className="font-display-tight text-crisp text-[3.8rem] sm:text-[5.2rem] xl:text-[6rem] leading-[0.88] drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]">
                KANHA<br />
                PATTANAIK<span className="text-neon">.</span>
              </h2>
            </div>

            <div>
              <h3 className="font-display-tight text-neon leading-[0.94] text-2xl sm:text-3xl lg:text-4xl">
                SOFTWARE ENGINEER<br />
                &amp; AI BUILDER
              </h3>
            </div>

            <p className="text-muted text-sm sm:text-[15px] leading-[1.65] max-w-[440px]">
              {PORTFOLIO_HERO.bio}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-neon hover:bg-[#ff551a] text-carbon font-mono font-bold text-xs uppercase tracking-[0.14em] px-6 py-3.5 transition-all shadow-[0_0_25px_rgba(255,68,0,0.35)]"
              >
                <span>VIEW WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#lab"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-neon bg-white/5 text-crisp hover:text-neon font-mono text-xs uppercase tracking-wider px-5 py-3.5 transition-colors"
              >
                <Terminal className="w-4 h-4 text-neon" />
                <span>LAUNCH LIVE LAB</span>
              </a>
            </div>

            {/* Location & Status Meta */}
            <div className="pt-2">
              <p className="mono-label text-muted text-[10px] sm:text-[11px] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon inline-block shadow-[0_0_8px_#ff4400]" />
                <span>BASED IN ODISHA, INDIA</span>
                <span aria-hidden="true">·</span>
                <span className="text-crisp/80 font-medium">OPEN TO INTERNSHIPS</span>
              </p>
            </div>
          </div>

          {/* Center Column: Portrait Cutout with Live Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-end relative order-1 lg:order-2 z-10">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[390px] sm:h-[460px] lg:h-[510px] flex items-end justify-center group select-none">
              {/* Warm Rim Glow */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-neon/20 blur-[75px] pointer-events-none" />

              {/* Cutout Image Container */}
              <div
                className={`relative w-full h-full flex items-end justify-center overflow-hidden ${
                  isCutoutShape ? 'portrait-cutout-mask' : 'rounded-t-2xl'
                }`}
              >
                <img
                  id="hero-portrait-img"
                  src={photoSrc}
                  alt="Kanha Pattanaik — Software Engineer & AI Builder"
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `translate(0px, ${offsetY}px) scale(${zoom})`,
                    filter: isBW
                      ? 'grayscale(100%) contrast(115%) brightness(95%)'
                      : 'contrast(105%) brightness(100%)'
                  }}
                  className={`w-[85%] sm:w-[88%] h-[96%] object-cover object-top ${
                    isCutoutShape ? 'rounded-t-full' : 'rounded-t-2xl'
                  } border-t-2 border-x border-neon/30 shadow-[0_-15px_50px_rgba(255,68,0,0.18)] transition-transform duration-150`}
                />
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060606] via-[#060606]/90 to-transparent pointer-events-none" />

              {/* Floating Customizer Bar */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0c0c]/95 border border-white/15 opacity-90 sm:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shadow-2xl backdrop-blur-md">
                {/* Upload Custom Headshot */}
                <label
                  htmlFor="portrait-upload"
                  className="cursor-pointer px-2.5 py-1 rounded-full bg-neon text-carbon font-mono font-bold text-[10px] uppercase tracking-wider hover:bg-[#ff571a] transition-colors flex items-center gap-1 whitespace-nowrap"
                  title="Upload custom portrait file"
                >
                  <Upload className="w-3 h-3" />
                  <span>Custom</span>
                  <input
                    id="portrait-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {/* B&W / Color Switch */}
                <button
                  type="button"
                  onClick={() => setIsBW(!isBW)}
                  title="Toggle Black & White or Full Color"
                  className={`px-2 py-1 rounded-full text-crisp font-mono text-[10px] uppercase whitespace-nowrap transition-colors ${
                    isBW ? 'bg-white/10 hover:bg-white/20' : 'bg-neon/20 text-neon border border-neon/40'
                  }`}
                >
                  {isBW ? 'B&W' : 'Color'}
                </button>

                {/* Frame Style Toggle */}
                <button
                  type="button"
                  onClick={() => setIsCutoutShape(!isCutoutShape)}
                  title="Switch between Arch Cutout or Squared Frame"
                  className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-crisp font-mono text-[10px] uppercase whitespace-nowrap"
                >
                  {isCutoutShape ? 'Arch' : 'Card'}
                </button>

                {/* Zoom Controls */}
                <button
                  type="button"
                  onClick={() => setZoom(z => Math.min(1.5, +(z + 0.1).toFixed(1)))}
                  title="Zoom In"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-crisp font-mono text-xs flex items-center justify-center"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(z => Math.max(0.7, +(z - 0.1).toFixed(1)))}
                  title="Zoom Out"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-crisp font-mono text-xs flex items-center justify-center"
                >
                  -
                </button>

                {/* Vertical Pan */}
                <button
                  type="button"
                  onClick={() => setOffsetY(y => y - 10)}
                  title="Move Photo Up"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-crisp font-mono text-[10px] flex items-center justify-center"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => setOffsetY(y => y + 10)}
                  title="Move Photo Down"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-crisp font-mono text-[10px] flex items-center justify-center"
                >
                  ↓
                </button>

                {/* Reset to defaults */}
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  title="Reset portrait to original state"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-crisp text-[10px] flex items-center justify-center"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics Stack (2 Cols) */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-end items-start lg:items-end gap-6 lg:gap-8 order-3 border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0 relative z-20">
            {PORTFOLIO_HERO.stats.map(stat => (
              <div key={stat.label} className="text-left lg:text-right">
                <div className="font-display-tight text-neon text-4xl sm:text-5xl lg:text-6xl leading-none">
                  {stat.value}
                </div>
                <div className="mono-label text-muted mt-1 text-[10px] sm:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Ticker Section Divider */}
      <div className="w-full mt-12 sm:mt-16 pt-6 border-t border-white/10 overflow-hidden">
        <div className="marquee-track flex items-center gap-8 text-xs font-mono text-muted uppercase tracking-[0.2em]">
          <span>AUTONOMOUS AGENTS</span>
          <span className="text-neon">✦</span>
          <span>DISTRIBUTED PIPELINES</span>
          <span className="text-neon">✦</span>
          <span>EDGE COMPUTER VISION</span>
          <span className="text-neon">✦</span>
          <span>KUBERNETES &amp; CLOUD ARCHITECTURE</span>
          <span className="text-neon">✦</span>
          <span>VECTOR RETRIEVAL</span>
          <span className="text-neon">✦</span>
          <span>REAL-TIME WEBRTC STREAMING</span>
          <span className="text-neon">✦</span>
          <span>AUTONOMOUS AGENTS</span>
          <span className="text-neon">✦</span>
          <span>DISTRIBUTED PIPELINES</span>
          <span className="text-neon">✦</span>
          <span>EDGE COMPUTER VISION</span>
          <span className="text-neon">✦</span>
          <span>KUBERNETES &amp; CLOUD ARCHITECTURE</span>
          <span className="text-neon">✦</span>
          <span>VECTOR RETRIEVAL</span>
          <span className="text-neon">✦</span>
          <span>REAL-TIME WEBRTC STREAMING</span>
          <span className="text-neon">✦</span>
        </div>
      </div>
    </section>
  );
};
