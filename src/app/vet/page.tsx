'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Phone, Calendar, Star, MapPin, Clock, CheckCircle, X, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button, Input, Select, Rating, SectionHeader } from '@/components/ui';
import { mockVets } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

export default function VetPage() {
  const { t } = useAppStore();
  const [selectedVet, setSelectedVet] = useState<typeof mockVets[0] | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = mockVets.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = () => {
    toast.success(`📅 Appointment booked with ${selectedVet?.name}! Confirmation sent.`);
    setShowBooking(false);
    setSelectedVet(null);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title={t('vet.title')} subtitle={t('vet.subtitle')} />

        {/* Emergency Banner */}
        <div className="mb-8 p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <p className="text-white font-semibold">24/7 Emergency Veterinary Hotline</p>
              <p className="text-white/50 text-sm">Available around the clock for critical cases</p>
            </div>
          </div>
          <Button variant="danger">
            <Phone size={16} /> Call: 16789
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, specialty, or location..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-primary-400 text-sm"
          />
        </div>

        {/* Vet Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((vet, i) => (
            <motion.div
              key={vet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="p-6" onClick={() => setSelectedVet(vet)}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-400/20 to-secondary-500/10 flex items-center justify-center text-3xl overflow-hidden shrink-0">
                    <img src={vet.image} alt={vet.name} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-bold truncate">{vet.name}</h3>
                      {vet.verified && (
                        <CheckCircle size={16} className="text-secondary-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-white/50 text-sm">{vet.specialty}</p>
                    <Rating value={vet.rating} />
                  </div>
                </div>

                <p className="text-white/70 text-sm font-medium mb-1">{vet.hospital}</p>
                <div className="flex items-center gap-1 text-white/40 text-xs mb-3">
                  <MapPin size={11} /> {vet.location.address}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vet.services.slice(0, 3).map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 bg-white/5 text-white/60 rounded-lg border border-white/10">{s}</span>
                  ))}
                  {vet.services.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-white/5 text-white/40 rounded-lg">+{vet.services.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1 text-white/40">
                    <Clock size={12} />
                    <span>{vet.nextAvailable}</span>
                  </div>
                  <Badge variant={vet.available ? 'safe' : 'moderate'}>
                    {vet.available ? '● Available' : '● Busy'}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    className="flex-1"
                    onClick={e => { e.stopPropagation(); setSelectedVet(vet); setShowBooking(true); }}
                    disabled={!vet.available}
                  >
                    <Calendar size={13} /> Book
                  </Button>
                  <Button size="sm" variant="ghost" onClick={e => e.stopPropagation()}>
                    <Phone size={13} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* My Appointments */}
        <div className="mt-12">
          <SectionHeader title="My Appointments" subtitle="Upcoming and past vet visits" />
          <div className="space-y-3">
            {[
              { vet: 'Dr. Sumaiya Akter', animal: 'Luna (Dog)', date: 'Jun 5, 2024', time: '10:00 AM', status: 'upcoming', type: 'Vaccination' },
              { vet: 'Dr. Karim Rahman', animal: 'Mochi (Cat)', date: 'May 28, 2024', time: '2:30 PM', status: 'completed', type: 'Wellness Check' },
            ].map((apt, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary-400/10 flex items-center justify-center text-2xl">
                      {apt.status === 'upcoming' ? '📅' : '✅'}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{apt.vet}</p>
                      <p className="text-white/50 text-sm">{apt.animal} • {apt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white text-sm">{apt.date}</p>
                      <p className="text-white/40 text-xs">{apt.time}</p>
                    </div>
                    <Badge variant={apt.status === 'upcoming' ? 'accepted' : 'completed'}>
                      {apt.status}
                    </Badge>
                    {apt.status === 'upcoming' && (
                      <Button size="sm" variant="ghost">Reschedule</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedVet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-white/10 p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-white">Book with {selectedVet.name}</h2>
                <button onClick={() => setShowBooking(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Your Pet's Name" placeholder="e.g. Luna" />
                <Select label="Animal Type">
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Other</option>
                </Select>
                <Select label="Service">
                  {selectedVet.services.map(s => <option key={s}>{s}</option>)}
                </Select>
                <Input label="Preferred Date" type="date" />
                <Select label="Preferred Time">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </Select>
                <Input label="Notes (optional)" placeholder="Describe symptoms or purpose..." />
                <div className="p-3 bg-white/5 rounded-xl text-sm">
                  <div className="flex justify-between text-white/60 mb-1">
                    <span>Consultation Fee</span>
                    <span>৳{selectedVet.fee}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total</span>
                    <span>৳{selectedVet.fee}</span>
                  </div>
                </div>
                <Button variant="primary" className="w-full" onClick={handleBook}>
                  <Calendar size={16} /> Confirm Appointment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
