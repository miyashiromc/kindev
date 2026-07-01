import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ExternalLink, Smartphone, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ScrollRevealText from './ScrollRevealText';

const projects = [
  {
    name: "Kargox",
    description: "\"Si no lo tenemos, lo conseguimos\". Plataforma que permite a los usuarios cotizar y adquirir productos de tiendas internacionales como Amazon o Temu de forma fácil y segura, con app móvil Android y panel web.",
    url: "https://kargox-ec.web.app/",
    tags: ["E-commerce", "Importaciones", "App Nativa"],
    color: "from-blue-600 to-indigo-700",
    letter: "K",
    logo: "/assets/logos/kargox-logo.png",
    screenshot: "/assets/kargox.png"
  },
  {
    name: "UniGuru",
    description: "\"Transformamos Retos Académicos en Éxitos\". Plataforma que conecta estudiantes con expertos a través de un sistema Kanban de solicitudes, chat en vivo y validación de pagos seguros.",
    url: "https://unigurutz.web.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.uniguru.app",
    tags: ["EdTech", "Tiempo Real", "Pagos"],
    color: "from-kindev-emerald to-teal-700",
    letter: "U",
    logo: "/assets/logos/uniguru-logo.png",
    screenshot: "/assets/uniguru.png"
  },
  {
    name: "Prisma",
    description: "Plataforma integral para la gestión y control de procesos. Optimiza la administración de tu negocio con herramientas avanzadas y una interfaz intuitiva.",
    url: "https://prisma-sf.web.app",
    tags: ["Gestión", "SaaS", "Dashboard"],
    color: "from-purple-600 to-indigo-900",
    letter: "P",
    logo: "/assets/logos/prisma-logo.png",
    screenshot: "/assets/prisma.png"
  }
];

export default function Portfolio() {
  const [isReady, setIsReady] = useState(false);
  const scrollContainerRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      scrollContainerRef.current = main;
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return <section id="proyectos" className="snap-start min-h-[100dvh] w-full" />;
  }

  return <PortfolioContent scrollContainerRef={scrollContainerRef} />;
}

