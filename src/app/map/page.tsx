'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Heart, Stethoscope, Coffee, Ambulance, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button } from '@/components/ui';
import { mockMapMarkers, mockRescueCases } from '@/lib/mockData';
import { clsx } from 'clsx';

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { ssr: false });

const filters = [
  { key: 'all', label: 'All', icon: MapPin },
  { key: 'rescue', label: 'Rescues', icon: AlertTriangle },
  { key: 'shelter', label: 'Shelters', icon: Heart },
  { key: 'vet', label: 'Vets', icon: Stethoscope },
  { key: 'feeding', label: 'Feeding', icon: Coffee },
  { key: 'ambulance', label: 'Ambulance', icon: Ambulance },
];

export default function MapPage() {
  const { t } = useAppStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const filteredMarkers = activeFilter === 'all'
    ? mockMapMarkers
    : mockMapMarkers.filter(m => m.type === activeFilter);

  return (
    <PageLayout>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        {/* Filter Bar */}
        <div className="glass border-b border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="text-white/50 text-sm shrink-0 flex items-center gap-1">
              <Filter size={14} /> Filter:
            </span>
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all shrink-0',
                    activeFilter === f.key
                      ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                      : 'glass text-white/60 hover:text-white border border-white/10'
                  )}
                >
                  <Icon size={13} />
                  {f.label}
                  <span className="bg-white/10 px-1.5 rounded text-xs">
                    {f.key === 'all' ? mockMapMarkers.length : mockMapMarkers.filter(m => m.type === f.key).length}
                  </span>
                </button>
              );
            })}

            {/* Legend */}
            <div className="ml-auto flex items-center gap-3 shrink-0">
              {[
                { color: 'bg-red-500', label: 'Emergency' },
                { color: 'bg-amber-500', label: 'Moderate' },
                { color: 'bg-emerald-500', label: 'Safe' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span className="text-white/50 text-xs">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map + Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map */}
          <div className="flex-1 relative">
            <MapComponent markers={filteredMarkers} onMarkerSelect={setSelectedMarker} />

            {/* SOS Button */}
            <div className="absolute bottom-6 right-6 z-[1000]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-500/40 sos-pulse"
              >
                <AlertTriangle size={18} />
                {t('rescue.sos')}
              </motion.button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 glass border-l border-white/10 overflow-y-auto p-4 space-y-3 hidden lg:block">
            <h3 className="font-display font-bold text-white mb-4">
              {t('nav.map')} — Active Cases
            </h3>
            {mockRescueCases.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={clsx(
                  'p-3 rounded-xl border transition-all cursor-pointer',
                  selectedMarker === c.id
                    ? 'border-primary-400/50 bg-primary-400/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                )}
                onClick={() => setSelectedMarker(c.id)}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={clsx(
                    'w-2 h-2 rounded-full mt-1.5 shrink-0',
                    c.severity === 'emergency' && 'bg-red-500',
                    c.severity === 'moderate' && 'bg-amber-500',
                    c.severity === 'safe' && 'bg-emerald-500',
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{c.title}</p>
                    <p className="text-white/40 text-xs">{c.location.address}</p>
                  </div>
                  <Badge variant={c.status as 'pending' | 'accepted' | 'inProgress' | 'completed'}>
                    {c.status}
                  </Badge>
                </div>
                {c.image && (
                  <img src={c.image} alt={c.title} className="w-full h-24 object-cover rounded-lg" />
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-white/40 text-xs">AI Score: {Math.round(c.aiSeverityScore * 100)}%</span>
                  <span className="text-white/40 text-xs">{c.reportedBy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
