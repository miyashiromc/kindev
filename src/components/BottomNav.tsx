import { Home, Grid, FolderOpen, Tag, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    { id: 'home', label: 'Inicio', icon: Home, href: '#' },
    { id: 'servicios', label: 'Servicios', icon: Grid, href: '#servicios' },
    { id: 'proyectos', label: 'Proyectos', icon: FolderOpen, href: '#proyectos' },
    { id: 'precios', label: 'Precios', icon: Tag, href: '#precios' },
    { id: 'contacto', label: 'Contacto', icon: MessageSquare, href: '#contacto' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href}
            onClick={() => setActive(id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              active === id ? 'text-kindev-cyan' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon size={20} strokeWidth={active === id ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