function ProjectCard({ project }: { project: any; key?: string }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="relative group bg-slate-900/50 rounded-[32px] hover:shadow-xl transition-colors duration-300 cursor-pointer overflow-hidden border border-transparent hover:border-white/10 w-[85vw] md:w-[28rem] lg:w-[36rem] xl:w-[40rem] aspect-[4/3] flex-shrink-0"
      onClick={() => setShowOverlay(true)}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Background Screenshot - fully visible by default */}
      {project.screenshot && (
        <img 
          src={project.screenshot} 
          alt={`${project.name} Screenshot`} 
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 pointer-events-none z-0" 
        />
      )}

      {/* Interactive Overlay containing ALL info */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-10"
            onClick={(e) => {
               if (e.target === e.currentTarget) {
                 e.stopPropagation();
                 setShowOverlay(false);
               }
            }}
          >
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setShowOverlay(false); }} 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white p-1 z-30 bg-slate-900/50 rounded-full lg:bg-transparent"
            >
              <X size={20} className="lg:w-6 lg:h-6" />
            </button>

            {/* Top: Info */}
            <div>
              <div className="flex flex-row lg:flex-col items-start gap-3 lg:gap-4 mb-2 lg:mb-4 w-full">
                {/* Logo */}
                <div className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-lg lg:text-2xl font-bold text-white shadow-lg overflow-hidden`}>
                  {project.logo ? (
                    <img src={project.logo} alt={`${project.name} Logo`} className="w-full h-full object-contain bg-white/10 backdrop-blur-md p-1 rounded-xl" />
                  ) : (
                    project.letter
                  )}
                </div>
                
                {/* Text Content */}
                <div className="flex-1 min-w-0 pt-0.5 lg:pt-0 w-full pr-8 lg:pr-12">
                  <h3 className="text-base sm:text-lg lg:text-[28px] font-display font-bold text-white leading-tight truncate lg:whitespace-normal mb-0.5 lg:mb-2">{project.name}</h3>
                  <p className="text-slate-300 font-normal text-[11px] sm:text-xs lg:text-[16px] leading-[1.4] lg:leading-[1.6] text-justify hyphens-auto line-clamp-3 lg:line-clamp-none">
                    {project.description}
                  </p>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-0 lg:mb-2 mt-2 lg:mt-4">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 lg:px-3 lg:py-1 bg-white/[0.06] border border-white/[0.1] rounded-md font-mono text-[9px] lg:text-[11px] uppercase tracking-widest text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: Links */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 lg:py-4 bg-white text-slate-900 font-bold rounded-xl text-center flex items-center justify-center gap-1.5 lg:gap-2 hover:scale-[1.02] transition-transform text-xs sm:text-sm lg:text-base"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="lg:w-[18px] lg:h-[18px]" />
                Página Web
              </a>
              
              {project.playStoreUrl ? (
                <a 
                  href={project.playStoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 lg:py-4 bg-gradient-to-r from-kindev-cyan to-kindev-emerald text-white font-bold rounded-xl text-center flex items-center justify-center gap-1.5 lg:gap-2 hover:scale-[1.02] transition-transform text-xs sm:text-sm lg:text-base"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Smartphone size={16} className="lg:w-[18px] lg:h-[18px]" />
                  App Móvil (Android)
                </a>
              ) : (
                <div className="w-full py-2.5 lg:py-4 bg-slate-800 text-slate-400 font-bold rounded-xl text-center flex items-center justify-center gap-1.5 lg:gap-2 border border-slate-700 cursor-not-allowed text-xs sm:text-sm lg:text-base">
                  <Smartphone size={16} className="lg:w-[18px] lg:h-[18px]" />
                  Próximamente App
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Header() {
  return null; // Header is now inlined inside PortfolioContent for scroll-linked animation
}

function PortfolioContent({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const carouselContainerRef = React.useRef<HTMLDivElement>(null);
  const [slideDistance, setSlideDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Kept for scale adjustments

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      if (carouselContainerRef.current) {
        // Calculate how much we need to slide to see the last card
        // We want the right edge of the last card to reach the right edge of the screen (minus padding)
        const scrollWidth = carouselContainerRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        // The distance to slide is the difference, plus a little extra padding
        setSlideDistance(Math.max(0, scrollWidth - clientWidth + (window.innerWidth < 768 ? 32 : 64))); 
      } else {
        setSlideDistance(0);
      }
    };
    update();
    // Use a slight delay on mount to ensure layout is calculated
    setTimeout(update, 100);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Desktop: h-[400vh], flattens over first 100vh [0, 0.25], then slides [0.3, 1].
  // Mobile: h-auto (native vertical flow), flattens quickly over the first part of scroll.
  const flattenEnd = isMobile ? 0.3 : 0.25;

  const rotateX = useTransform(scrollYProgress, [0, flattenEnd], [25, 0], { clamp: true });
  const brightnessVal = useTransform(scrollYProgress, [0, flattenEnd], [0.4, 1], { clamp: true });
  const rotateZ = useTransform(scrollYProgress, [0, flattenEnd], [isMobile ? 10 : 15, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, flattenEnd], [isMobile ? 0.85 : 0.7, 1], { clamp: true });
  const cardsFilter = useTransform(brightnessVal, (v) => `brightness(${v})`);

  const headerOpacity = useTransform(scrollYProgress, [0, flattenEnd * 0.7, 1], [1, isMobile ? 1 : 0, isMobile ? 1 : 0]);
  const headerY = useTransform(scrollYProgress, [0, flattenEnd * 0.7, 1], [0, isMobile ? 0 : -20, isMobile ? 0 : -20]);

  // Desktop uses a hard translation
  const carouselX = useTransform(
    scrollYProgress,
    [0.3, 1],
    [0, -slideDistance]
  );

  // Mobile uses native scroll exclusively, no vertical sync to avoid fighting the user's manual swipes.

  const pointerEvents = useTransform(scrollYProgress, (v) => v >= flattenEnd ? "auto" : "none");

  return (
    <section 
      ref={ref}
      id="proyectos" 
      className="h-auto md:h-[400vh] w-full relative"
    >
      <div className="relative md:sticky top-0 min-h-fit md:h-screen pt-24 md:pt-0 pb-10 md:pb-0 w-full overflow-visible md:overflow-hidden antialiased flex flex-col justify-start items-center [perspective:1000px] [transform-style:preserve-3d]">
        {/* Header: overlays the tilted cards, fades away as they flatten */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="max-w-7xl sticky md:absolute mx-auto px-4 w-full left-0 right-0 top-[80px] md:top-0 md:mt-0 pt-4 pb-4 md:pt-32 z-30 pointer-events-none bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 md:border-none md:bg-transparent md:backdrop-blur-none"
        >
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 md:mb-6">
            <ScrollRevealText text="Nuestros Proyectos" />
          </h2>
          <p className="max-w-2xl text-base md:text-xl text-slate-400 font-normal leading-[1.6]">
            <ScrollRevealText text="Proyectos reales donde nuestra tecnología ha sido clave para el crecimiento empresarial." />
          </p>
        </motion.div>

        {/* Cards with 3D effect */}
        <motion.div
          style={{
            rotateX,
            rotateZ,
            filter: cardsFilter,
            scale,
            pointerEvents,
            transformOrigin: isMobile ? "center center" : "25% top",
            willChange: "transform"
          }}
          className="w-full flex justify-start items-center pt-8 md:pt-[280px]"
        >
          <motion.div 
            style={{ x: isMobile ? 0 : carouselX }}
            ref={carouselContainerRef}
            className="flex flex-col md:flex-row gap-6 xl:gap-16 px-4 md:px-0 w-full items-center md:justify-start pb-8"
          >
            {projects.map((project) => (
              <div key={project.name} className="snap-center flex-shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
