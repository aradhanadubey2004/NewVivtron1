import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import AOS from 'aos';
import {
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  X,
  Share2,
  Wallet,
  UserCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EVCSLoginProps {
  initialMode?: 'portal' | 'login' | 'register';
}

export const EVCSLogin: React.FC<EVCSLoginProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();

  // Mode: 'portal' (Image 2) | 'login' (Image 3) | 'register' (Image 4)
  const modeParam = searchParams.get('mode') as 'portal' | 'login' | 'register' | null;
  const [mode, setMode] = useState<'portal' | 'login' | 'register'>(
    initialMode || modeParam || 'portal'
  );

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    } else if (modeParam) {
      setMode(modeParam);
    }
  }, [initialMode, modeParam]);

  useEffect(() => {
    AOS.refresh();
  }, [mode]);

  const switchMode = (newMode: 'portal' | 'login' | 'register') => {
    setMode(newMode);
    setSearchParams(newMode === 'portal' ? {} : { mode: newMode });
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Login Form States
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regSponsor, setRegSponsor] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [forgotLoading, setForgotLoading] = useState(false);

  // Quick fill helper for review & demonstration
  const handleDemoFill = (role: 'Admin' | 'Employee') => {
    if (role === 'Admin') {
      setIdentifier('admin@vivtron.com');
      setPassword('Admin@Vivtron2026');
    } else {
      setIdentifier('employee@vivtron.com');
      setPassword('Employee@Vivtron2026');
    }
    setErrorMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const user = await login(identifier.trim(), password);
      const redirectPath = (location.state as any)?.from?.pathname;
      if (redirectPath && !redirectPath.includes('/login')) {
        navigate(redirectPath, { replace: true });
      } else {
        if (user.role === 'Admin') {
          navigate('/evcs/admin/dashboard', { replace: true });
        } else {
          navigate('/evcs/employee/dashboard', { replace: true });
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify your Login ID or Password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setRegLoading(true);
    try {
      const res = await api.auth.register({
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regMobile.trim(),
        sponsor_code: regSponsor.trim(),
        password: regPassword,
      });

      setSuccessMessage(res.message || 'Registration successful! You can now log in.');
      setIdentifier(regEmail.trim());
      // Switch to login tab smoothly
      setTimeout(() => {
        switchMode('login');
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier.trim()) return;

    setForgotLoading(true);
    setForgotStatus(null);

    try {
      const res = await api.auth.forgotPassword(forgotIdentifier.trim());
      setForgotStatus({ type: 'success', message: res.message });
    } catch (err: any) {
      setForgotStatus({ type: 'error', message: err.message || 'Unable to process password reset request.' });
    } finally {
      setForgotLoading(false);
    }
  };

  // =========================================================================
  // VIEW 1: PORTAL WELCOME PAGE (Image 2)
  // =========================================================================
  if (mode === 'portal') {
    return (
      <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col justify-between selection:bg-[#082B59] selection:text-white">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/evcs" className="flex items-center gap-2.5">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron EVCS"
                  className="w-[70px] sm:w-[82px] h-auto max-h-[58px] object-contain"
                />
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#082B59] font-heading hidden xs:inline">
                  VIVTRON EVCS
                </span>
              </Link>
            </div>

            {/* Right Buttons: Login & Register */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => switchMode('login')}
                className="px-6 sm:px-8 py-2.5 rounded-lg bg-[#082B59] hover:bg-[#062042] text-white font-bold text-sm tracking-wide shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => switchMode('register')}
                className="px-6 sm:px-8 py-2.5 rounded-lg bg-[#35C759] hover:bg-[#2eb04f] text-white font-bold text-sm tracking-wide shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col justify-center py-12 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            {/* Tag */}
            <div className="text-center" data-aos="fade-up" data-aos-duration="800">
              <span className="text-[#35C759] text-xs sm:text-sm font-bold uppercase tracking-widest font-mono">
                VIVTRON EVCS
              </span>
            </div>

            {/* Main Headline */}
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#082B59] tracking-tight font-heading leading-[1.12] max-w-4xl mx-auto"
            >
              Welcome to your Vivtron member portal
            </h1>

            {/* Subtitle */}
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              Access your dashboard, referrals, wallet, KYC, team details, income history, and account tools from one secure place.
            </p>

            {/* Action Buttons */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => switchMode('login')}
                className="px-8 sm:px-10 py-3.5 rounded-lg bg-[#082B59] hover:bg-[#062042] text-white font-bold text-base tracking-wide shadow-lg shadow-[#082B59]/25 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                Login to Account
              </button>
              <button
                onClick={() => switchMode('register')}
                className="px-8 sm:px-10 py-3.5 rounded-lg bg-[#35C759] hover:bg-[#2eb04f] text-white font-bold text-base tracking-wide shadow-lg shadow-[#35C759]/25 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                Create Account
              </button>
            </div>

            {/* 4 Feature Cards (from Image 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-14 text-left">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="800"
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#082B59]/30 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <ShieldCheck className="w-5 h-5 text-[#35C759]" />
                </div>
                <h3 className="text-base font-bold text-[#082B59] font-heading mb-1.5">Secure Login</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Members can access their account dashboard and portal tools safely.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="800"
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#35C759]/30 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#35C759]/10 text-[#35C759] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Share2 className="w-5 h-5 text-[#35C759]" />
                </div>
                <h3 className="text-base font-bold text-[#082B59] font-heading mb-1.5">Referral Tracking</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  View referral details and share your member referral links.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="800"
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#082B59]/30 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Wallet className="w-5 h-5 text-[#35C759]" />
                </div>
                <h3 className="text-base font-bold text-[#082B59] font-heading mb-1.5">Wallet & Income</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Track wallet balance, income history, withdrawals, and payouts.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="800"
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#35C759]/30 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#35C759]/10 text-[#35C759] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <UserCheck className="w-5 h-5 text-[#35C759]" />
                </div>
                <h3 className="text-base font-bold text-[#082B59] font-heading mb-1.5">KYC & Profile</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Manage KYC, bank details, profile information, and account settings.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Vivtron EVCS. Powered By Navodaya Growth Pvt. Ltd.</p>
            <Link to="/evcs" className="text-[#082B59] hover:underline font-semibold">
              Back to Vivtron EVCS Home
            </Link>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: LOGIN PAGE WITH ILLUSTRATION (Image 3)
  // =========================================================================
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col justify-between selection:bg-[#082B59] selection:text-white">
        {/* Top Header Navigation */}
        <header className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/evcs" className="flex items-center gap-2">
            <img src="/images/vivtron-ve-logo.png" alt="Vivtron EVCS" className="h-9 w-auto object-contain" />
          </Link>
          <button
            onClick={() => switchMode('portal')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#082B59] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Member Portal</span>
          </button>
        </header>

        {/* Login Card (Image 3 exact representation) */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div
            data-aos="zoom-in"
            data-aos-duration="700"
            className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 min-h-[460px]"
          >
            {/* Left Column: Log In Form */}
            <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
              {/* Logo Centered on left side */}
              <div className="flex flex-col items-center mb-4">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron EVCS Logo"
                  className="h-12 w-auto object-contain mb-3"
                />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B59] font-heading">
                  Log In
                </h2>
              </div>

              {/* Error or Success Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Login ID Input with icon */}
                <div className="relative border-b-2 border-slate-200 focus-within:border-[#082B59] pb-1.5 transition">
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Login ID"
                      className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Password Input with lock and eye toggle */}
                <div className="relative border-b-2 border-slate-200 focus-within:border-[#082B59] pb-1.5 transition">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#082B59] focus:ring-[#082B59]"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotIdentifier(identifier);
                    }}
                    className="text-slate-500 hover:text-[#082B59] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Deep Navy Log In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-[#082B59] hover:bg-[#062042] text-white font-bold text-base tracking-wide shadow-md shadow-[#082B59]/25 transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Log In</span>
                  )}
                </button>
              </form>

              {/* Quick Demo Pill Helper for Admin & Employee */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span className="text-[11px] font-semibold text-slate-400">Demo Fill:</span>
                <button
                  type="button"
                  onClick={() => handleDemoFill('Admin')}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer text-[11px]"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('Employee')}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer text-[11px]"
                >
                  Employee
                </button>
              </div>

              {/* Link to Register */}
              <div className="mt-3 text-center text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="text-[#082B59] hover:text-[#062042] font-bold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </div>
            </div>

            {/* Right Column: Illustration (Man with Laptop & Plant) */}
            <div className="md:col-span-6 bg-white p-6 sm:p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-100">
              <div className="w-full max-w-sm flex items-center justify-center">
                <img
                  src="/images/login-illustration.png"
                  alt="Member Working on Laptop"
                  className="w-full max-h-80 sm:max-h-96 object-contain filter drop-shadow-xs"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotStatus(null);
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6 text-[#35C759]" />
              </div>

              <h3 className="text-xl font-bold text-[#082B59] font-heading">
                Forgot Your Password?
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Enter your registered Login ID or Email and our security server will issue reset instructions.
              </p>

              {forgotStatus && (
                <div
                  className={`mb-5 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 ${
                    forgotStatus.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border border-red-300 text-red-800'
                  }`}
                >
                  {forgotStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{forgotStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email or Login ID
                  </label>
                  <input
                    type="text"
                    required
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    placeholder="member@vivtron.com or VIV-ADM-001"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:border-[#082B59] text-sm text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotStatus(null);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-6 py-2.5 rounded-lg bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                  >
                    {forgotLoading ? 'Processing...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Vivtron EVCS. All rights reserved.
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: REGISTER PAGE (Image 4)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col justify-between selection:bg-[#082B59] selection:text-white">
      {/* Top Header Navigation */}
      <header className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/evcs" className="flex items-center gap-2">
          <img src="/images/vivtron-ve-logo.png" alt="Vivtron EVCS" className="h-9 w-auto object-contain" />
        </Link>
        <button
          onClick={() => switchMode('portal')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#082B59] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Member Portal</span>
        </button>
      </header>

      {/* Register Form Card (Image 4 exact representation) */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          data-aos="zoom-in"
          data-aos-duration="700"
          className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-8 sm:p-10 max-w-md w-full"
        >
          {/* Centered Logo at top */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/vivtron-ve-logo.png"
              alt="Vivtron EVCS Logo"
              className="h-14 w-auto object-contain mb-2"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 outline-none transition"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={regMobile}
                onChange={(e) => setRegMobile(e.target.value)}
                placeholder="Enter 10 digit mobile number"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 placeholder-slate-400 outline-none transition"
              />
            </div>

            {/* Sponsor Code */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Sponsor Code
              </label>
              <input
                type="text"
                value={regSponsor}
                onChange={(e) => setRegSponsor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 outline-none transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59] text-sm text-slate-900 outline-none transition"
              />
            </div>

            {/* Bottom Row: Already registered? and REGISTER button */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-xs sm:text-sm text-slate-600 hover:text-[#082B59] hover:underline cursor-pointer"
              >
                Already registered?
              </button>

              <button
                type="submit"
                disabled={regLoading}
                className="px-6 py-2.5 rounded-lg bg-[#082B59] hover:bg-[#062042] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {regLoading ? 'Registering...' : 'REGISTER'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Vivtron EVCS. All rights reserved.
      </footer>
    </div>
  );
};
