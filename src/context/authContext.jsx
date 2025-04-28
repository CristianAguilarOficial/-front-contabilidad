import { createContext, useState, useContext, useEffect } from 'react';
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      // Si el usuario aún no ha verificado su correo
      if (res.data.verified === false) {
        return { success: true, verified: false };
      }

      // Usuario registrado y verificado, autenticación directa
      setUser(res.data);
      setIsAuthenticated(true);

      return { success: true, verified: true };
    } catch (error) {
      console.error('Error en signup:', error.response);

      const errData = error.response?.data;

      // Si es un array de errores, lo pasamos directo
      if (Array.isArray(errData)) {
        setError(errData);
      } else {
        // Si es un solo mensaje, lo envolvemos en array
        setError([errData?.message || 'Ocurrió un error inesperado']);
      }

      return { success: false, error: true };
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      setIsAuthenticated(true);
      setUser(res.data);
      // Almacenar el token también en localStorage como respaldo
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      Cookies.remove('token');
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      const localAuth = localStorage.getItem('isAuthenticated');

      if (!cookies.token && !localAuth) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
