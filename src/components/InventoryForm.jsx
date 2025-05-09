import { useForm } from 'react-hook-form';
import { useInventory } from '../context/InventoryContext';
import { useState, useEffect } from 'react';

export default function InventoryForm({
  itemToEdit = null,
  setItemToEdit = null,
}) {
  const [formMode, setFormMode] = useState('create');

  // Desestructuramos las funciones necesarias del contexto
  const { createInventario, actualizarItem } = useInventory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Función auxiliar para arreglar problemas de zona horaria con fechas
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    // Ajustar por la zona horaria local para evitar problemas de desfase
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().split('T')[0];
  };

  // Efecto para cargar datos cuando hay un elemento para editar
  useEffect(() => {
    if (itemToEdit) {
      // Establecer modo de edición
      setFormMode('edit');

      // Cargar los datos del item en el formulario
      setValue('producto', itemToEdit.producto);
      setValue('description', itemToEdit.description);

      // Formatear valor como moneda colombiana
      const formattedValue = new Intl.NumberFormat('es-CO', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(itemToEdit.valor);

      setValue('valor', formattedValue);
      setValue('estado', itemToEdit.estado);
      setValue('relevancia', itemToEdit.relevancia);

      // Formatear la fecha correctamente para el input date
      setValue('fecha', formatDateForInput(itemToEdit.fecha));
    } else {
      // Establecer modo de creación
      setFormMode('create');
      // Establecer la fecha de hoy por defecto
      setValue('fecha', new Date().toISOString().split('T')[0]);
    }
  }, [itemToEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      // Parsear valor numérico - eliminar los puntos antes de convertir a entero
      data.valor = parseInt(data.valor.replace(/\./g, ''), 10);

      if (formMode === 'edit' && itemToEdit) {
        // Actualizar item existente
        await actualizarItem(itemToEdit._id, data);
        // Cancelar la edición después de guardar
        if (setItemToEdit) setItemToEdit(null);
      } else {
        // Crear nuevo item
        await createInventario(data);
      }

      reset(); // Limpiar formulario tras enviar

      // Establecer valores predeterminados después de enviar
      setValue('fecha', new Date().toISOString().split('T')[0]);
      setValue('estado', 'Importante');
      setValue('relevancia', 'Hogar');

      // Volver al modo de creación
      setFormMode('create');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const cancelEdit = () => {
    // Cancelar la edición
    reset();
    if (setItemToEdit) setItemToEdit(null);
    setFormMode('create');
    // Establecer valores predeterminados
    setValue('fecha', new Date().toISOString().split('T')[0]);
    setValue('estado', 'Importante');
    setValue('relevancia', 'Hogar');
  };

  // Formatear números con formato de moneda colombiana mientras el usuario escribe
  const formatNumber = (e) => {
    // Obtener el valor actual sin puntos
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo lo que no sea número

    if (value) {
      // Usar Intl.NumberFormat para formatear correctamente según la localización colombiana
      const formattedValue = new Intl.NumberFormat('es-CO', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(value);

      setValue('valor', formattedValue);
    } else {
      setValue('valor', '');
    }
  };

  // Vigilar el campo de valor para aplicar el formato
  const valorActual = watch('valor');

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {formMode === 'edit' ? 'Editar Gasto' : 'Registrar Gasto'}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Producto */}
        <div className="col-span-1 joy-producto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
            Producto*
          </label>
          <input
            type="text"
            {...register('producto', { required: true })}
            placeholder="Producto*"
            className="border dark:border-gray-600 rounded-lg p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white  "
          />
          {errors.producto && (
            <p className="text-red-500 text-sm">Producto requerido</p>
          )}
        </div>

        {/* Descripción */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
          </label>
          <input
            type="text"
            {...register('description')}
            placeholder="Descripción"
            className="border dark:border-gray-600 rounded-lg p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white joy-description"
          />
        </div>

        {/* Valor */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor* (COP)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              type="text"
              {...register('valor', { required: true })}
              placeholder="0"
              className="border dark:border-gray-600 rounded-lg p-3 pl-6 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white joy-valor "
              onChange={formatNumber}
            />
          </div>
          {errors.valor && (
            <p className="text-red-500 text-sm">Valor requerido</p>
          )}
        </div>

        {/* Estado */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estado
          </label>
          <select
            {...register('estado')}
            className="border dark:border-gray-600 rounded-lg p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white joy-estado"
            defaultValue="Importante"
          >
            <option>Importante</option>
            <option>Poco importante</option>
            <option>Nada importante</option>
          </select>
        </div>

        {/* Relevancia */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Relevancia
          </label>
          <select
            {...register('relevancia')}
            className="border dark:border-gray-600 rounded-lg p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white joy-relevancia"
            defaultValue="Hogar"
          >
            <option>Hogar</option>
            <option>Empresa</option>
            <option>Salud</option>
            <option>Otros</option>
          </select>
        </div>

        {/* Fecha */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha*
          </label>
          <input
            type="date"
            {...register('fecha', { required: true })}
            className="border dark:border-gray-600 rounded-lg p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white joy-fecha"
          />
          {errors.fecha && (
            <p className="text-red-500 text-sm">Fecha requerida</p>
          )}
        </div>

        {/* Botones */}
        <div className="col-span-1 md:col-span-2 flex gap-3 mt-2">
          <button
            type="submit"
            className={`${
              formMode === 'edit'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700 joy-submit'
            } text-white font-bold py-3 rounded-lg flex-1`}
          >
            {formMode === 'edit' ? 'Guardar Cambios' : 'Guardar Gasto'}
          </button>

          {formMode === 'edit' && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg flex-1"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
