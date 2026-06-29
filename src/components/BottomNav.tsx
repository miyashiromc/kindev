import { Sparkles, Layers, BriefcaseBusiness, BadgeDollarSign, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'servicios', 'proyectos', 'precios', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section === 'home' ? 'root' : section);
        if (element && element.offsetTop <= scrollPosition) {
          setActive(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Sparkles, href: '#' },
    { id: 'servicios', label: 'Servicios', icon: Layers, href: '#servicios' },
    { id: 'proyectos', label: 'Proyectos', icon: BriefcaseBusiness, href: '#proyectos' },
    { id: 'precios', label: 'Precios', icon: BadgeDollarSign, href: '#precios' },
    { id: 'contacto', label: 'Contacto', icon: Send, href: '#contacto' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 pb-safe shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              onClick={() => setActive(id)}
              className={`relative flex flex-col items-center justify-center w-[72px] h-[52px] gap-1 rounded-2xl transition-colors z-10 ${
                isActive ? 'text-kindev-cyan' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavBubble"
                  className="absolute inset-0 bg-slate-100/90 rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.85 }}
                animate={{ y: isActive ? -2 : 0 }}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[9px] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-80 scale-95'}`}>
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
