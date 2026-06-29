import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <section id="precios" className="relative flex flex-col items-center py-10 md:py-16 bg-white overflow-hidden">
      <div className="mb-10 md:text-center z-10 px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">Inversión Transparente</h2>
        <p className="text-slate-700 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-justify">
          Precios claros para soluciones que impulsan tu negocio. Sin costos ocultos.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row max-w-7xl mx-auto px-6 w-full">
        {/* Plataformas Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="order-2 md:order-1 relative z-10 w-full md:w-72 rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm transition-transform hover:scale-105 md:-rotate-6"
        >
          <div className="mb-2 text-[20px] font-display font-bold text-slate-800">Plataformas</div>
          <div className="mb-4 text-[40px] font-mono tracking-tighter font-bold text-slate-900">
            <span className="text-[20px] font-sans text-slate-500 font-medium mr-1">desde</span>$400
          </div>
          <p className="text-sm text-slate-500 mb-6 text-justify">Sistemas a medida para tu negocio.</p>
          <ul className="mb-8 space-y-3 text-[15px] font-normal text-slate-700">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Base de Datos y Backend</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Panel de Administración</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Autenticación de Usuarios</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Lógica de Negocio</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20cotizar%20una%20plataforma%20a%20medida" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-[15px] text-slate-700 hover:bg-slate-50 transition">
            Cotizar Plataforma
          </a>
        </motion.div>

        {/* Web Básica Card (Floating) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.7 }}
          className="order-1 md:order-2 relative z-20 w-full md:w-80 md:-mt-8 md:scale-110 rounded-3xl border border-kindev-cyan/30 bg-slate-900 px-8 md:px-10 py-12 md:py-14 text-white shadow-xl transition-transform hover:scale-[1.12]"
        >
          <motion.div
            animate={{ y: [10, 6, 10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-kindev-cyan to-kindev-emerald px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest font-bold text-white shadow-lg whitespace-nowrap"
          >
            Más Popular
          </motion.div>
          <div className="mb-2 text-[20px] font-display font-bold text-kindev-cyan">Página Web</div>
          <div className="mb-2 text-[48px] font-mono tracking-tighter font-bold">$120</div>
          <p className="text-sm text-slate-400 mb-6 text-justify">Pago único. Ideal para presencia digital.</p>
          <ul className="mb-8 space-y-3 text-[15px] font-normal text-slate-200">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Landing Page (One Page)</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Diseño Responsivo</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Botón de WhatsApp</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Formulario de Contacto</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20el%20plan%20de%20P%C3%A1gina%20Web%20B%C3%A1sica" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl bg-gradient-to-r from-kindev-cyan to-kindev-emerald py-3 font-semibold text-[15px] text-white hover:opacity-90 transition shadow-lg shadow-kindev-cyan/20">
            Elegir Plan
          </a>
        </motion.div>

        {/* Enterprise Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.6 }}
          className="order-3 md:order-3 relative z-10 w-full md:w-72 rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm transition-transform hover:scale-105 md:rotate-6"
        >
          <div className="mb-2 text-[20px] font-display font-bold text-slate-800">App Móvil Android</div>
          <div className="mb-4 text-[32px] font-mono tracking-tight font-bold text-slate-900">A medida</div>
          <p className="text-sm text-slate-500 mb-6 text-justify">Se cotiza según requerimientos.</p>
          <ul className="mb-8 space-y-3 text-[15px] font-normal text-slate-700">
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Apps Android Nativas</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Tiendas Online Escalables</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Integración de Pagos</li>
            <li className="flex items-center"><span className="mr-2 text-kindev-emerald font-bold">✓</span>Arquitectura Compleja</li>
          </ul>
          <a href="https://wa.me/593998298263?text=Hola%2C%20me%20interesa%20cotizar%20una%20App%20M%C3%B3vil%20Android" target="_blank" rel="noopener noreferrer" className="block text-center w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-[15px] text-slate-700 hover:bg-slate-50 transition">
            Consultar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
