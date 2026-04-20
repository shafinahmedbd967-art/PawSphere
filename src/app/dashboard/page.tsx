'use client';

import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, StatCard, SectionHeader, Badge, ProgressBar, Avatar } from '@/components/ui';
import { mockDashboardStats, mockRescueCases, mockLeaderboard, mockDonations } from '@/lib/mockData';
import { TrendingUp, Users, HandHeart, Heart, AlertTriangle, Clock, Award } from 'lucide-react';

const PIE_COLORS = ['#FF8C42', '#2EC4B6', '#A855F7', '#3B82F6'];

const heatmapData = Array.from({ length: 7 }, (_, dayIdx) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day: dayIdx,
    hour,
    value: Math.floor(Math.random() * 10),
  }))
).flat();

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const heatmapGrid = days.map((day, d) =>
  Array.from({ length: 24 }, (_, h) => ({ day, hour: h, value: Math.floor(Math.random() * 10) }))
);

export default function DashboardPage() {
  const { t, user } = useAppStore();

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          title={t('dashboard.title')}
          subtitle="Real-time overview of PawSphere operations"
        />

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<AlertTriangle size={22} />}
            label={t('dashboard.totalRescues')}
            value={mockDashboardStats.totalRescues.toLocaleString()}
            trend="↑ 12% this month"
            color="primary"
          />
          <StatCard
            icon={<Users size={22} />}
            label={t('dashboard.activeVolunteers')}
            value={mockDashboardStats.activeVolunteers}
            trend="↑ 8 new this week"
            color="secondary"
          />
          <StatCard
            icon={<HandHeart size={22} />}
            label={t('dashboard.donations')}
            value={`৳${(mockDashboardStats.totalDonations / 1000).toFixed(0)}K`}
            trend="↑ ৳24K this week"
            color="green"
          />
          <StatCard
            icon={<Heart size={22} />}
            label={t('dashboard.pendingAdoptions')}
            value={mockDashboardStats.pendingAdoptions}
            trend="3 approved today"
            color="purple"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Rescue Trend */}
          <Card className="p-6 col-span-2">
            <h4 className="font-display font-bold text-white mb-5 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary-400" />
              Rescue Trend (2024)
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockDashboardStats.rescueTrend}>
                <defs>
                  <linearGradient id="rescueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8C42" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF8C42" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
                <Area type="monotone" dataKey="count" stroke="#FF8C42" strokeWidth={2} fill="url(#rescueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Animal Types */}
          <Card className="p-6">
            <h4 className="font-display font-bold text-white mb-5 flex items-center gap-2">
              <Heart size={16} className="text-secondary-400" />
              Animals by Type
            </h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={mockDashboardStats.animalTypes} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={70} stroke="none">
                  {mockDashboardStats.animalTypes.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {mockDashboardStats.animalTypes.map((item, i) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-white/60 text-sm">{item.type}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Heatmap */}
        <Card className="p-6 mb-6">
          <h4 className="font-display font-bold text-white mb-5">{t('dashboard.heatmap')} — Incident Activity by Hour</h4>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex gap-1 mb-1 pl-10">
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="flex-1 text-center text-white/20 text-[9px]">
                    {h % 6 === 0 ? `${h}h` : ''}
                  </div>
                ))}
              </div>
              {heatmapGrid.map((row, dayIdx) => (
                <div key={days[dayIdx]} className="flex gap-1 mb-1">
                  <div className="w-8 text-white/40 text-[10px] flex items-center">{days[dayIdx]}</div>
                  {row.map((cell, h) => (
                    <div
                      key={h}
                      className="flex-1 h-5 rounded-sm transition-all hover:scale-125 cursor-pointer"
                      style={{
                        background: cell.value === 0
                          ? 'rgba(255,255,255,0.03)'
                          : `rgba(255, 140, 66, ${cell.value / 10})`,
                      }}
                      title={`${days[dayIdx]} ${h}:00 — ${cell.value} incidents`}
                    />
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-white/30 text-xs">Less</span>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map(op => (
                  <div key={op} className="w-4 h-4 rounded-sm" style={{ background: `rgba(255,140,66,${op})` }} />
                ))}
                <span className="text-white/30 text-xs">More</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <Card className="p-6 col-span-2">
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" /> Recent Cases
            </h4>
            <div className="space-y-3">
              {mockRescueCases.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    c.severity === 'emergency' ? 'bg-red-500' : c.severity === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.title}</p>
                    <p className="text-white/40 text-xs">{c.location.address}</p>
                  </div>
                  <Badge variant={c.status as 'pending' | 'accepted' | 'inProgress' | 'completed'}>
                    {c.status}
                  </Badge>
                  <span className="text-white/30 text-xs shrink-0 flex items-center gap-1">
                    <Clock size={10} /> {c.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-6">
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Top Volunteers
            </h4>
            <div className="space-y-3">
              {mockLeaderboard.slice(0, 5).map((entry, i) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg w-6 text-center">
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `${entry.rank}.`}
                  </span>
                  <Avatar name={entry.name} image={entry.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{entry.name}</p>
                    <ProgressBar value={entry.points} max={2500} color={i === 0 ? 'primary' : 'secondary'} />
                  </div>
                  <span className="text-amber-400 font-bold text-sm shrink-0">{entry.points}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
