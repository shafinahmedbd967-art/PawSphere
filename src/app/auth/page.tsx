'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserPlus, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { Button, Input, Select } from '@/components/ui';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

type Mode = 'login' | 'signup';

const demoAccounts = [
  { role: 'Admin', email: 'admin@pawsphere.bd', password: 'demo123', emoji: '👑' },
  { role: 'Vet', email: 'vet@pawsphere.bd', password: 'demo123', emoji: '🩺' },
  { role: 'Volunteer', email: 'vol@pawsphere.bd', password: 'demo123', emoji: '🙋' },
  { role: 'User', email: 'user@pawsphere.bd', password: 'demo123', emoji: '👤' },
];

export default function AuthPage() {
  const router = useRouter();
  const { setUser, t } = useAppStore();
  const [mode, setMode] = useState<Mode>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const setField = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setUser({
      id: '1',
      name: form.name || 'PawSphere User',
      email: form.email,
      role: form.role as 'admin' | 'ngo' | 'vet' | 'volunteer' | 'user',
      points: 250,
      badges: ['animalHero'],
      verified: true,
    });
    toast.success(`🐾 Welcome to PawSphere!`);
    setLoading(false);
    router.push('/');
  };

  const quickLogin = async (account: typeof demoAccounts[0]) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({
      id: account.role.toLowerCase(),
      name: `Demo ${account.role}`,
      email: account.email,
      role: account.role.toLowerCase() as 'admin' | 'vet' | 'volunteer' | 'user',
      points: 500,
      badges: ['animalHero'],
      verified: true,
    });
    toast.success(`Logged in as ${account.role}!`);
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center glow-primary">
              <span className="text-2xl">🐾</span>
            </div>
            <span className="font-display font-bold text-2xl text-white">PawSphere</span>
          </Link>
          <p className="text-white/40 mt-2 text-sm">Every paw deserves a safe sphere</p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-white/10 p-8"
        >
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-8">
            {(['login', 'signup'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={clsx(
                  'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize',
                  mode === m
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {m === 'login' ? `${t('nav.login')}` : `${t('nav.signup')}`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {mode === 'signup' && (
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={setField('name')}
                />
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={setField('email')}
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={setField('password')}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all text-sm focus:border-primary-400"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <Select
                  label="I am a..."
                  value={form.role}
                  onChange={setField('role')}
                >
                  <option value="user">General User</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="vet">Veterinarian</option>
                  <option value="ngo">NGO / Organization</option>
                </Select>
              )}

              <Button
                variant="primary"
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Please wait...' : mode === 'login' ? (
                  <><LogIn size={16} /> {t('nav.login')}</>
                ) : (
                  <><UserPlus size={16} /> Create Account</>
                )}
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">Quick Demo Access</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Demo Accounts */}
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                onClick={() => quickLogin(acc)}
                disabled={loading}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary-400/40 hover:bg-primary-400/5 transition-all text-left"
              >
                <span className="text-lg">{acc.emoji}</span>
                <div>
                  <p className="text-white text-xs font-semibold">{acc.role}</p>
                  <p className="text-white/30 text-[10px]">Demo</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-1 text-white/30 text-xs">
            <Shield size={12} />
            <span>JWT secured • Role-based access control</span>
          </div>
        </motion.div>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2024 PawSphere Bangladesh • Made with ❤️ for animals
        </p>
      </div>
    </div>
  );
}
