import { createContext, useContext, useEffect, useState } from 'react';

// Valores posibles para el tema
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Crear el contexto
const ThemeContext = createContext();

// Hook personalizado para usar el contexto
export function useTheme() {
  return useContext(ThemeContext);
}

// Proveedor del contexto
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(THEMES.SYSTEM);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar preferencia del sistema
  const detectSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Aplicar tema al DOM
  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    setIsDarkMode(isDark);
  };

  // Actualizar tema cuando cambian las preferencias del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (themeMode === THEMES.SYSTEM) {
        applyTheme(detectSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode]);

  // Inicializar tema al cargar
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');

    if (savedMode) {
      setThemeMode(savedMode);

      if (savedMode === THEMES.SYSTEM) {
        applyTheme(detectSystemTheme());
      } else {
        applyTheme(savedMode === THEMES.DARK);
      }
    } else {
      setThemeMode(THEMES.SYSTEM);
      applyTheme(detectSystemTheme());
      localStorage.setItem('theme', THEMES.SYSTEM);
    }
  }, []);

  // Cambiar tema
  const setTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('theme', mode);

    if (mode === THEMES.SYSTEM) {
      applyTheme(detectSystemTheme());
    } else {
      applyTheme(mode === THEMES.DARK);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
