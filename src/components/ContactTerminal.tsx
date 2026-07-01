import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

export default function ContactTerminal() {
  return (
    <motion.section 
      id="contacto" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="snap-start w-full flex flex-col items-center justify-center pt-16 pb-28 md:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden group"
        >
          {/* subtle animated glow inside card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,0.2)_360deg)] animate-[spin_4s_linear_infinite] opacity-30 pointer-events-none -z-10" />
          <div className="absolute inset-[1px] bg-slate-950/90 rounded-3xl -z-10 backdrop-blur-xl" />

          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
              <ScrollRevealText text="¿Listo para dar el siguiente paso?" />
            </h2>
            <p className="text-slate-400 font-normal text-lg md:text-[18px] leading-[1.6] max-w-xl mx-auto text-justify hyphens-auto">
              <ScrollRevealText text="Contáctanos directamente por WhatsApp y cuéntanos sobre tu proyecto. Estamos listos para construirlo." />
            </p>
          </div>

          <a
            href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20solicitar%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-5 rounded-2xl shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all text-lg border border-[#25D366]/50 hover:bg-[#20bd5a]"
          >
            <span>Contáctanos por WhatsApp</span>
            <MessageCircle size={24} />
          </a>
        </motion.div>

        <div className="mt-12 text-center font-normal text-[14px] text-slate-500">
          <p>© {new Date().getFullYear()} Kindev. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.section>
  );
}
