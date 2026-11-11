import React, { useState } from 'react';
import { AgentCursors } from './components/AgentCursors';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { BadgesAndSkills } from './components/BadgesAndSkills';
import { ExperienceAndAbout } from './components/ExperienceAndAbout';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Project } from './data/portfolioData';

export default function App() {
  const [agentsEnabled, setAgentsEnabled] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#060606] text-[#f5f5f5] selection:bg-neon selection:text-carbon font-sans overflow-x-hidden">
      {/* 1. Live Autonomous AI Agent Cursors Layer */}
      <AgentCursors enabled={agentsEnabled} />

      {/* 2. Floating Pill Top Navigation Bar */}
      <Navigation
        agentsEnabled={agentsEnabled}
        onToggleAgents={() => setAgentsEnabled(prev => !prev)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* 3. Main Page Content */}
      <main className="relative z-10">
        {/* Section 0: Hero Stage with Layered Typography & Portrait Cutout */}
        <Hero />

        {/* Section 1: Engineered Works & Bento Showcase */}
        <ProjectShowcase onSelectProject={project => setSelectedProject(project)} />

        {/* Section 2: Interactive Experimental Bench (Pipeline Runner & Terminal CLI) */}
        <InteractiveWorkbench />

        {/* Section 3: Verified Badges & Technical Stack Competencies */}
        <BadgesAndSkills />

        {/* Section 4: Academic Journey & Engineering Philosophy */}
        <ExperienceAndAbout />

        {/* Section 5: Contact, 1-Click Email & Network Profiles */}
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
