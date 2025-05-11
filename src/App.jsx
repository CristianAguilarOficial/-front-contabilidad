import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { InventoryProvider } from './context/InventoryContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MejoradoInventoryHistory from './pages/HistorialPage';
import Navbar from './components/Navbar';
import ProtectedRouter from './ProtectedRouter';
import HomePage from './pages/HomePage';
import InventoryFormPage from './pages/InventoryFormPage';
import QuienesSomos from './pages/QuienesSomos';
import ParticlesBackground from './components/ParticlesBackground';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InventoryProvider>
          <BrowserRouter>
            <div className=" bg-amber-50 dark:bg-zinc-900 relative min-h-screen flex flex-col ">
              <ParticlesBackground />
              <div className="absolute inset-0 dark:backdrop-blur-xs z-0" />
              <div className="relative z-10">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/quienes-somos" element={<QuienesSomos />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<ResetPasswordPage />}
                    />
                    <Route
                      path="/verify-email/:token"
                      element={<VerifyEmailPage />}
                    />

                    <Route element={<ProtectedRouter />}>
                      <Route
                        path="/historial"
                        element={<MejoradoInventoryHistory />}
                      />
                      <Route
                        path="/add-inventory"
                        element={<InventoryFormPage />}
                      />
                    </Route>
                  </Routes>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </InventoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
