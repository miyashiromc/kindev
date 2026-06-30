import { motion } from 'motion/react';
import { Globe, ShoppingCart, Smartphone, Cpu } from 'lucide-react';

export default function ServicesBento() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="servicios" className="snap-start h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-12 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 md:text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">Soluciones para tu Empresa</h2>
          <p className="text-slate-700 font-normal text-lg md:text-[18px] max-w-2xl mx-auto text-justify hyphens-auto">
            Desarrollamos tecnología que se adapta a tus necesidades y a las de tus clientes.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main big block */}
          <motion.div variants={item} className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-kindev-emerald/30 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe size={160} className="text-kindev-emerald" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-kindev-emerald/10 flex items-center justify-center mb-6">
              <Globe className="text-kindev-emerald" size={28} />
            </div>
            <h3 className="text-[20px] font-display font-semibold mb-3 text-slate-900">Páginas Web de Alto Impacto</h3>
            <p className="text-slate-600 font-normal max-w-md text-[16px] leading-[1.6] text-justify hyphens-auto">
              Sitios web rápidos, atractivos y diseñados para retener la atención de tus visitantes y convertirlos en clientes.
            </p>
          </motion.div>

          {/* Top right block */}
          <motion.div variants={item} className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-kindev-cyan/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-kindev-cyan/10 flex items-center justify-center mb-6">
              <Smartphone className="text-kindev-cyan" size={28} />
            </div>
            <h3 className="text-[20px] font-display font-semibold mb-3 text-slate-900">Aplicaciones Móviles</h3>
            <p className="text-slate-600 font-normal text-[16px] leading-[1.6] text-justify hyphens-auto">
              Llevamos tu marca al bolsillo de tus clientes. Apps fluidas, fáciles de usar y listas para destacar.
            </p>
          </motion.div>

          {/* Bottom left block */}
          <motion.div variants={item} className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-kindev-purple/30 transition-all">
             <div className="w-14 h-14 rounded-2xl bg-kindev-purple/10 flex items-center justify-center mb-6">
              <ShoppingCart className="text-kindev-purple" size={28} />
            </div>
            <h3 className="text-[20px] font-display font-semibold mb-3 text-slate-900">E-Commerce Escalable</h3>
            <p className="text-slate-600 font-normal text-[16px] leading-[1.6] text-justify hyphens-auto">
              Tiendas en línea robustas que no te dejan colgado en días de altas ventas. Procesos de pago optimizados para no perder clientes.
            </p>
          </motion.div>

          {/* Bottom right block (spans 2) */}
          <motion.div variants={item} className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-slate-900 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent group-hover:translate-x-full duration-1000 transition-transform" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
              <Cpu className="text-white" size={28} />
            </div>
            <h3 className="text-[20px] font-display font-semibold mb-3">Plataformas y Sistemas a Medida</h3>
            <p className="text-slate-300 font-normal max-w-xl text-[16px] leading-[1.6] text-justify hyphens-auto">
              ¿Procesos internos complejos? Los automatizamos. Creamos sistemas administrativos hechos exactamente a la medida de las reglas de tu negocio.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
