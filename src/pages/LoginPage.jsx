import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../assets/animation/Animaciones';
import { signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [googleError, setGoogleError] = useState('');
  const toggleMostrarContraseña = () =>
    setMostrarContraseña(!mostrarContraseña);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const handleGoogle = async () => {
    try {
      setGoogleError('');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setGoogleError(error.message);
        setTimeout(() => setGoogleError(''), 6000);
      }
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotMsg(
        'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.'
      );
    } catch {
      setForgotMsg(
        'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.'
      );
    }
    setTimeout(() => setForgotMsg(''), 7000);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/add-inventory');
  }, [isAuthenticated]);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden ">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="z-10  border-2 border-green-500 max-w-md w-full p-10 rounded-md shadow-md"
      >
        {signinErrors.map((error, i) => (
          <div className="bg-red-600 p-2 text-white mb-2 rounded" key={i}>
            {error}
          </div>
        ))}
        {googleError && (
          <div className="bg-red-600 p-2 text-white mb-2 rounded">
            {googleError}
          </div>
        )}

        <h1 className="text-3xl font-bold dark:text-white text-center mb-6">
          Iniciar Sesión
        </h1>

        {showForgot ? (
          <form onSubmit={handleForgot}>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              className="w-full dark:bg-zinc-700 dark:text-white px-4 py-2 rounded-md my-2 border-b-2 dark:border-zinc-900 active:border-none "
              placeholder="Tu correo electrónico"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition"
            >
              Enviar enlace de recuperación
            </button>
            {forgotMsg && (
              <p className="dark:text-white text-sm text-center mt-2">
                {forgotMsg}
              </p>
            )}
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="text-green-400 hover:underline text-sm"
              >
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        ) : (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="email"
                {...register('email', { required: 'El correo es obligatorio' })}
                className="w-full dark:bg-zinc-700 dark:text-white px-4 py-2 rounded-md my-2 border-b-2 dark:border-zinc-900 dark:border-b-2 active:border-none "
                placeholder="Correo electrónico"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}

              <div className="relative">
                <input
                  type={mostrarContraseña ? 'text' : 'password'}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                  })}
                  className="w-full dark:bg-zinc-700 dark:text-white px-4 py-2 rounded-md my-2 pr-10 border-b-2 dark:border-zinc-900 dark:border-b-2 active:border-none"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={toggleMostrarContraseña}
                  className="absolute right-3 top-[50%] translate-y-[-50%] text-white"
                >
                  {mostrarContraseña ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition"
              >
                Ingresar
              </button>
            </form>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border-2 border-green-500 text-white dark:text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  fill="#EA4335"
                />
              </svg>
              Continuar con Google
            </button>

            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-green-400 hover:underline text-sm"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </>
        )}

        <p className="dark:text-white text-center mt-4">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-green-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;