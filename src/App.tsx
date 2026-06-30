import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Workflow from './components/Workflow';
import ContactTerminal from './components/ContactTerminal';
import BottomNav from './components/BottomNav';
import IntroAnimation from './components/IntroAnimation';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Optional: Prevent scrolling while intro is playing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-kindev-bg text-kindev-dark font-sans selection:bg-kindev-cyan/30 overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <main className="pb-16 md:pb-0">
          <Hero />
          <ServicesBento />
          <Portfolio />
          <Pricing />
          <Workflow />
          <ContactTerminal />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
