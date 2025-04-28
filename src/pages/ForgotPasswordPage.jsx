// src/pages/ForgotPasswordPage.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../api/auth';

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await forgotPasswordRequest(data.email);
      setSuccess(true);
      setMessage(
        'Si tu correo está registrado, recibirás instrucciones para restablecer tu contraseña.'
      );
    } catch (error) {
      setSuccess(false);
      setMessage('Ha ocurrido un error. Por favor, inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-zinc-800">
      <div className="z-10 border-2 border-green-500 max-w-md w-full p-10 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Recuperar Contraseña
        </h1>

        {message && (
          <div
            className={`p-3 mb-4 rounded-md ${
              success ? 'bg-green-600' : 'bg-red-600'
            } text-white`}
          >
            {message}
          </div>
        )}

        {!success && (
          <form onSubmit={onSubmit}>
            <p className="text-white mb-4">
              Ingresa tu correo electrónico y te enviaremos instrucciones para
              restablecer tu contraseña.
            </p>

            <input
              type="email"
              {...register('email', { required: 'El correo es obligatorio' })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Correo electrónico"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
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

export default ForgotPasswordPage;
