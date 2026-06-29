import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Workflow from './components/Workflow';
import ContactTerminal from './components/ContactTerminal';

export default function App() {
  return (
    <div className="min-h-screen bg-kindev-bg text-kindev-dark font-sans selection:bg-kindev-cyan/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ServicesBento />
        <Portfolio />
        <Pricing />
        <Workflow />
        <ContactTerminal />
      </main>
    </div>
  );
}
