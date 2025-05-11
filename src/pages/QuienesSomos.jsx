import LogoDiseño from '../assets/LogoDiseañoTatiana.svg';
import { motion } from 'framer-motion';
function QuienesSomos() {
  return (
    <section className="relative min-h-screen  overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-6 py-10">
        <div className="max-w-3xl text-center dark:text-white">
          <motion.h2
            initial={{ x: 0, y: -80 }}
            animate={{ x: 0, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              duration: 0.6,
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-6 leading-tight"
          >
            ¿Quiénes Somos?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -200, y: 0 }}
            animate={{ opacity: 50, x: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <img
              className="w-24 sm:w-40 md:w-52 object-contain"
              src={LogoDiseño}
              alt="Logo Diseñado por diseñadora Tatiana"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 0, y: -80 }}
            animate={{ opacity: 50, x: 0, y: 0 }}
            transition={{
              duration: 1,
            }}
            className="text-base sm:text-lg dark:text-zinc-300 mb-4"
          >
            En <span className="font-semibold">BasicWeb</span> somos un equipo
            de especialistas dedicados a simplificar tu día a día digital.
            Nuestra misión es ofrecer un ecosistema de herramientas integradas
            —desde gestión de tareas hasta control de gastos y mucho más— que
            funcione con la misma fluidez y confiabilidad que esperas de los
            grandes referentes tecnológicos, pero adaptada a las necesidades de
            pymes, emprendedores y usuarios exigentes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 0, y: -100 }}
            animate={{ opacity: 50, x: 0, y: 0 }}
            transition={{
              duration: 1.2,
            }}
            className="text-base sm:text-lg dark:text-zinc-300 mb-4"
          >
            Nacimos con la convicción de que la tecnología debe ser accesible y
            versátil. Por eso diseñamos cada módulo para que se integre de
            manera nativa dentro de una única plataforma en la nube, accesible
            con una sola cuenta. Así, garantizamos:
          </motion.p>

          <ul className="text-base sm:text-lg dark:text-zinc-300 text-left list-disc list-inside mb-6">
            <motion.li
              initial={{ opacity: 0, x: 100, y: 0 }}
              animate={{ opacity: 50, x: 0, y: 0 }}
              transition={{
                duration: 1.4,
              }}
            >
              <span className="font-medium">Seguridad y privacidad:</span>{' '}
              cifrado de datos y protocolos de protección de última generación.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -100, y: 0 }}
              animate={{ opacity: 50, x: 0, y: 0 }}
              transition={{
                duration: 1.6,
              }}
            >
              <span className="font-medium">Escalabilidad:</span>{' '}
              infraestructura preparada para crecer contigo, sin que pierdas
              rendimiento.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 100, y: 0 }}
              animate={{ opacity: 50, x: 0, y: 0 }}
              transition={{
                duration: 1.8,
              }}
            >
              <span className="font-medium">Usabilidad:</span> interfaces
              intuitivas pensadas para todo tipo de usuario, sin curva de
              aprendizaje.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50, y: 0 }}
              animate={{ opacity: 50, x: 0, y: 0 }}
              transition={{
                duration: 2,
              }}
            >
              <span className="font-medium">Innovación continua:</span>{' '}
              actualizaciones constantes y nuevas herramientas basadas en tus
              necesidades reales.
            </motion.li>
          </ul>

          <motion.p
            initial={{ opacity: 0, x: 0, y: -80 }}
            animate={{ opacity: 100, x: 0, y: 0 }}
            transition={{
              duration: 2.2,
            }}
            className="text-base sm:text-lg dark:text-zinc-300"
          >
            En <span className="font-semibold">BasicWeb</span> no nos
            conformamos con lo básico: nos comprometemos a ofrecerte soluciones
            robustas que impulsen tu productividad y te permitan concentrarte en
            lo que realmente importa. Bienvenido al futuro de tus herramientas
            digitales.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
