import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/kindev-logo.png" 
              alt="Kindev Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if logo not yet uploaded
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">Kindev</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-700">
          <a href="#servicios" className="hover:text-kindev-cyan transition-colors">Servicios</a>
          <a href="#proyectos" className="hover:text-kindev-cyan transition-colors">Proyectos</a>
          <a href="#precios" className="hover:text-kindev-cyan transition-colors">Precios</a>
          <a href="#flujo" className="hover:text-kindev-cyan transition-colors">Cómo trabajamos</a>
        </div>
        
        <div className="hidden md:block">
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 text-[15px] font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            Iniciar proyecto
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 top-[72px] bg-white border-b border-slate-200 md:hidden flex flex-col items-center py-8 gap-6 shadow-xl"
          >
            <a href="#servicios" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-kindev-cyan transition-colors">Servicios</a>
            <a href="#proyectos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-kindev-cyan transition-colors">Proyectos</a>
            <a href="#precios" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-kindev-cyan transition-colors">Precios</a>
            <a href="#flujo" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-700 hover:text-kindev-cyan transition-colors">Cómo trabajamos</a>
            
            <button 
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 px-8 py-3 text-[15px] font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              Iniciar proyecto
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
