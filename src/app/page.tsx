'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, Heart, MapPin, Users, TrendingUp, Award, Zap, Shield } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Button, Card } from '@/components/ui';
import { mockDashboardStats } from '@/lib/mockData';

const features = [
  { icon: '🗺️', title: 'Live Rescue Map', desc: 'Real-time map showing rescue cases, vets, shelters, and feeding zones across Bangladesh.', href: '/map', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: '🆘', title: 'Emergency Rescue', desc: 'Report injured animals instantly with AI-powered severity detection and volunteer dispatch.', href: '/rescue', color: 'from-red-500/20 to-red-600/10' },
  { icon: '🏠', title: 'Smart Adoption', desc: 'AI-powered matching connects animals with their perfect forever families.', href: '/adopt', color: 'from-pink-500/20 to-pink-600/10' },
  { icon: '🚑', title: 'Animal Ambulance', desc: 'Request and track animal ambulances in real-time like a ride-sharing app.', href: '/rescue', color: 'from-amber-500/20 to-amber-600/10' },
  { icon: '🏥', title: 'Vet Network', desc: 'Directory of certified vets with booking, ratings, and emergency contacts.', href: '/vet', color: 'from-emerald-500/20 to-emerald-600/10' },
  { icon: '🍖', title: 'Feeding & Donation', desc: 'Coordinate feeding zones and track donations with full transparency.', href: '/donate', color: 'from-orange-500/20 to-orange-600/10' },
  { icon: '👥', title: 'Volunteer Network', desc: 'Join thousands of volunteers. Get tasks, earn points, and climb the leaderboard.', href: '/volunteer', color: 'from-purple-500/20 to-purple-600/10' },
  { icon: '🏆', title: 'Gamification', desc: 'Earn badges and points for every rescue, feeding, and donation. Be an Animal Hero!', href: '/dashboard', color: 'from-yellow-500/20 to-yellow-600/10' },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: 'easeOut' },
});

export default function HomePage() {
  const { t } = useAppStore();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-400/5 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div {...fadeIn(0)} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-primary-400/20">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span className="text-primary-400 text-sm font-medium">{t('hero.badge')}</span>
            </motion.div>

            {/* Title */}
            <motion.h1 {...fadeIn(0.1)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
              <span className="text-6xl ml-3">🐾</span>
            </motion.h1>

            <motion.p {...fadeIn(0.2)} className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeIn(0.3)} className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link href="/rescue">
                <Button size="lg" variant="danger" className="sos-pulse">
                  <AlertTriangle size={20} />
                  {t('hero.ctaRescue')}
                </Button>
              </Link>
              <Link href="/adopt">
                <Button size="lg" variant="secondary">
                  <Heart size={20} />
                  {t('hero.ctaAdopt')}
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="ghost">
                  <MapPin size={20} />
                  {t('nav.map')}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeIn(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: `${mockDashboardStats.totalRescues.toLocaleString()}+`, label: t('hero.stats.rescued'), icon: '🐾' },
                { value: `${mockDashboardStats.activeVolunteers}+`, label: t('hero.stats.volunteers'), icon: '🙋' },
                { value: '24+', label: t('hero.stats.vets'), icon: '🩺' },
                { value: '12', label: t('hero.stats.shelters'), icon: '🏠' },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Everything animals <span className="gradient-text">need</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A complete ecosystem for animal welfare — from emergency rescue to forever homes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={f.href}>
                <Card hover className={`p-6 h-full bg-gradient-to-br ${f.color}`}>
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-12 border border-primary-400/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-400/20 px-3 py-1 rounded-full mb-6">
                <Zap size={14} className="text-primary-400" />
                <span className="text-primary-400 text-sm font-medium">AI-Powered</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                Smart rescue with <span className="gradient-text">AI assistance</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '🔍', title: 'Injury Detection', desc: 'AI analyzes uploaded photos to detect injuries and classify severity.' },
                  { icon: '📍', title: 'Auto Location', desc: 'Automatically pinpoints the rescue location using GPS.' },
                  { icon: '🤖', title: 'Smart Matching', desc: 'Matches adopters with compatible animals based on lifestyle.' },
                  { icon: '📊', title: 'Predictive Analytics', desc: 'Identifies hotspot areas before emergencies escalate.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'AI Accuracy', value: '94%', icon: <Shield size={20} /> },
                { label: 'Avg Response', value: '8 min', icon: <Zap size={20} /> },
                { label: 'Cases Analyzed', value: '2.4K', icon: <TrendingUp size={20} /> },
                { label: 'Matches Made', value: '412', icon: <Heart size={20} /> },
              ].map((s) => (
                <Card key={s.label} className="p-5 text-center">
                  <div className="text-primary-400 flex justify-center mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-white/50 text-xs mt-1">{s.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 col-span-1">
            <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-400" />
              Top Volunteers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Rahim Chowdhury', points: 2100, emoji: '🥇' },
                { name: 'Ahmed Hossain', points: 1250, emoji: '🥈' },
                { name: 'Fatema Khatun', points: 980, emoji: '🥉' },
              ].map((v) => (
                <div key={v.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{v.emoji}</span>
                    <span className="text-white text-sm">{v.name}</span>
                  </div>
                  <span className="text-primary-400 font-semibold text-sm">{v.points} pts</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 col-span-2">
            <h3 className="font-display font-bold text-white mb-4">Recent Rescues</h3>
            <div className="space-y-3">
              {[
                { title: 'Injured dog rescued from Mohakhali', time: '2h ago', status: 'inProgress', icon: '🐕' },
                { title: 'Abandoned kittens found in Dhanmondi', time: '4h ago', status: 'accepted', icon: '🐱' },
                { title: 'Bird with broken wing — Banani', time: '1d ago', status: 'completed', icon: '🐦' },
              ].map((r) => (
                <div key={r.title} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{r.title}</p>
                      <p className="text-white/40 text-xs">{r.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg status-${r.status}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center glass rounded-3xl p-16 border border-secondary-400/20">
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to make a <span className="gradient-text">difference?</span>
          </h2>
          <p className="text-white/50 text-lg mb-8">Join 342 volunteers already making Bangladesh safer for animals.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/volunteer">
              <Button size="lg" variant="primary">
                <Users size={20} />
                Become a Volunteer
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="lg" variant="secondary">
                <Heart size={20} />
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-display font-bold text-white">PawSphere</span>
              <span className="text-white/30 text-sm">© 2024 — Bangladesh</span>
            </div>
            <p className="text-white/30 text-sm">Made with ❤️ for every animal in Bangladesh</p>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
