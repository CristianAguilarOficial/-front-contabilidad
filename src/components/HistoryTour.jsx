// src/components/HistoryTour.jsx
import { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { HelpCircle } from 'lucide-react';

export default function HistoryTour() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenHistoryTour');

    // 1) Definimos siempre los pasos del tour:
    setSteps([
      {
        target: '.joy-resumen-mensual-anual',
        content: 'Este es el resumen mensual y anual de tus gastos.',
        disableBeacon: true,
      },
      {
        target: '.joy-filtros-contable',
        content:
          'Este apartado es para filtrar los productos y hace la sumas automáticas de tu gasto o inventario.',
        disableBeacon: true,
      },
      {
        target: '.joy-filtro-busqueda', // input búsqueda
        content: 'Aquí puedes filtrar por nombre de producto.',
        disableBeacon: true,
      },
      {
        target: '.joy-filtro-estado', // select estado
        content:
          'Filtra tus gastos según su estado (Importante, Poco importante…).',
        disableBeacon: true,
      },
      {
        target: '.joy-filtro-relevancia', // select relevancia
        content: 'Filtra por categoría: Hogar, Empresa, Salud u Otros.',
        disableBeacon: true,
      },
      {
        target: '.joy-filtro-valor', // select valor
        content: 'Ordena los gastos de mayor a menor o viceversa.',
        disableBeacon: true,
      },
      {
        target: '.joy-mes-header', // h3 que muestra el mes
        content: 'Cada sección está agrupada por mes.',
        disableBeacon: true,
      },
      {
        target: '.joy-dia-header', // div con fecha del día
        content: 'Y dentro de cada mes, por día.',
        disableBeacon: true,
      },
      {
        target: '.joy-eliminar', // botón eliminar
        content: 'Haz clic aquí para eliminar un gasto del registro.',
        disableBeacon: true,
      },
    ]);

    // 2) Si es la primera visita, lanzamos el tour:
    if (!seen) {
      setRun(true);
    }
  }, []);

  const iniciarTour = () => {
    setRun(true);
  };

  const handleJoyrideCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenHistoryTour', 'true');
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
        locale={{
          back: 'Atrás',
          next: 'Siguiente',
          skip: 'Saltar',
          last: 'Finalizar',
        }}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#22c55e',
            overlayColor: 'rgba(0,0,0,0.6)',
          },
          tooltip: { borderRadius: '8px', fontSize: '15px' },
          buttonNext: { backgroundColor: '#22c55e', color: '#fff' },
          buttonBack: { color: '#22c55e', marginRight: 10 },
          buttonSkip: { color: '#f87171' },
        }}
      />

      {!run && (
        <button
          onClick={iniciarTour}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-transparent p-2 rounded-full group transition-all"
        >
          <span
            className="hidden sm:inline-block text-sm text-white whitespace-nowrap
                       opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300"
          >
            Ver tour
          </span>
          <HelpCircle className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
}
