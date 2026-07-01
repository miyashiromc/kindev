import { motion } from 'motion/react';
import { Globe, ShoppingCart, Smartphone, Cpu } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ScrollRevealText from './ScrollRevealText';

function GlowCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`group relative rounded-3xl overflow-hidden glass ${className}`}
    >
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(6,182,212,0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

export default function ServicesBento() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      id="servicios" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="snap-start w-full flex flex-col justify-center py-16 md:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-6 md:mb-8 md:text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-white">
            <ScrollRevealText text="Soluciones para tu Empresa" />
          </h2>
          <p className="text-slate-400 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-justify hyphens-auto">
            <ScrollRevealText text="Desarrollamos tecnología que se adapta a tus necesidades y a las de tus clientes, creando herramientas digitales que impulsan el crecimiento y optimizan procesos." />
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {/* Main big block - col-span-2 */}
          <motion.div variants={item} className="md:col-span-2">
            <GlowCard className="p-8 hover:border-kindev-emerald/30 transition-colors h-full">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-kindev-emerald/15 flex items-center justify-center mb-4 md:mb-5">
                <Globe className="text-kindev-emerald" size={26} />
              </div>
              <h3 className="text-[20px] font-display font-semibold mb-2 text-white">Páginas Web de Alto Impacto</h3>
              <p className="text-slate-400 font-normal max-w-md text-[15px] md:text-[16px] leading-[1.5] text-justify hyphens-auto">
                Diseñamos portales corporativos y landing pages enfocadas en conversión. 
                Creamos experiencias de usuario intuitivas con un diseño visual premium que refleja la calidad de tu marca y atrae nuevos clientes.
              </p>
            </GlowCard>
          </motion.div>

          {/* Top right block */}
          <motion.div variants={item}>
            <GlowCard className="p-8 hover:border-kindev-cyan/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-2xl bg-kindev-cyan/15 flex items-center justify-center mb-4 md:mb-5">
                <Smartphone className="text-kindev-cyan" size={24} />
              </div>
              <h3 className="text-[18px] font-display font-semibold mb-2 text-white">Aplicaciones Móviles</h3>
              <p className="text-slate-400 font-normal text-[14px] md:text-[15px] leading-[1.5] text-justify hyphens-auto">
                Lleva tu negocio al bolsillo de tus clientes con apps nativas o híbridas, diseñadas para ofrecer un rendimiento impecable en iOS y Android.
              </p>
            </GlowCard>
          </motion.div>

          {/* Bottom left block */}
          <motion.div variants={item}>
            <GlowCard className="p-8 hover:border-kindev-purple/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-2xl bg-kindev-purple/15 flex items-center justify-center mb-4 md:mb-5">
                <ShoppingCart className="text-kindev-purple" size={24} />
              </div>
              <h3 className="text-[18px] font-display font-semibold mb-2 text-white">E-Commerce Escalable</h3>
              <p className="text-slate-400 font-normal text-[14px] md:text-[15px] leading-[1.5] text-justify hyphens-auto">
                Tiendas online seguras y optimizadas para ventas, integrando pasarelas de pago y gestión de inventario sin complicaciones.
              </p>
            </GlowCard>
          </motion.div>

          {/* Bottom right block (spans 2) - DARK bg */}
          <motion.div variants={item} className="md:col-span-2 group relative p-8 rounded-3xl glass-dark text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all border hover:border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              <div className="max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 md:mb-5 border border-white/5">
                  <Cpu className="text-white" size={24} />
                </div>
                <h3 className="text-[20px] font-display font-semibold mb-2 text-white">Plataformas y Sistemas a Medida</h3>
                <p className="text-slate-300 font-normal text-[14px] md:text-[15px] leading-[1.5] text-justify hyphens-auto">
                  ¿Tienes un proceso complejo? Desarrollamos software web interno, paneles de administración y sistemas SaaS construidos específicamente para las reglas de tu negocio.
                </p>
              </div>
              
              <div className="hidden md:flex h-32 flex-1 items-center justify-end relative">
                <div className="absolute right-0 w-48 h-48 rounded-full group-hover:opacity-75 transition-opacity" style={{ background: 'radial-gradient(circle at center, rgba(6,182,212,0.2) 0%, transparent 60%)' }} />
                <div className="absolute right-20 bottom-10 w-32 h-32 rounded-full group-hover:opacity-75 transition-opacity" style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.2) 0%, transparent 60%)' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
