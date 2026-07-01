import { motion } from 'motion/react';
import ScrollRevealText from './ScrollRevealText';

export default function Pricing() {
  return (
    <motion.section 
      id="precios" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="snap-start w-full flex flex-col items-center justify-center py-16 md:py-24 relative overflow-hidden"
    >
      <div className="mb-16 md:mb-24 md:text-center z-10 px-6 relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
          <ScrollRevealText text="Inversión Transparente" />
        </h2>
        <p className="text-slate-400 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-center md:text-center hyphens-auto">
          <ScrollRevealText text="Precios claros para soluciones que impulsan tu negocio. Sin costos ocultos." />
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row max-w-7xl mx-auto px-6 w-full">
        {/* Plataformas Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="order-2 md:order-1 relative z-10 w-full md:w-72 rounded-2xl glass border border-white/[0.08] px-8 py-10 shadow-sm transition-transform hover:scale-105 md:-rotate-6 hover:border-white/[0.15]"
        >
          <div className="mb-2 text-[20px] font-display font-bold text-white">Plataformas</div>
          <div className="mb-4 text-[40px] font-mono tracking-tighter font-bold text-white">
            <span className="text-[20px] font-sans text-slate-500 font-medium mr-1">desde</span>$400
          </div>
          <p className="text-sm text-slate-500 mb-6 text-justify hyphens-auto">Sistemas a medida para tu negocio.</p>
          <ul className="mb-8 space-y-3 text-[15px] font-normal text-slate-300">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Base de Datos y Backend</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Panel de Administración</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Autenticación de Usuarios</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Lógica de Negocio</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20cotizar%20una%20plataforma%20a%20medida" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl border border-white/[0.1] bg-white/[0.05] py-3 font-semibold text-[15px] text-slate-300 hover:bg-white/[0.1] hover:text-white transition">
            Cotizar Plataforma
          </a>
        </motion.div>

        {/* Web Básica Card (Floating) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.7 }}
          className="order-1 md:order-2 relative z-20 w-full md:w-80 md:-mt-8 md:scale-110 rounded-3xl border border-kindev-cyan/30 glass-dark px-8 md:px-10 py-12 md:py-14 text-white shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-transform hover:scale-[1.12]"
        >
          <motion.div
            animate={{ y: [10, 6, 10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-kindev-cyan to-kindev-emerald px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] whitespace-nowrap"
          >
            Más Popular
          </motion.div>
          <div className="mb-2 text-[20px] font-display font-bold text-kindev-cyan">Página Web</div>
          <div className="mb-2 text-[48px] font-mono tracking-tighter font-bold">$120</div>
          <p className="text-sm text-slate-400 mb-6 text-justify hyphens-auto">Pago único. Ideal para presencia digital.</p>
          <ul className="mb-8 space-y-3 text-[15px] font-normal text-slate-200">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Landing Page (One Page)</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Diseño Responsivo</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Botón de WhatsApp</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Formulario de Contacto</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20el%20plan%20de%20P%C3%A1gina%20Web%20B%C3%A1sica" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl bg-gradient-to-r from-kindev-cyan to-kindev-emerald py-3 font-semibold text-[15px] text-white hover:opacity-90 transition shadow-lg shadow-kindev-cyan/20">
            Elegir Plan
          </a>
        </motion.div>

        {/* Enterprise Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.5, delay: 0.4 }}
          className="order-3 relative z-10 w-full md:w-72 rounded-2xl glass border border-white/[0.08] px-8 py-10 shadow-sm transition-transform hover:scale-105 md:rotate-6 hover:border-white/[0.15]"
        >
          <div className="mb-2 text-[20px] font-display font-bold text-white">App Móvil</div>
          <div className="mb-4 text-[24px] font-mono font-bold text-white mt-2">
            A Medida
          </div>
          <div className="mb-6 h-[1px] w-full bg-white/10"></div>
          <ul className="mb-8 space-y-4 text-left text-[15px] font-normal text-slate-300">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Apps Nativas</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Rendimiento Óptimo</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Diseño UX/UI</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Publicación en Tiendas</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20cotizar%20una%20app%20móvil" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl border border-white/[0.1] bg-white/[0.05] py-3 font-semibold text-[15px] text-slate-300 hover:bg-white/[0.1] hover:text-white transition">
            Cotizar App
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
