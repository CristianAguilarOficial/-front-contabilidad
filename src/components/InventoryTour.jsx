import { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { HelpCircle } from 'lucide-react';

export default function InventoryTour() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const hasSeenInventoryTour = localStorage.getItem('hasSeenInventoryTour');

    // SIEMPRE cargamos los pasos
    setSteps([
      {
        target: '.joy-formulario',
        content: 'Aquí puedes registrar un nuevo gasto.',
        disableBeacon: true,
      },
      {
        target: '.joy-producto',
        content: 'Nombre del producto o gasto.',
        disableBeacon: true,
      },
      {
        target: '.joy-description',
        content: 'Breve descripción del gasto.',
        disableBeacon: true,
      },
      { target: '.joy-valor', content: 'Valor en pesos colombianos.' },
      {
        target: '.joy-estado',
        content: 'Tipo de gasto (hogar, empresa, etc).',
      },
      { target: '.joy-relevancia', content: 'Qué tan importante es el gasto.' },
      { target: '.joy-fecha', content: 'Fecha del gasto.' },
      { target: '.joy-submit', content: 'Haz clic para guardar el gasto.' },
      {
        target: '.joy-historial-titulo',
        content: 'Aquí ves todos tus gastos guardados.',
      },
    ]);

    // Solo iniciamos el tour si es nuevo
    if (!hasSeenInventoryTour) {
      setRun(true);
    }
  }, []);

  const iniciarTour = () => {
    setRun(true);
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenInventoryTour', 'true');
      setRun(false);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        scrollDuration={600}
        scrollOffset={80}
        disableScrollParentFix
        showProgress
        showSkipButton
        hideCloseButton={true}
        callback={handleJoyrideCallback}
        locale={{
          back: 'Atrás',
          close: 'Cerrar',
          last: 'Finalizar',
          next: 'Siguiente',
          skip: 'Saltar',
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#22c55e',
            backgroundColor: '#27272a',
            textColor: '#ffffff',
            arrowColor: '#27272a',
            overlayColor: 'rgba(0,0,0,0.6)',
          },
          tooltip: {
            borderRadius: '8px',
            fontSize: '15px',
          },
          buttonNext: {
            backgroundColor: '#22c55e',
            borderRadius: '4px',
            color: '#ffffff',
          },
          buttonBack: {
            color: '#22c55e',
            marginRight: 10,
          },
          buttonSkip: {
            color: '#f87171',
          },
        }}
      />

      {/* Botón flotante para iniciar el tour */}
      {!run && (
        <button
          onClick={iniciarTour}
          className="fixed bottom-4 right-4 z-50 flex items-center justify-end gap-2 bg-transparent p-2 rounded-full group transition-all"
        >
          <span
            className="text-zinc-900 hidden sm:inline-block text-sm dark:text-white whitespace-nowrap
            opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300"
          >
            Ver tutorial
          </span>

          <HelpCircle
            className="text-zinc-900 w-6 h-6 dark:text-white transition-transform duration-300
            group-hover:translate-x-5 group-hover:opacity-0 hidden sm:block"
          />

          <HelpCircle className="w-6 h-6 text-white sm:hidden" />
        </button>
      )}
    </>
  );
}
