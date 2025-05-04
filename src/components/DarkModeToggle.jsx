import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (modoOscuro) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [modoOscuro]);

  const toggleModoOscuro = () => {
    setModoOscuro((prev) => !prev);
  };

  return (
    <button
      onClick={toggleModoOscuro}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
      title="Cambiar modo oscuro"
    >
      {modoOscuro ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-800 dark:text-gray-100" />
      )}
    </button>
  );
}
