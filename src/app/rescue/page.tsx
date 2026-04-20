'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Upload, Phone, Clock, CheckCircle, Zap, Ambulance } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button, Input, Textarea, Select, SectionHeader } from '@/components/ui';
import { mockRescueCases } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const statusSteps = ['pending', 'accepted', 'inProgress', 'completed'];

export default function RescuePage() {
  const { t } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'cases' | 'ambulance'>('cases');
  const [form, setForm] = useState({ title: '', description: '', severity: 'moderate', location: '', contact: '' });
  const [submitting, setSubmitting] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ score: number; severity: string } | null>(null);

  const handleSubmit = async () => {
    if (!form.title || !form.location) {
      toast.error('Please fill in required fields');
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setShowForm(false);
    toast.success('🐾 Rescue request submitted! Volunteers notified.');
    setForm({ title: '', description: '', severity: 'moderate', location: '', contact: '' });
  };

  const simulateAI = async () => {
    setAiAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    const score = Math.random() * 0.6 + 0.3;
    setAiResult({
      score,
      severity: score > 0.7 ? 'emergency' : score > 0.4 ? 'moderate' : 'safe',
    });
    setAiAnalyzing(false);
    toast.success('AI analysis complete!');
  };

  const handleSOS = () => {
    toast.error('🚨 SOS sent! Nearby volunteers and vets notified.', { duration: 5000 });
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">{t('rescue.title')}</h1>
            <p className="text-white/50 mt-1">{t('rescue.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSOS}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl sos-pulse shadow-lg shadow-red-500/30"
            >
              <AlertTriangle size={18} />
              {t('rescue.sos')}
            </motion.button>
            <Button onClick={() => setShowForm(true)} variant="primary">
              + {t('rescue.newRequest')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Cases', value: '12', icon: '🆘', color: 'text-red-400' },
            { label: 'In Progress', value: '5', icon: '⚡', color: 'text-purple-400' },
            { label: 'Completed Today', value: '8', icon: '✅', color: 'text-emerald-400' },
            { label: 'Avg Response', value: '8 min', icon: '⏱', color: 'text-blue-400' },
          ].map((s) => (
            <Card key={s.label} className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'cases', label: 'Rescue Cases', icon: AlertTriangle },
            { key: 'ambulance', label: 'Ambulance', icon: Ambulance },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'cases' | 'ambulance')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                activeTab === key
                  ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                  : 'glass text-white/60 hover:text-white border border-white/10'
              )}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {activeTab === 'cases' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {mockRescueCases.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  {c.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant={c.severity as 'emergency' | 'moderate' | 'safe'}>
                          {c.severity === 'emergency' ? '🔴' : c.severity === 'moderate' ? '🟡' : '🟢'} {c.severity}
                        </Badge>
                        <Badge variant={c.status as 'pending' | 'accepted' | 'inProgress' | 'completed'}>
                          {c.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white font-bold text-lg">{c.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{c.description}</p>

                    {/* Status Progress */}
                    <div className="flex items-center gap-1 mb-4">
                      {statusSteps.map((step, idx) => {
                        const currentIdx = statusSteps.indexOf(c.status);
                        const done = idx <= currentIdx;
                        return (
                          <div key={step} className="flex-1 flex items-center">
                            <div className={clsx(
                              'w-full h-1.5 rounded-full transition-all',
                              done ? 'bg-primary-400' : 'bg-white/10'
                            )} />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={11} />{c.location.address}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{c.createdAt.toLocaleTimeString()}</span>
                    </div>

                    {/* AI Score */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-4">
                      <span className="text-white/50 text-xs flex items-center gap-1"><Zap size={11} className="text-primary-400" />AI Severity Score</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full',
                              c.aiSeverityScore > 0.7 ? 'bg-red-500' : c.aiSeverityScore > 0.4 ? 'bg-amber-500' : 'bg-emerald-500'
                            )}
                            style={{ width: `${c.aiSeverityScore * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold text-xs">{Math.round(c.aiSeverityScore * 100)}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {c.status === 'pending' && (
                        <Button size="sm" variant="primary" className="flex-1">
                          Accept Case
                        </Button>
                      )}
                      {c.status === 'inProgress' && (
                        <Button size="sm" variant="secondary" className="flex-1">
                          Mark Complete
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Phone size={13} />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'ambulance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Request Form */}
            <Card className="p-6 col-span-1">
              <h3 className="font-display font-bold text-white mb-5">Request Ambulance</h3>
              <div className="space-y-4">
                <Input label="Pickup Location" placeholder="Enter your location" />
                <Input label="Animal Type" placeholder="e.g. Dog, Cat, Bird" />
                <Select label="Urgency">
                  <option value="emergency">Emergency</option>
                  <option value="moderate">Moderate</option>
                  <option value="scheduled">Scheduled</option>
                </Select>
                <Textarea label="Additional Notes" placeholder="Describe the animal's condition..." rows={3} />
                <Button variant="danger" className="w-full">
                  <Ambulance size={16} />
                  Request Ambulance
                </Button>
              </div>
            </Card>

            {/* Available Ambulances */}
            <div className="col-span-2 space-y-4">
              <h3 className="font-display font-bold text-white">Nearby Ambulances</h3>
              {[
                { id: 'A1', driver: 'Alam Hossain', plate: 'DHA-1234', eta: '5 min', distance: '1.2 km', status: 'available', rating: 4.8 },
                { id: 'A2', driver: 'Reza Khan', plate: 'DHA-5678', eta: '12 min', distance: '3.1 km', status: 'available', rating: 4.6 },
                { id: 'A3', driver: 'Mamun Islam', plate: 'DHA-9012', eta: '18 min', distance: '4.8 km', status: 'busy', rating: 4.9 },
              ].map((amb) => (
                <Card key={amb.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center text-2xl">
                        🚑
                      </div>
                      <div>
                        <p className="text-white font-semibold">{amb.driver}</p>
                        <p className="text-white/40 text-sm">{amb.plate} • {amb.distance} away</p>
                        <p className="text-amber-400 text-sm">⭐ {amb.rating}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={amb.status === 'available' ? 'safe' : 'moderate'}>
                        {amb.status}
                      </Badge>
                      <p className="text-white font-bold mt-1">ETA: {amb.eta}</p>
                      {amb.status === 'available' && (
                        <Button size="sm" variant="primary" className="mt-2">
                          Book Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Rescue Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl border border-white/10 p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">{t('rescue.newRequest')}</h2>
              <div className="space-y-4">
                <Input
                  label="Animal / Situation Title *"
                  placeholder="e.g. Injured dog near bus stand"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
                <Textarea
                  label={t('rescue.description')}
                  placeholder="Describe what you see..."
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                <Select
                  label={t('rescue.severity')}
                  value={form.severity}
                  onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}
                >
                  <option value="emergency">🔴 Emergency</option>
                  <option value="moderate">🟡 Moderate</option>
                  <option value="safe">🟢 Safe</option>
                </Select>
                <Input
                  label={`${t('rescue.location')} *`}
                  placeholder="Enter address or use GPS"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                />
                <Input
                  label="Your Contact Number"
                  placeholder="+880 1XXXXXXXXX"
                  value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                />

                {/* Image Upload */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-primary-400/50 transition-all cursor-pointer">
                  <Upload size={24} className="text-white/30 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">{t('rescue.uploadPhoto')}</p>
                  <p className="text-white/30 text-xs mt-1">PNG, JPG, MP4 up to 50MB</p>
                </div>

                {/* AI Analysis */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-sm flex items-center gap-1">
                      <Zap size={13} className="text-primary-400" /> AI Severity Analysis
                    </span>
                    <Button size="sm" variant="ghost" onClick={simulateAI}>
                      {aiAnalyzing ? 'Analyzing...' : 'Analyze Photo'}
                    </Button>
                  </div>
                  {aiResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full transition-all duration-1000',
                              aiResult.severity === 'emergency' ? 'bg-red-500' : aiResult.severity === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                            )}
                            style={{ width: `${aiResult.score * 100}%` }}
                          />
                        </div>
                        <Badge variant={aiResult.severity as 'emergency' | 'moderate' | 'safe'}>
                          {aiResult.severity} ({Math.round(aiResult.score * 100)}%)
                        </Badge>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" className="flex-1" onClick={() => setShowForm(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Submitting...' : t('rescue.submit')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
