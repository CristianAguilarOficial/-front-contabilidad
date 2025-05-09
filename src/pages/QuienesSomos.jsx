import LogoDiseño from '../assets/LogoDiseañoTatiana.svg';

function QuienesSomos() {
  return (
    <section className="relative min-h-screen  overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-6 py-10">
        <div className="max-w-3xl text-center dark:text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-6 leading-tight">
            ¿Quiénes Somos?
          </h2>

          <div className="flex justify-center mb-6">
            <img
              className="w-24 sm:w-40 md:w-52 object-contain"
              src={LogoDiseño}
              alt="Logo Diseñado por diseñadora Tatiana"
            />
          </div>

          <p className="text-base sm:text-lg dark:text-zinc-300 mb-4">
            En <span className="font-semibold">BasicWeb</span> somos un equipo
            de especialistas dedicados a simplificar tu día a día digital.
            Nuestra misión es ofrecer un ecosistema de herramientas integradas
            —desde gestión de tareas hasta control de gastos y mucho más— que
            funcione con la misma fluidez y confiabilidad que esperas de los
            grandes referentes tecnológicos, pero adaptada a las necesidades de
            pymes, emprendedores y usuarios exigentes.
          </p>

          <p className="text-base sm:text-lg dark:text-zinc-300 mb-4">
            Nacimos con la convicción de que la tecnología debe ser accesible y
            versátil. Por eso diseñamos cada módulo para que se integre de
            manera nativa dentro de una única plataforma en la nube, accesible
            con una sola cuenta. Así, garantizamos:
          </p>

          <ul className="text-base sm:text-lg dark:text-zinc-300 text-left list-disc list-inside mb-6">
            <li>
              <span className="font-medium">Seguridad y privacidad:</span>{' '}
              cifrado de datos y protocolos de protección de última generación.
            </li>
            <li>
              <span className="font-medium">Escalabilidad:</span>{' '}
              infraestructura preparada para crecer contigo, sin que pierdas
              rendimiento.
            </li>
            <li>
              <span className="font-medium">Usabilidad:</span> interfaces
              intuitivas pensadas para todo tipo de usuario, sin curva de
              aprendizaje.
            </li>
            <li>
              <span className="font-medium">Innovación continua:</span>{' '}
              actualizaciones constantes y nuevas herramientas basadas en tus
              necesidades reales.
            </li>
          </ul>

          <p className="text-base sm:text-lg dark:text-zinc-300">
            En <span className="font-semibold">BasicWeb</span> no nos
            conformamos con lo básico: nos comprometemos a ofrecerte soluciones
            robustas que impulsen tu productividad y te permitan concentrarte en
            lo que realmente importa. Bienvenido al futuro de tus herramientas
            digitales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
