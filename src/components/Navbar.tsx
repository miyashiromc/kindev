import { motion } from 'motion/react';

export default function Navbar() {

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
            <img 
              src="/kindev-logo.png" 
              alt="Kindev Logo" 
              className="w-full h-full object-contain scale-[1.3]"
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

      </motion.nav>
    </>
  );
}
