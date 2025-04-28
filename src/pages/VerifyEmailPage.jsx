import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/verify-email/${token}`);
        setVerificationStatus({
          loading: false,
          success: true,
          message: response.data.message,
        });
      } catch (error) {
        setVerificationStatus({
          loading: false,
          success: false,
          message: error.response?.data?.message || "Failed to verify email",
        });
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-md text-center">
        {verificationStatus.loading ? (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">
              Verificando tu correo...
            </h2>
            <p>Por favor espera mientras procesamos tu solicitud.</p>
          </div>
        ) : verificationStatus.success ? (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              ¡Verificación exitosa!
            </h2>
            <p className="mb-6">{verificationStatus.message}</p>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Iniciar sesión
            </Link>
          </div>
        ) : (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-500">
              Error de verificación
            </h2>
            <p className="mb-6">{verificationStatus.message}</p>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Volver al registro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
