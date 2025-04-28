import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { useEffect } from "react";

function ProtectedRouter() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Forzar verificación adicional del token cuando se intenta acceder a rutas protegidas
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [loading, isAuthenticated]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
export default ProtectedRouter;
