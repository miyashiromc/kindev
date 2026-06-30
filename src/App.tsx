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
    <div className="h-screen w-full bg-kindev-bg text-kindev-dark font-sans selection:bg-kindev-cyan/30 overflow-hidden relative">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {/* 
        This is the main scroll container. 
        It takes the full screen height and snaps its children. 
      */}
      <div className={`transition-opacity duration-1000 h-full w-full ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar />
        
        {/* This is the main scroll container. It takes the full screen height and snaps its children. */}
        <main className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
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
