import { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { registerRequest, loginRequest, logoutRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const toSafeUser = (fbUser) =>
  fbUser
    ? {
        uid: fbUser.uid,
        email: fbUser.email,
        username: fbUser.displayName || fbUser.email?.split('@')[0] || 'usuario',
      }
    : null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const pushErrors = (error) => {
    const list = Array.isArray(error)
      ? error
      : [error?.message || 'Ocurrió un error inesperado'];
    setErrors(list);
    setTimeout(() => setErrors([]), 6000);
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(toSafeUser(fbUser));
      setIsAuthenticated(!!fbUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (userForm) => {
    try {
      await registerRequest(userForm);
      return { success: true, verified: false };
    } catch (error) {
      pushErrors(error);
      return { success: false, error: true };
    }
  };

  const signin = async (userForm) => {
    try {
      await loginRequest(userForm);
      return { success: true };
    } catch (error) {
      pushErrors(error);
      return { success: false, error: true };
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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