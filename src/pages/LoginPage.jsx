import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../assets/animation/Animaciones';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const toggleMostrarContraseña = () =>
    setMostrarContraseña(!mostrarContraseña);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

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

        <h1 className="text-3xl font-bold dark:text-white text-center mb-6">
          Iniciar Sesión
        </h1>

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
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md my-2 hover:bg-green-700 transition"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-green-400 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
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
