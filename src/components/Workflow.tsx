import { motion } from 'motion/react';
import { Search, Code2, Rocket } from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

const steps = [
  {
    num: "01",
    title: "Análisis y Estrategia",
    desc: "Nos sentamos contigo a entender tu negocio. Diseñamos el plan y te proponemos la mejor solución sin complicaciones técnicas.",
    icon: Search,
    color: "group-hover:text-kindev-cyan",
    bgHover: "group-hover:bg-kindev-cyan/15",
    borderHover: "group-hover:border-kindev-cyan/30",
    gradient: "from-kindev-cyan/20 to-transparent",
  },
  {
    num: "02",
    title: "Desarrollo Transparente",
    desc: "Cero cajas negras. Te mostramos avances reales semana a semana para que veas cómo tu idea toma forma.",
    icon: Code2,
    color: "group-hover:text-kindev-emerald",
    bgHover: "group-hover:bg-kindev-emerald/15",
    borderHover: "group-hover:border-kindev-emerald/30",
    gradient: "from-kindev-emerald/20 to-transparent",
  },
  {
    num: "03",
    title: "Lanzamiento y Acompañamiento",
    desc: "Publicamos tu plataforma y nos aseguramos de que todo funcione impecablemente para recibir a tus primeros usuarios.",
    icon: Rocket,
    color: "group-hover:text-kindev-purple",
    bgHover: "group-hover:bg-kindev-purple/15",
    borderHover: "group-hover:border-kindev-purple/30",
    gradient: "from-kindev-purple/20 to-transparent",
  }
];

export default function Workflow() {
  return (
    <motion.section 
      id="flujo" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="snap-start w-full flex flex-col justify-center py-16 md:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            <ScrollRevealText text="¿Cómo trabajamos?" />
          </h2>
          <p className="text-slate-400 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-justify hyphens-auto">
            <ScrollRevealText text="Un proceso claro, transparente y orientado a resultados desde el primer día." />
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/[0.06] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group relative glass rounded-[32px] p-8 hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden border-transparent hover:border-white/[0.15]"
                >
                  
                  {/* Subtle gradient glow on hover */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -z-10`} />

                  {/* Decorative Background Number */}
                  <div className="absolute -bottom-6 -right-4 text-[140px] font-mono font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 leading-none select-none -z-10">
                    {step.num}
                  </div>

                  {/* Step Header */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.1] shadow-sm flex items-center justify-center transition-colors duration-300 relative z-20 ${step.bgHover} ${step.borderHover}`}>
                      <Icon size={28} className={`text-slate-500 transition-colors duration-300 ${step.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono font-semibold text-slate-500 text-[14px] uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">Paso {step.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-[22px] font-display font-bold mb-4 text-white group-hover:text-slate-200 transition-colors duration-300">{step.title}</h4>
                  <p className="text-slate-400 font-normal text-[16px] leading-[1.6] text-justify hyphens-auto">
                    {step.desc}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
