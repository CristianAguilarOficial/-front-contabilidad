import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import dayjs from 'dayjs';

// ✅ Agrupar por año y mes
const agruparPorAñoYMes = (inventario) => {
  const grupos = {};

  inventario.forEach((item) => {
    const fecha = dayjs(item.fecha);
    const año = fecha.year();
    const mes = fecha.format('MMMM');

    if (!grupos[año]) {
      grupos[año] = {
        totalAnual: 0,
        meses: {},
      };
    }

    if (!grupos[año].meses[mes]) {
      grupos[año].meses[mes] = 0;
    }

    const valorNum = Number(item.valor);
    grupos[año].meses[mes] += valorNum;
    grupos[año].totalAnual += valorNum;
  });

  return grupos;
};

// ✅ Componente visual
export default function ResumenInventario({ inventario }) {
  const datosAgrupados = agruparPorAñoYMes(inventario);

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="w-full px-4 sm:px-6 py-6 bg-white dark:bg-gray-900 shadow-md rounded-xl mb-8 transition-colors duration-300 joy-resumen-mensual-anual">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 ">
        Resumen de Inventarios Total
      </h2>

      {Object.entries(datosAgrupados).map(([año, { totalAnual, meses }]) => (
        <div key={año} className="mb-8">
          <div className="flex items-center gap-2 mb-4 ">
            <FaMoneyBillWave className="text-green-600 dark:text-green-400 text-2xl" />
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
              Total {año}:
            </h3>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {formatoMoneda.format(totalAnual)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(meses).map(([mes, total]) => (
              <div
                key={mes}
                className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 p-4 rounded-md shadow-sm transition-colors duration-300"
              >
                <h4 className="font-semibold text-gray-700 dark:text-gray-100 capitalize">
                  {mes}
                </h4>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                  {formatoMoneda.format(total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
