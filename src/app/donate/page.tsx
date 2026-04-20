'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, PieChart, DollarSign } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Button, ProgressBar, SectionHeader } from '@/components/ui';
import { mockDonations } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const PIE_COLORS = ['#FF8C42', '#2EC4B6', '#A855F7', '#3B82F6', '#10B981'];

const monthlyData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 62000 },
  { month: 'Mar', amount: 58000 },
  { month: 'Apr', amount: 91000 },
  { month: 'May', amount: 87000 },
  { month: 'Jun', amount: 142000 },
];

const donationAmounts = [500, 1000, 2000, 5000, 10000];

export default function DonatePage() {
  const { t } = useAppStore();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedType, setSelectedType] = useState('Medical Fund');
  const [donating, setDonating] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleDonate = async () => {
    if (!finalAmount || finalAmount < 100) {
      toast.error('Minimum donation is ৳100');
      return;
    }
    setDonating(true);
    await new Promise(r => setTimeout(r, 1500));
    setDonating(false);
    toast.success(`❤️ Thank you! ৳${finalAmount.toLocaleString()} donated to ${selectedType}.`);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title={t('donate.title')} subtitle={t('donate.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="font-display font-bold text-white text-lg mb-5">Make a Donation</h3>

              {/* Donation Type */}
              <div className="space-y-2 mb-5">
                <label className="text-sm font-medium text-white/70">Donate To</label>
                {['Medical Fund', 'Food & Nutrition', 'Shelter Maintenance', 'Ambulance Service'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={clsx(
                      'w-full text-left px-4 py-3 rounded-xl text-sm transition-all border flex items-center gap-3',
                      selectedType === type
                        ? 'border-primary-400 bg-primary-400/10 text-primary-400'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    )}
                  >
                    <span>
                      {type === 'Medical Fund' ? '💊' : type === 'Food & Nutrition' ? '🍖' : type === 'Shelter Maintenance' ? '🏠' : '🚑'}
                    </span>
                    {type}
                  </button>
                ))}
              </div>

              {/* Amount Grid */}
              <div className="mb-4">
                <label className="text-sm font-medium text-white/70 block mb-2">Select Amount (BDT)</label>
                <div className="grid grid-cols-3 gap-2">
                  {donationAmounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={clsx(
                        'py-2 rounded-xl text-sm font-semibold transition-all border',
                        selectedAmount === amt && !customAmount
                          ? 'border-primary-400 bg-primary-400/20 text-primary-400'
                          : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                      )}
                    >
                      ৳{amt >= 1000 ? `${amt / 1000}K` : amt}
                    </button>
                  ))}
                  <button
                    onClick={() => { setSelectedAmount(null); }}
                    className={clsx(
                      'py-2 rounded-xl text-sm font-semibold transition-all border',
                      !selectedAmount
                        ? 'border-primary-400 bg-primary-400/20 text-primary-400'
                        : 'border-white/10 bg-white/5 text-white/70'
                    )}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {!selectedAmount && (
                <div className="mb-4">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    placeholder="Enter amount in BDT"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-primary-400 text-sm"
                  />
                </div>
              )}

              {finalAmount && (
                <div className="mb-4 p-3 bg-white/5 rounded-xl text-sm">
                  <div className="flex justify-between text-white/60 mb-1">
                    <span>Donation Amount</span><span>৳{finalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total</span><span>৳{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button variant="primary" className="w-full" onClick={handleDonate} disabled={donating}>
                <Heart size={16} />
                {donating ? 'Processing...' : t('donate.donateNow')}
              </Button>

              <p className="text-white/30 text-xs text-center mt-3">
                🔒 Secure payment • 100% goes to animals
              </p>
            </Card>

            {/* Recent Donors */}
            <Card className="p-5">
              <h4 className="font-semibold text-white mb-4">Recent Donors</h4>
              <div className="space-y-3">
                {mockDonations.recentDonors.map((donor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400/20 to-secondary-400/20 flex items-center justify-center text-xs font-bold text-white">
                        {donor.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm">{donor.name}</p>
                        <p className="text-white/40 text-xs">{donor.type}</p>
                      </div>
                    </div>
                    <span className="text-primary-400 font-semibold text-sm">৳{donor.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Transparency Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Raised', value: `৳${(mockDonations.totalRaised / 1000).toFixed(0)}K`, icon: '💰', color: 'text-primary-400' },
                { label: 'Total Donors', value: mockDonations.totalDonors.toLocaleString(), icon: '❤️', color: 'text-red-400' },
                { label: 'Animals Helped', value: '1,200+', icon: '🐾', color: 'text-secondary-400' },
              ].map(s => (
                <Card key={s.label} className="p-5 text-center">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-white/40 text-xs mt-1">{s.label}</p>
                </Card>
              ))}
            </div>

            {/* Allocation Pie */}
            <Card className="p-6">
              <h4 className="font-display font-bold text-white mb-5">{t('donate.transparency')}</h4>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-48 h-48 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={mockDonations.breakdown} dataKey="amount" cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="none">
                        {mockDonations.breakdown.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [`৳${v.toLocaleString()}`, '']}
                        contentStyle={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {mockDonations.breakdown.map((item, i) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i] }} />
                          <span className="text-white text-sm">{item.category}</span>
                        </div>
                        <span className="text-white/60 text-sm">{item.percentage}% • ৳{item.amount.toLocaleString()}</span>
                      </div>
                      <ProgressBar value={item.amount} max={mockDonations.totalRaised} color={i % 2 === 0 ? 'primary' : 'secondary'} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Monthly Trend */}
            <Card className="p-6">
              <h4 className="font-display font-bold text-white mb-5">Monthly Donations (BDT)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF8C42" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF8C42" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}K`} />
                  <Tooltip
                    formatter={(v: number) => [`৳${v.toLocaleString()}`, 'Donations']}
                    contentStyle={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#FF8C42" strokeWidth={2} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
