import React, { useEffect, useState } from 'react';
import InventoryForm from '../components/InventoryForm';
import InventoryHistory from '../components/InventoryHistory';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/authContext';
import InventoryTour from '../components/InventoryTour';

export default function InventoryFormPage() {
  const { user } = useAuth();
  const { inventario, loading, getInventario } = useInventory();
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    if (user) getInventario();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6">
      <InventoryTour />

      <h1 className=" text-zinc-950 text-2xl font-bold mb-6 dark:text-white ">
        Hola {user?.username || 'Usuario'}
      </h1>

      <div className="joy-formulario">
        <InventoryForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : (
        <>
          <InventoryHistory onEditItem={setItemToEdit} />
        </>
      )}
    </div>
  );
}
