'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, AlertTriangle, Heart, Stethoscope, Users, HandHeart,
  MessageSquare, LayoutDashboard, Bell, Sun, Moon, Globe,
  Menu, X, LogIn, ChevronDown, Award, Paw
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { clsx } from 'clsx';

const navItems = [
  { href: '/map', icon: MapPin, key: 'nav.map' },
  { href: '/rescue', icon: AlertTriangle, key: 'nav.rescue' },
  { href: '/adopt', icon: Heart, key: 'nav.adopt' },
  { href: '/vet', icon: Stethoscope, key: 'nav.vet' },
  { href: '/volunteer', icon: Users, key: 'nav.volunteer' },
  { href: '/donate', icon: HandHeart, key: 'nav.donate' },
  { href: '/community', icon: MessageSquare, key: 'nav.community' },
  { href: '/dashboard', icon: LayoutDashboard, key: 'nav.dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, setLanguage, theme, toggleTheme, user, notifications, markNotificationRead, unreadCount } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const count = unreadCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center glow-primary">
              <span className="text-white text-lg">🐾</span>
            </div>
            <span className="font-display font-bold text-xl text-white">
              Paw<span className="gradient-text">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-primary-400/20 text-primary-400 glow-primary'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Icon size={14} />
                  <span>{t(item.key)}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-white/70 hover:text-white text-sm font-medium transition-all"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-all"
              >
                <Bell size={16} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-400 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-12 w-80 glass rounded-2xl border border-white/10 p-3 shadow-2xl"
                  >
                    <p className="text-white font-semibold px-2 pb-2 border-b border-white/10">{t('common.notifications')}</p>
                    <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                      {notifications.slice(0, 5).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={clsx(
                            'w-full text-left p-3 rounded-xl transition-all',
                            n.read ? 'opacity-50' : 'bg-white/5 hover:bg-white/10'
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-lg">
                              {n.type === 'emergency' ? '🚨' : n.type === 'adoption' ? '🐾' : '📢'}
                            </span>
                            <div>
                              <p className="text-white text-sm font-medium">{n.title}</p>
                              <p className="text-white/50 text-xs mt-0.5">{n.message}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-white text-sm hidden sm:block">{user.name}</span>
                  <ChevronDown size={14} className="text-white/50" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-400/30 transition-all"
              >
                <LogIn size={14} />
                <span className="hidden sm:block">{t('nav.login')}</span>
              </Link>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-white"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      active ? 'bg-primary-400/20 text-primary-400' : 'text-white/70 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon size={16} />
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
