'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, MapPin, Star, CheckCircle, X, Zap } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button, Input, Select, Rating, SectionHeader, ProgressBar } from '@/components/ui';
import { mockVolunteers, mockLeaderboard } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const skillsList = ['Rescuer', 'Feeder', 'Transporter', 'Vet Assistant'];
const badgeEmojis: Record<string, string> = {
  topRescuer: '🏆',
  animalHero: '🦸',
  feedingGuardian: '🍖',
  donorChampion: '💰',
  vetHelper: '🩺',
};
const badgeNames: Record<string, string> = {
  topRescuer: 'Top Rescuer',
  animalHero: 'Animal Hero',
  feedingGuardian: 'Feeding Guardian',
  donorChampion: 'Donor Champion',
  vetHelper: 'Vet Helper',
};

export default function VolunteerPage() {
  const { t } = useAppStore();
  const [showRegister, setShowRegister] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'volunteers' | 'tasks' | 'leaderboard'>('volunteers');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleRegister = () => {
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    toast.success('🎉 Welcome to the volunteer network!');
    setShowRegister(false);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          title={t('volunteer.title')}
          subtitle={t('volunteer.subtitle')}
          action={
            <Button onClick={() => setShowRegister(true)} variant="primary">
              + {t('volunteer.register')}
            </Button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Volunteers', value: '342', icon: '👥', color: 'text-secondary-400' },
            { label: 'Tasks This Week', value: '89', icon: '✅', color: 'text-emerald-400' },
            { label: 'Total Points Given', value: '48K', icon: '⭐', color: 'text-amber-400' },
            { label: 'Districts Covered', value: '12', icon: '🗺️', color: 'text-purple-400' },
          ].map(s => (
            <Card key={s.label} className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { key: 'volunteers', label: 'Volunteers' },
            { key: 'tasks', label: 'Open Tasks' },
            { key: 'leaderboard', label: '🏆 Leaderboard' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={clsx(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0',
                activeTab === tab.key
                  ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                  : 'glass text-white/60 hover:text-white border border-white/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockVolunteers.map((vol, i) => (
              <motion.div
                key={vol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img src={vol.avatar} alt={vol.name} className="w-14 h-14 rounded-2xl bg-primary-400/10" />
                      {vol.available && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-dark-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold">{vol.name}</h3>
                      <div className="flex items-center gap-1 text-white/40 text-xs mb-1">
                        <MapPin size={10} /> {vol.location}
                      </div>
                      <Rating value={vol.rating} />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vol.skills.map(s => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="flex gap-1.5 mb-4">
                    {vol.badges.map(b => (
                      <span key={b} title={badgeNames[b]} className="text-xl cursor-help">{badgeEmojis[b]}</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-white/5 rounded-xl p-2">
                      <p className="text-primary-400 font-bold">{vol.rescues}</p>
                      <p className="text-white/40 text-xs">Rescues</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2">
                      <p className="text-secondary-400 font-bold">{vol.feedingRounds}</p>
                      <p className="text-white/40 text-xs">Feedings</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2">
                      <p className="text-amber-400 font-bold">{vol.points}</p>
                      <p className="text-white/40 text-xs">Points</p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={vol.available ? 'secondary' : 'ghost'}
                    className="w-full"
                    disabled={!vol.available}
                  >
                    {vol.available ? 'Assign Task' : 'Currently Busy'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {[
              { title: 'Feed street dogs at Mirpur 10', type: 'Feeder', points: 50, urgency: 'moderate', location: 'Mirpur 10, Dhaka', deadline: 'Today 6:00 PM' },
              { title: 'Transport rescued cat to vet clinic', type: 'Transporter', points: 75, urgency: 'emergency', location: 'Dhanmondi, Dhaka', deadline: 'ASAP' },
              { title: 'Assist Dr. Sumaiya during surgery', type: 'Vet Assistant', points: 100, urgency: 'moderate', location: 'Pet Care Clinic, Dhanmondi', deadline: 'Jun 5, 10:00 AM' },
              { title: 'Rescue injured dog near Mohakhali', type: 'Rescuer', points: 120, urgency: 'emergency', location: 'Mohakhali, Dhaka', deadline: 'ASAP' },
              { title: 'Setup feeding station in Banani', type: 'Feeder', points: 60, urgency: 'safe', location: 'Banani, Dhaka', deadline: 'Jun 6, 8:00 AM' },
            ].map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-3">
                      <div className={clsx(
                        'w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0',
                        task.urgency === 'emergency' ? 'bg-red-500/20' : task.urgency === 'moderate' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                      )}>
                        {task.type === 'Feeder' ? '🍖' : task.type === 'Transporter' ? '🚗' : task.type === 'Vet Assistant' ? '🩺' : '🆘'}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                          <span><MapPin size={10} className="inline mr-0.5" />{task.location}</span>
                          <span>⏰ {task.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <Badge variant={task.type === 'Rescuer' ? 'emergency' : 'default'}>{task.type}</Badge>
                      </div>
                      <div className="text-amber-400 font-bold text-sm">+{task.points} pts</div>
                      <Button size="sm" variant="primary">Accept</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-3">
            {mockLeaderboard.map((entry, i) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={clsx(
                  'p-5',
                  entry.rank === 1 && 'border-amber-400/40 bg-amber-400/5',
                  entry.rank === 2 && 'border-slate-300/30 bg-slate-300/5',
                  entry.rank === 3 && 'border-amber-600/30 bg-amber-600/5',
                )}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold w-8 text-center">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                    </div>
                    <img src={entry.avatar} alt={entry.name} className="w-12 h-12 rounded-2xl bg-white/5" />
                    <div className="flex-1">
                      <p className="text-white font-bold">{entry.name}</p>
                      <span className="text-xs">{badgeEmojis[entry.badge]} {badgeNames[entry.badge]}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold text-lg">{entry.points.toLocaleString()}</p>
                      <p className="text-white/40 text-xs">points</p>
                    </div>
                  </div>
                  {entry.rank <= 3 && (
                    <div className="mt-3">
                      <ProgressBar value={entry.points} max={2500} color={entry.rank === 1 ? 'primary' : 'secondary'} />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowRegister(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-white/10 p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-white">Join as Volunteer</h2>
                <button onClick={() => setShowRegister(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Full Name" placeholder="Your name" />
                <Input label="Phone Number" placeholder="+880 1XXXXXXXXX" />
                <Input label="Location / Upazila" placeholder="e.g. Dhanmondi, Dhaka" />
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Your Skills *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillsList.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={clsx(
                          'p-3 rounded-xl text-sm font-medium transition-all border text-left',
                          selectedSkills.includes(skill)
                            ? 'border-primary-400 bg-primary-400/10 text-primary-400'
                            : 'border-white/10 bg-white/5 text-white/60'
                        )}
                      >
                        <span className="mr-2">
                          {skill === 'Rescuer' ? '🆘' : skill === 'Feeder' ? '🍖' : skill === 'Transporter' ? '🚗' : '🩺'}
                        </span>
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <Select label="Availability">
                  <option>Weekdays only</option>
                  <option>Weekends only</option>
                  <option>Anytime</option>
                  <option>Emergency only</option>
                </Select>
                <Button variant="primary" className="w-full" onClick={handleRegister}>
                  <Zap size={16} /> Register as Volunteer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
