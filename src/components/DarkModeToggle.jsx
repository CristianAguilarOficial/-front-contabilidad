import React, { useEffect, useState } from 'react';
import '../styles/buttonThemen.css';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setIsDark(saved);
    toggleRootClass(saved);
  }, []);

  const toggleRootClass = (dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    toggleRootClass(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <button className="toggle-btn" onClick={toggleMode}>
      {isDark ? '☀️ ' : '🌙 '}
    </button>
  );
};

export default DarkModeToggle;
