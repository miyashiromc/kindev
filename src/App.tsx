import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Workflow from './components/Workflow';
import ContactTerminal from './components/ContactTerminal';
import BottomNav from './components/BottomNav';
import IntroAnimation from './components/IntroAnimation';
import AuroraBackground from './components/AuroraBackground';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  // Prevent scrolling while intro is playing
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
    <div className="h-screen w-full text-slate-200 font-sans selection:bg-kindev-cyan/30 overflow-hidden relative">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && <AuroraBackground />}
      
      <div className={`transition-opacity duration-1000 h-full w-full ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {!showIntro && <Navbar />}
        
        {/* Main scroll container: Free scroll on mobile, strict snap on desktop */}
        <main ref={mainRef} className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth snap-none md:snap-y md:snap-mandatory scroll-pt-20 md:scroll-pt-0">
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
