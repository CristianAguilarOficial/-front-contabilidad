import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function InputInventoryModal({
  isOpen,
  onClose,
  agregarHistorial,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState('');

  const formatoNumero = new Intl.NumberFormat('es-CO');

  const onSubmit = (data) => {
    if (!data.product || !data.date || !data.value) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    agregarHistorial({
      producto: data.product,
      descripcion: data.description || '',
      valor: parseInt(data.value.replace(/\./g, ''), 10),
      estado: data.status,
      relevancia: data.relevance,
      fecha: data.date,
    });

    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-center mb-4">
            Nuevo Registro de Inventario
          </Dialog.Title>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register('product')}
              type="text"
              placeholder="Producto"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register('description')}
              type="text"
              placeholder="Descripción"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register('value')}
              type="text"
              placeholder="Valor"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                e.target.value = formatoNumero.format(val);
              }}
            />
            <select
              {...register('status')}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Importante">Importante</option>
              <option value="Poco importante">Poco importante</option>
              <option value="Nada importante">Nada importante</option>
            </select>
            <select
              {...register('relevance')}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Hogar">Hogar</option>
              <option value="Empresa">Empresa</option>
              <option value="Salud">Salud</option>
              <option value="Otros">Otros</option>
            </select>
            <input
              {...register('date')}
              type="date"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
