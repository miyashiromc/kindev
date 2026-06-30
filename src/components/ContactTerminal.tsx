import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function ContactTerminal() {
  return (
    <section id="contacto" className="snap-start h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 bg-slate-900 relative overflow-hidden">
      {/* Background gradients for the dark section */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-kindev-cyan/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-kindev-purple/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center"
        >
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-4 tracking-tight">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-slate-700 font-normal text-lg md:text-[18px] leading-[1.6] max-w-xl mx-auto text-justify hyphens-auto">
              Contáctanos directamente por WhatsApp y cuéntanos sobre tu proyecto. Estamos listos para construirlo.
            </p>
          </div>

          <a
            href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20solicitar%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-5 rounded-2xl shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:-translate-y-1 transition-all text-lg"
          >
            <span>Contáctanos por WhatsApp</span>
            <MessageCircle size={24} />
          </a>
        </motion.div>

        <div className="mt-12 text-center font-normal text-[14px] text-slate-400">
          <p>© {new Date().getFullYear()} Kindev. Todos los derechos reservados.</p>
        </div>
      </div>
    </section>
  );
}
