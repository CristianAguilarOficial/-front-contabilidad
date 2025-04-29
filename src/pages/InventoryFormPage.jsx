import { useForm } from 'react-hook-form';
import { useInventory } from '../context/InventoryContext'; // Importa el contexto adecuado
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  InventoryFormTour,
  ResetToursButton,
} from '../components/InventoryTour'; // Si tienes algún componente de tour específico

function InventoryFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createInventario, getInventarioById, updateInventario } =
    useInventory();
  const navigate = useNavigate();
  const params = useParams();

  // Cargar inventario si es una actualización
  useEffect(() => {
    if (params.id) {
      async function loadInventario() {
        const inventario = await getInventarioById(params.id);
        setValue('name', inventario.name); // Ajusta los campos según tu modelo
        setValue('description', inventario.description);
        setValue('quantity', inventario.quantity);
        setValue('price', inventario.price);
      }
      loadInventario();
    }
  }, [params.id, setValue]);

  // Función para manejar el submit
  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      // Asegura que las fechas o cualquier otro campo se procesen bien
    };

    if (params.id) {
      updateInventario(params.id, dataValid); // Actualiza inventario
    } else {
      createInventario(dataValid); // Crea nuevo inventario
    }
    navigate('/inventario'); // Redirige a la página de inventario
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      {/* Tour Component */}
      <InventoryFormTour />

      {/* Button to reset tours (optional) */}
      <ResetToursButton />

      <div className="bg-zinc-800 border-2 border-green-500 max-w-md w-full p-10 rounded-md shadow-lg inventory-form-container">
        <button
          type="button"
          onClick={() => navigate('/inventario')}
          className="text-green-400 hover:text-green-200 mb-4 flex items-center text-sm font-medium"
        >
          ← Regresar
        </button>
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {params.id ? 'Editar Inventario' : 'Crear Inventario'}
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-white block mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register('name', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="text-white block mb-1">
              Descripción
            </label>
            <textarea
              rows="3"
              placeholder="Descripción del producto"
              {...register('description', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            ></textarea>
          </div>

          <div>
            <label htmlFor="quantity" className="text-white block mb-1">
              Cantidad
            </label>
            <input
              type="number"
              {...register('quantity', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="price" className="text-white block mb-1">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-md font-semibold inventory-submit-button"
          >
            {params.id ? 'Guardar Cambios' : 'Crear Inventario'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InventoryFormPage;
