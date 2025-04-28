// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { resetPasswordRequest, verifyResetTokenRequest } from '../api/auth';

import { Eye, EyeOff } from 'lucide-react';

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verificar validez del token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyResetTokenRequest(token);
        setValidToken(res.data.valid);
      } catch (error) {
        setValidToken(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await resetPasswordRequest(token, data.password);
      setSuccess(true);
      setMessage('Tu contraseña ha sido actualizada correctamente.');

      // Redireccionar al login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setSuccess(false);
      setMessage(
        error.response?.data?.message ||
          'Ha ocurrido un error al restablecer la contraseña.'
      );
    } finally {
      setLoading(false);
    }
  });

  if (verifying) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-zinc-800">
      <div className="z-10 border-2 border-green-500 max-w-md w-full p-10 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Restablecer Contraseña
        </h1>

        {!validToken && !success && (
          <div className="bg-red-600 p-3 rounded-md text-white mb-4">
            El enlace de restablecimiento es inválido o ha expirado. Por favor,
            solicita un nuevo enlace.
          </div>
        )}

        {message && (
          <div
            className={`p-3 mb-4 rounded-md ${
              success ? 'bg-green-600' : 'bg-red-600'
            } text-white`}
          >
            {message}
          </div>
        )}

        {validToken && !success && (
          <form onSubmit={onSubmit}>
            <div className="relative my-2">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md pr-10"
                placeholder="Nueva contraseña"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[50%] translate-y-[-50%] text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}

            <div className="relative my-2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirma tu contraseña',
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return 'Las contraseñas no coinciden';
                    }
                  },
                })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md pr-10"
                placeholder="Confirmar contraseña"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[50%] translate-y-[-50%] text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        )}

        <p className="text-white text-center mt-4">
          <Link to="/login" className="text-green-400 hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
