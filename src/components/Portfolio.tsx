import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Smartphone, X } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    name: "Kargox",
    description: "\"Si no lo tenemos, lo conseguimos\". Plataforma que permite a los usuarios cotizar y adquirir productos de tiendas internacionales como Amazon o Temu de forma fácil y segura, con app móvil Android y panel web.",
    url: "https://kargox-ec.web.app/",
    tags: ["E-commerce", "Importaciones", "App Nativa"],
    color: "from-blue-600 to-indigo-700",
    letter: "K",
    logo: "/assets/logos/kargox-logo.png"
  },
  {
    name: "UniGuru",
    description: "\"Transformamos Retos Académicos en Éxitos\". Plataforma que conecta estudiantes con expertos a través de un sistema Kanban de solicitudes, chat en vivo y validación de pagos seguros.",
    url: "https://unigurutz.web.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.uniguru.app",
    tags: ["EdTech", "Tiempo Real", "Pagos"],
    color: "from-kindev-emerald to-teal-700",
    letter: "U",
    logo: "/assets/logos/uniguru-logo.png"
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden"
      onClick={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg overflow-hidden`}>
          {project.logo ? (
            <img src={project.logo} alt={`${project.name} Logo`} className="w-full h-full object-contain bg-white p-1" />
          ) : (
            project.letter
          )}
        </div>
        {/* We keep a visual hint that it's clickable, but it doesn't navigate on its own */}
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-kindev-cyan transition-colors border border-slate-200 group-hover:border-kindev-cyan">
          <ExternalLink size={18} />
        </div>
      </div>
      
      <h3 className="text-[22px] font-display font-bold mb-3 text-slate-900">{project.name}</h3>
      <p className="text-slate-700 font-normal text-[16px] leading-[1.6] mb-6 text-justify hyphens-auto">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-mono text-[12px] uppercase tracking-widest text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[14px] font-medium text-kindev-emerald bg-kindev-emerald/10 px-4 py-2.5 rounded-xl inline-flex">
        <Smartphone size={16} />
        <span>App Android Nativa</span>
      </div>

      {/* Interactive Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6"
            onClick={(e) => {
               // Close if clicking the overlay background itself
               if (e.target === e.currentTarget) {
                 e.stopPropagation();
                 setShowOverlay(false);
               }
            }}
          >
             <p className="text-white font-display font-bold text-xl mb-2">Visitar {project.name}</p>
             
             <a 
               href={project.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full max-w-[220px] py-3.5 bg-white text-slate-900 font-bold rounded-xl text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform"
               onClick={(e) => e.stopPropagation()}
             >
               <ExternalLink size={18} />
               Página Web
             </a>
             
             {project.playStoreUrl ? (
               <a 
                 href={project.playStoreUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full max-w-[220px] py-3.5 bg-gradient-to-r from-kindev-cyan to-kindev-emerald text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                 onClick={(e) => e.stopPropagation()}
               >
                 <Smartphone size={18} />
                 App Móvil (Android)
               </a>
             ) : (
               <div className="w-full max-w-[220px] py-3.5 bg-slate-800 text-slate-400 font-bold rounded-xl text-center flex items-center justify-center gap-2 border border-slate-700 cursor-not-allowed">
                 <Smartphone size={18} />
                 Próximamente
               </div>
             )}
             
             <button 
               onClick={(e) => { e.stopPropagation(); setShowOverlay(false); }} 
               className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
             >
                <X size={24} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="proyectos" className="py-10 md:py-16 px-4 md:px-8 lg:px-12 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 md:text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">Casos de Éxito</h2>
          <p className="text-slate-700 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-justify md:text-center hyphens-auto">
            Proyectos reales funcionando en producción. Desde plataformas web completas hasta aplicaciones publicadas en la Play Store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
