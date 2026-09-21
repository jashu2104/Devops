import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';
import { demoFacultyList } from '../hooks/useAuth';

export const LoginPage = ({ onLogin, isDark, toggleTheme }) => {
  const [email, setEmail] = useState('jashwanth.reddy@college.edu');
  const [password, setPassword] = useState('faculty123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = onLogin(email, password);
      if (!res.success) {
        setError(res.error);
        setIsSubmitting(false);
      }
    }, 300);
  };

  const handleQuickDemoLogin = (facultyEmail) => {
    setEmail(facultyEmail);
    setPassword('faculty123');
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      onLogin(facultyEmail, 'faculty123');
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10 my-8">
        
        {/* Left Side: Branding & Features */}
        <div className="flex flex-col justify-between space-y-6 md:border-r md:border-slate-800 md:pr-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">Attendify</h1>
                <p className="text-xs text-indigo-300">Faculty Portal • Campus SaaS</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold leading-snug">
              Smart College Student Attendance Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Sign in to monitor daily attendance, track eligibility thresholds, manage student records, and generate department reports.
            </p>
          </div>

          <div className="space-y-3 py-2">
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Real-time dynamic attendance & 75% eligibility calculation</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Recharts department performance breakdown & reports</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Instant student creation, search & single-click session resets</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-indigo-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Academic Session 2026 Active</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
              v2.5 PRO
            </span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Faculty Sign In</h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your college faculty credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-xs text-rose-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Faculty Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="faculty@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Faculty Switcher */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <p className="text-xs text-slate-400 font-medium">Quick Demo Professor Login:</p>
            <div className="grid grid-cols-1 gap-2">
              {demoFacultyList.map((faculty) => (
                <button
                  key={faculty.email}
                  onClick={() => handleQuickDemoLogin(faculty.email)}
                  type="button"
                  className="w-full p-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-left">
                    <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <p className="text-slate-200 group-hover:text-white font-bold leading-tight">{faculty.name}</p>
                      <p className="text-[10px] text-slate-400">{faculty.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-mono">
                    Login
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
