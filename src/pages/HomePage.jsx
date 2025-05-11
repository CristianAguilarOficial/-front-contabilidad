import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, popIn } from '../assets/animation/Animaciones';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen  text-black dark:text-gray-200">
      <motion.main
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex-grow flex items-center justify-center px-6 pt-28"
      >
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="max-w-3xl text-center"
        >
          <h1 className="text-5xl font-bold mb-6 ">
            💸 Lleva el control de tus gastos de forma moderna y sin estrés
          </h1>
          <p className="text-lg text-black dark:text-zinc-300 mb-4">
            ¿Estás cansado de anotar tus gastos en un cuaderno que siempre se
            pierde, o de pelear con fórmulas en Excel que nunca cuadran? Esta
            aplicación fue creada pensando en ti.
          </p>
          <p className="text-lg dark:text-zinc-300 mb-4">
            Registra tus compras, pagos y cualquier otro gasto diario, mensual o
            anual con solo unos clics. Guarda todo en la nube, accede desde
            cualquier dispositivo, y olvídate del desorden.
          </p>
          <p className="text-lg dark:text-zinc-300 mb-4">
            Además, puedes filtrar tus gastos por fecha, revisar cuánto has
            gastado en cada mes o categoría, y tener un historial organizado sin
            necesidad de conocimientos técnicos.
          </p>
          <p className="text-md dark:text-zinc-400 mb-6 italic">
            "Digitaliza tu libreta. Organiza tu dinero. Vive más tranquilo."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2">
                Iniciar Sesión
              </button>
            </Link>

            <Link to="/register">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-zinc-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Registrarse
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.main>

      <footer className="bg-zinc-800 dark:bg-zinc-800 border-t border-zinc-700 mt-12 py-6 text-center text-zinc-300 text-sm">
        <p>
          Creada para ayudarte a llevar tus finanzas con claridad, orden y
          facilidad.
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-green-700">
            <Link to="/quienes-somos">BasicWeb</Link>
          </span>{' '}
          Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
