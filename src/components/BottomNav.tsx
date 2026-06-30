import { Sparkles, Layers, BriefcaseBusiness, BadgeDollarSign, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = ['home', 'servicios', 'proyectos', 'precios', 'contacto'];
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id === 'inicio' ? 'home' : entry.target.id;
        visibilityMap.set(id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let mostVisible = '';

      visibilityMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisible = id;
        }
      });

      if (maxRatio > 0 && mostVisible) {
        setActive(prev => mostVisible !== prev ? mostVisible : prev);
      }
    }, {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    });

    sections.forEach(section => {
      const elementId = section === 'home' ? 'inicio' : section;
      const element = document.getElementById(elementId);
      if (element) {
        observer.observe(element);
        visibilityMap.set(section, 0);
      }
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Sparkles, href: '#inicio' },
    { id: 'servicios', label: 'Servicios', icon: Layers, href: '#servicios' },
    { id: 'proyectos', label: 'Proyectos', icon: BriefcaseBusiness, href: '#proyectos' },
    { id: 'precios', label: 'Precios', icon: BadgeDollarSign, href: '#precios' },
    { id: 'contacto', label: 'Contacto', icon: Send, href: '#contacto' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full glass border-t border-white/10 pb-safe shadow-[0_-4px_20px_rgb(0,0,0,0.2)]">
      <div className="flex justify-around items-center px-2 py-1.5">
        {navItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              onClick={() => setActive(id)}
              className={`relative flex flex-col items-center justify-center w-[68px] h-[46px] gap-0.5 rounded-xl transition-colors z-10 ${
                isActive ? 'text-kindev-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavBubble"
                  className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.85 }}
                animate={{ y: isActive ? -2 : 0 }}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[9px] font-bold tracking-wide mt-0.5 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-80 scale-95'}`}>
                  {label}
                </span>
              </motion.div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
