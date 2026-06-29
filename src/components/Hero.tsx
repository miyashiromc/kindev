import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MorphingTextReveal } from './MorphingTextReveal';
import { useState, useEffect, useRef } from 'react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const prevXRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || isNaN(video.duration)) return;
      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const sensitivity = 0.8;
      const deltaSeconds = (delta / window.innerWidth) * sensitivity * video.duration;

      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + deltaSeconds));

      if (!isSeekingRef.current) {
        performSeek();
      }
    };

    const performSeek = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        performSeek();
      }
    };

    const handleInitialMouse = (e: MouseEvent) => {
      prevXRef.current = e.clientX;
      window.addEventListener('mousemove', handleMouseMove);
    };
    
    window.addEventListener('mousemove', handleInitialMouse, { once: true });
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const { displayed, done } = useTypewriter("Nos alegra que estés aquí. El buen gusto siempre nos encuentra. Entonces, ¿qué vamos a construir hoy?");

  return (
    <section className="relative md:min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-8 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Video Background with Scrubbing Effect */}
      <div className="fixed inset-0 -z-20">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
          className="w-full h-full object-cover object-[70%_center]"
          muted
          playsInline
          preload="auto"
        />
      </div>
      {/* Soft Overlay to match Kindev style and ensure text readability */}
      <div className="fixed inset-0 bg-white/85 backdrop-blur-[4px] -z-10" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl flex flex-col items-start md:items-center text-justify hyphens-auto">
        
        {/* Morphing Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[32px] sm:text-5xl md:text-6xl lg:text-[68px] font-display font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6 md:mb-8 text-slate-900"
        >
          Transformamos tus ideas en <MorphingTextReveal texts={["soluciones digitales.", "experiencias únicas.", "sistemas escalables.", "aplicaciones móviles."]} className="text-transparent bg-clip-text bg-gradient-to-r from-kindev-cyan via-kindev-emerald to-kindev-purple" />
        </motion.h1>

        {/* Typewriter text replacing standard paragraph */}
        <div className="text-slate-700 text-[18px] leading-[1.6] font-normal min-h-[140px] sm:min-h-[100px] md:min-h-[80px] mb-10 max-w-2xl md:mx-auto">
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1em] bg-slate-800 align-middle ml-[2px] animate-pulse" />
          )}
        </div>

        {/* Action pill buttons with slide-up effect */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2 md:justify-center w-full"
        >
          <a href="#contacto" className="inline-flex items-center justify-center bg-white text-slate-800 border border-slate-200 rounded-full text-[15px] px-5 py-2.5 hover:bg-slate-900 hover:text-white transition-colors duration-200 shadow-sm font-semibold whitespace-nowrap">
            Cuéntanos tu idea
          </a>
          <a href="#servicios" className="inline-flex items-center justify-center bg-white text-slate-800 border border-slate-200 rounded-full text-[15px] px-5 py-2.5 hover:bg-slate-900 hover:text-white transition-colors duration-200 shadow-sm font-semibold whitespace-nowrap">
            Ver servicios
          </a>
          <a href="#proyectos" className="inline-flex items-center justify-center bg-white text-slate-800 border border-slate-200 rounded-full text-[15px] px-5 py-2.5 hover:bg-slate-900 hover:text-white transition-colors duration-200 shadow-sm font-semibold whitespace-nowrap">
            Casos de éxito
          </a>
        </motion.div>
      </div>
    </section>
  );
}
