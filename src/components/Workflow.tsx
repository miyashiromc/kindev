import { motion } from 'motion/react';
import { Search, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Análisis y Estrategia",
    desc: "Nos sentamos contigo a entender tu negocio. Diseñamos el plan y te proponemos la mejor solución sin complicaciones técnicas.",
    icon: Search,
    color: "group-hover:text-kindev-cyan",
    bgHover: "group-hover:bg-kindev-cyan/10",
    borderHover: "group-hover:border-kindev-cyan/20",
    gradient: "from-kindev-cyan/20 to-transparent",
  },
  {
    num: "02",
    title: "Desarrollo Transparente",
    desc: "Cero cajas negras. Te mostramos avances reales semana a semana para que veas cómo tu idea toma forma.",
    icon: Code2,
    color: "group-hover:text-kindev-emerald",
    bgHover: "group-hover:bg-kindev-emerald/10",
    borderHover: "group-hover:border-kindev-emerald/20",
    gradient: "from-kindev-emerald/20 to-transparent",
  },
  {
    num: "03",
    title: "Lanzamiento y Acompañamiento",
    desc: "Publicamos tu plataforma y nos aseguramos de que todo funcione impecablemente para recibir a tus primeros usuarios.",
    icon: Rocket,
    color: "group-hover:text-kindev-purple",
    bgHover: "group-hover:bg-kindev-purple/10",
    borderHover: "group-hover:border-kindev-purple/20",
    gradient: "from-kindev-purple/20 to-transparent",
  }
];

export default function Workflow() {
  return (
    <section id="flujo" className="snap-start h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-12 bg-kindev-surface relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 md:text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">¿Cómo trabajamos?</h2>
          <p className="text-slate-700 font-normal text-lg md:text-[18px] max-w-2xl md:mx-auto text-justify hyphens-auto">
            Un proceso ágil de tres pasos. Ejecución rápida, comunicación transparente y resultados reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-slate-200/60 -z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 group"
              >
                <div className="h-full p-8 md:p-10 rounded-[32px] bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden z-10">
                  
                  {/* Subtle gradient glow on hover */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -z-10`} />

                  {/* Decorative Background Number */}
                  <div className="absolute -bottom-6 -right-4 text-[140px] font-mono font-bold text-slate-50 group-hover:text-slate-100/60 transition-colors duration-500 leading-none select-none -z-10">
                    {step.num}
                  </div>

                  {/* Step Header */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-colors duration-300 relative z-20 ${step.bgHover} ${step.borderHover}`}>
                      <Icon size={28} className={`text-slate-400 transition-colors duration-300 ${step.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono font-semibold text-slate-400 text-[14px] uppercase tracking-widest mb-1">Paso {step.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-[22px] font-display font-bold mb-4 text-slate-900 group-hover:text-slate-800 transition-colors duration-300">{step.title}</h4>
                  <p className="text-slate-600 font-normal text-[16px] leading-[1.6] text-justify hyphens-auto">
                    {step.desc}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
