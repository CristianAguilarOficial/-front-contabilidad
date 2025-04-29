import React from 'react';
import InventoryForm from '../components/InventoryForm';
import InventoryHistory from '../components/InventoryHistory';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/authContext';

export default function Home() {
  const { user } = useAuth();
  const { inventario, loading } = useInventory();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Hola {user?.username || 'Usuario'}
      </h1>

      {/* Formulario inline de inventario */}
      <InventoryForm />

      {/* Loader mientras carga el inventario */}
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">
            Tu Historial de Inventario
          </h2>
          {/* Componente que muestra el historial filtrado */}
          <InventoryHistory />
        </>
      )}
    </div>
  );
}
