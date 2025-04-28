import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const result = await signup(values);

    if (result.success && result.verified === false) {
      setRegistrationSuccess(true);
    } else if (result.success && result.verified === true) {
      navigate("/tasks");
    }
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="bg-zinc-800 max-w-md w-full p-8 rounded-xl shadow-lg">
        {registrationSuccess ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-400 mb-4">
              ¡Registro exitoso!
            </h1>
            <p className="text-zinc-200 mb-6">
              Hemos enviado un correo de verificación a tu dirección de email.
              Por favor, verifica tu correo para activar tu cuenta.
            </p>
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-2 rounded-md"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
              Crear cuenta
            </h1>
            {registerErrors.map((error, i) => (
              <div className="bg-red-600 p-2 text-white mb-2 rounded" key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit}>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Nombre de usuario"
              />
              {errors.username && (
                <p className="text-red-600 text-sm px-1">
                  El nombre de usuario es requerido
                </p>
              )}
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Correo electrónico"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm px-1">
                  El correo es requerido
                </p>
              )}

              {/* Campo Contraseña */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 pr-10"
                  placeholder="Contraseña"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[1.35rem] text-zinc-300 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm px-1">
                  La contraseña es requerida
                </p>
              )}

              {/* Campo Confirmar contraseña */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
                  })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 pr-10"
                  placeholder="Confirmar contraseña"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-[1.35rem] text-zinc-300 hover:text-white"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm px-1">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-md my-4"
              >
                Registrarse
              </button>
            </form>
            <p className="text-zinc-300 text-center mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-green-400 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
