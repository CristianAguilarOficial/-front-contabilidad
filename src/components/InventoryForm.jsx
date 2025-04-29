import { useForm } from 'react-hook-form';
import { useInventory } from '../context/InventoryContext';

export default function InventoryForm() {
  // Desestructuramos la función correcta del contexto
  const { createInventario } = useInventory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Parsear valor numérico
    data.valor = parseInt(data.valor.replace(/\./g, ''), 10);
    // Llamar a createInventario en lugar de agregarHistorial
    await createInventario(data);
    reset(); // Limpiar formulario tras enviar
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Registrar Gasto</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Producto */}
        <input
          type="text"
          {...register('producto', { required: true })}
          placeholder="Producto*"
          className="border rounded-lg p-3 w-full"
        />
        {errors.producto && (
          <p className="text-red-500 text-sm">Producto requerido</p>
        )}

        {/* Descripción */}
        <input
          type="text"
          {...register('description')}
          placeholder="Descripción"
          className="border rounded-lg p-3 w-full"
        />

        {/* Valor */}
        <input
          type="text"
          {...register('valor', { required: true })}
          placeholder="Valor*"
          className="border rounded-lg p-3 w-full"
        />
        {errors.valor && (
          <p className="text-red-500 text-sm">Valor requerido</p>
        )}

        {/* Estado */}
        <select
          {...register('estado')}
          className="border rounded-lg p-3 w-full"
          defaultValue="Importante"
        >
          <option>Importante</option>
          <option>Poco importante</option>
          <option>Nada importante</option>
        </select>

        {/* Relevancia */}
        <select
          {...register('relevancia')}
          className="border rounded-lg p-3 w-full"
          defaultValue="Hogar"
        >
          <option>Hogar</option>
          <option>Empresa</option>
          <option>Salud</option>
          <option>Otros</option>
        </select>

        {/* Fecha */}
        <input
          type="date"
          {...register('fecha', { required: true })}
          className="border rounded-lg p-3 w-full col-span-1 md:col-span-2"
        />
        {errors.fecha && (
          <p className="text-red-500 text-sm col-span-2">Fecha requerida</p>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg w-full col-span-1 md:col-span-2"
        >
          Guardar Gasto
        </button>
      </form>
    </div>
  );
}
