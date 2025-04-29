export default function InventoryTotal({ historial }) {
  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const resumenPorMes = historial.reduce((acc, item) => {
    const [año, mes] = item.fecha.split('-');
    const key = `${año}-${mes}`;

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += item.valor;
    return acc;
  }, {});

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Resumen de Gastos por Mes
      </h2>
      <div className="flex flex-col items-center gap-2">
        {Object.entries(resumenPorMes).map(([mes, total]) => (
          <div
            key={mes}
            className="bg-gray-100 p-3 rounded-lg w-60 text-center shadow-sm"
          >
            <span className="font-semibold">{mes}</span>:{' '}
            {formatoMoneda.format(total)}
          </div>
        ))}
      </div>
    </div>
  );
}
