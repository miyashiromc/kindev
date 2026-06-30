import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CanvasLogoReveal from './CanvasLogoReveal';

export default function StickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this component's tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Logo animations
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Text block 1: "Análisis"
  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2, 0.35], [50, 0, -50]);

  // Text block 2: "Desarrollo"
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.65], [50, 0, -50]);

  // Text block 3: "Lanzamiento"
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [50, 0, -50]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Central Graphic (Logo with Glow) */}
        <motion.div 
          style={{ scale: logoScale, opacity: logoOpacity, rotate: logoRotate, willChange: "transform, opacity" }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10">
            {/* GPU-accelerated glow instead of box-shadow */}
            <div className="absolute inset-0 -z-10 scale-[2.5]" style={{ background: 'radial-gradient(circle at center, rgba(6,182,212,0.2) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)' }} />
            <div className="scale-150">
              <CanvasLogoReveal />
            </div>
          </div>
        </motion.div>

        {/* Floating Texts */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 h-full pointer-events-none">
          
          {/* Text 1 */}
          <motion.div 
            style={{ opacity: text1Opacity, y: text1Y, willChange: "transform, opacity" }}
            className="absolute left-6 md:left-12 top-1/3 md:top-1/4 max-w-sm"
          >
            <h3 className="text-3xl font-display font-bold text-white mb-2">Estrategia y Análisis</h3>
            <p className="text-slate-400 text-lg">Entendemos tus objetivos de negocio para diseñar la arquitectura perfecta antes de escribir una sola línea de código.</p>
          </motion.div>

          {/* Text 2 */}
          <motion.div 
            style={{ opacity: text2Opacity, y: text2Y, willChange: "transform, opacity" }}
            className="absolute right-6 md:right-12 top-1/2 md:top-1/2 -translate-y-1/2 max-w-sm text-right"
          >
            <h3 className="text-3xl font-display font-bold text-white mb-2">Desarrollo Vanguardista</h3>
            <p className="text-slate-400 text-lg">Implementamos tecnologías modernas con código limpio, escalable y optimizado para el más alto rendimiento.</p>
          </motion.div>

          {/* Text 3 */}
          <motion.div 
            style={{ opacity: text3Opacity, y: text3Y, willChange: "transform, opacity" }}
            className="absolute left-6 md:left-12 bottom-1/3 md:bottom-1/4 max-w-sm"
          >
            <h3 className="text-3xl font-display font-bold text-white mb-2">Lanzamiento Exitoso</h3>
            <p className="text-slate-400 text-lg">Desplegamos tu proyecto en infraestructura en la nube de nivel empresarial, listo para escalar y recibir usuarios.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
