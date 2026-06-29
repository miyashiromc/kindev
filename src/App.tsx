import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Workflow from './components/Workflow';
import ContactTerminal from './components/ContactTerminal';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <div className="min-h-screen bg-kindev-bg text-kindev-dark font-sans selection:bg-kindev-cyan/30 overflow-x-hidden">
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
  );
}
