import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MorphingTextReveal } from './MorphingTextReveal';
import { useState, useEffect } from 'react';

// Custom Typewriter Hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setDisplayed(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeChar, speed);
      } else {
        setDone(true);
      }
    };

    timeout = setTimeout(typeChar, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypewriter("Nos alegra que estés aquí. El buen gusto siempre nos encuentra. Entonces, ¿qué vamos a construir hoy?");

  return (
    <motion.section 
      id="inicio" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="snap-start min-h-[85dvh] w-full relative flex flex-col items-center justify-center pt-28 pb-12 md:pt-32 md:pb-16 px-2 md:px-8 overflow-hidden"
    >
      <div className="container mx-auto px-1 sm:px-6 relative z-10 max-w-5xl flex flex-col items-center text-center">
        
        {/* Morphing Headline */}
        <span className="section-label text-kindev-cyan/70 mb-6 block">Digital Agency</span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[28px] sm:text-5xl md:text-6xl lg:text-[68px] font-display font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6 md:mb-8 text-white min-h-[110px] sm:min-h-0"
        >
          Transformamos tus ideas en <span className="block mt-1 sm:mt-2"><MorphingTextReveal texts={["soluciones digitales.", "experiencias únicas.", "sistemas escalables.", "aplicaciones móviles."]} className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#8b5cf6] to-[#4cd7f6]" /></span>
        </motion.h1>

        {/* Typewriter text replacing standard paragraph */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-slate-400 text-[18px] leading-[1.6] font-normal min-h-[130px] sm:min-h-[100px] md:min-h-[80px] mb-4 max-w-2xl md:mx-auto"
        >
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1em] bg-kindev-cyan align-middle ml-[2px] animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          )}
        </motion.div>

        {/* Action pill buttons with slide-up effect */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full mt-2 sm:mt-0"
        >
          <a href="#contacto" className="flex items-center justify-center bg-gradient-to-r from-kindev-cyan to-kindev-purple text-white rounded-full text-[15px] px-8 py-3.5 hover:opacity-90 transition-all duration-300 font-bold whitespace-nowrap w-full sm:w-auto glow-hover-primary shadow-lg shadow-kindev-cyan/20">
            Cuéntanos tu idea
          </a>
          <a href="#servicios" className="flex items-center justify-center bg-white/[0.05] border border-white/[0.1] text-slate-300 rounded-full text-[15px] px-5 py-3 hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-colors duration-200 shadow-sm font-semibold whitespace-nowrap w-full sm:w-auto">
            Ver servicios
          </a>
          <a href="#proyectos" className="flex items-center justify-center bg-white/[0.05] border border-white/[0.1] text-slate-300 rounded-full text-[15px] px-5 py-3 hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-colors duration-200 shadow-sm font-semibold whitespace-nowrap w-full sm:w-auto">
            Casos de éxito
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
