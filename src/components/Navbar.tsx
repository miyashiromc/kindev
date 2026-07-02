import { motion } from 'motion/react';
import CanvasLogoReveal from './CanvasLogoReveal';

export default function Navbar() {

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-0.5 md:py-2 glass-nav border-b-0"
      >
        <CanvasLogoReveal />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-300">
          <a href="#servicios" className="hover:text-kindev-cyan transition-colors duration-300">Servicios</a>
          <a href="#proyectos" className="hover:text-kindev-cyan transition-colors duration-300">Proyectos</a>
          <a href="#precios" className="hover:text-kindev-cyan transition-colors duration-300">Precios</a>
          <a href="#flujo" className="hover:text-kindev-cyan transition-colors duration-300">Cómo trabajamos</a>
        </div>
        
        <div className="hidden md:block">
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 text-[15px] font-bold rounded-full bg-gradient-to-r from-kindev-cyan to-kindev-purple text-white hover:opacity-90 transition-all glow-hover-primary"
          >
            Iniciar proyecto
          </button>
        </div>

      </motion.nav>
    </>
  );
}
