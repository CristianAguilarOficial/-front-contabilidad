import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

function ButtonTheme() {
  const { themeMode, setTheme } = useTheme();

  const handleClick = () => {
    // Ciclo entre los temas: sistema -> claro -> oscuro -> sistema
    switch (themeMode) {
      case THEMES.SYSTEM:
        setTheme(THEMES.LIGHT);
        break;
      case THEMES.LIGHT:
        setTheme(THEMES.DARK);
        break;
      case THEMES.DARK:
        setTheme(THEMES.SYSTEM);
        break;
      default:
        setTheme(THEMES.SYSTEM);
    }
  };

  // Determinar qué icono mostrar
  const renderIcon = () => {
    switch (themeMode) {
      case THEMES.LIGHT:
        return <Moon size={20} />;
      case THEMES.DARK:
        return <Sun size={20} />;
      case THEMES.SYSTEM:
        return <Monitor size={20} />;
      default:
        return <Monitor size={20} />;
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 1.2 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 10,
      }}
      onClick={handleClick}
      className="text-gray-300 hover:text-gray-400 transition-colors dark:text-gray-50 dark:hover:text-yellow-300"
      aria-label="Toggle Theme Mode"
    >
      {renderIcon()}
    </motion.button>
  );
}

export default ButtonTheme;
