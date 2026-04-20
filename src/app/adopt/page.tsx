'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Filter, Search, Star, MapPin, CheckCircle, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button, Input, Select, SectionHeader } from '@/components/ui';
import { mockAnimalsForAdoption } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

export default function AdoptPage() {
  const { t } = useAppStore();
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState<typeof mockAnimalsForAdoption[0] | null>(null);
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const filtered = mockAnimalsForAdoption.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = speciesFilter === 'all' || a.species.toLowerCase() === speciesFilter;
    return matchSearch && matchSpecies;
  });

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleApply = (animal: typeof mockAnimalsForAdoption[0]) => {
    toast.success(`🐾 Application sent for ${animal.name}! The rescuer will contact you soon.`);
    setSelectedAnimal(null);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          title={t('adopt.title')}
          subtitle={t('adopt.subtitle')}
          action={
            <Button onClick={() => setShowMatchForm(true)} variant="secondary">
              ✨ Smart Match Me
            </Button>
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`${t('common.search')} animals...`}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none text-sm focus:border-primary-400"
            />
          </div>
          {['all', 'dog', 'cat', 'bird'].map(s => (
            <button
              key={s}
              onClick={() => setSpeciesFilter(s)}
              className={clsx(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize',
                speciesFilter === s
                  ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                  : 'glass text-white/60 hover:text-white border border-white/10'
              )}
            >
              {s === 'all' ? '🐾 All' : s === 'dog' ? '🐕 Dogs' : s === 'cat' ? '🐱 Cats' : '🐦 Birds'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card hover className="overflow-hidden" onClick={() => setSelectedAnimal(animal)}>
                <div className="relative h-52 overflow-hidden">
                  <img src={animal.image} alt={animal.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Like button */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(animal.id); }}
                    className="absolute top-3 right-3 w-9 h-9 glass rounded-xl flex items-center justify-center"
                  >
                    <Heart
                      size={16}
                      className={likedIds.has(animal.id) ? 'text-red-400 fill-red-400' : 'text-white/70'}
                    />
                  </button>

                  {/* Match Score */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 glass px-2 py-1 rounded-xl">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-bold">{animal.matchScore}% match</span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-bold text-lg">{animal.name}</h3>
                    <p className="text-white/70 text-sm">{animal.breed} • {animal.age}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge>{animal.species}</Badge>
                    <Badge>{animal.gender}</Badge>
                    {animal.health.vaccinated && <Badge variant="safe">💉 Vaccinated</Badge>}
                    {animal.health.neutered && <Badge variant="safe">✂️ Neutered</Badge>}
                  </div>

                  <div className="flex items-center gap-1 text-white/40 text-xs mb-3">
                    <MapPin size={11} />
                    <span>{animal.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {animal.behavior.map(b => (
                      <span key={b} className="text-xs px-2 py-0.5 bg-secondary-400/10 text-secondary-400 rounded-full border border-secondary-400/20">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="primary" className="flex-1" onClick={e => { e.stopPropagation(); handleApply(animal); }}>
                      <Heart size={13} /> {t('adopt.applyAdopt')}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={e => e.stopPropagation()}>
                      <MessageSquare size={13} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐾</div>
            <p className="text-white font-semibold text-xl mb-2">No animals found</p>
            <p className="text-white/40">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Animal Detail Modal */}
      <AnimatePresence>
        {selectedAnimal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setSelectedAnimal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-72">
                <img src={selectedAnimal.image} alt={selectedAnimal.name} className="w-full h-full object-cover rounded-t-3xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-3xl" />
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="absolute top-4 right-4 w-9 h-9 glass rounded-xl flex items-center justify-center"
                >
                  <X size={16} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="glass px-2 py-0.5 rounded-lg text-xs text-amber-400 flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> {selectedAnimal.matchScore}% match
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-3xl">{selectedAnimal.name}</h2>
                  <p className="text-white/70">{selectedAnimal.breed} • {selectedAnimal.age} • {selectedAnimal.gender}</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-white/70 leading-relaxed">{selectedAnimal.description}</p>

                {/* Health Status */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Health Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedAnimal.health).map(([key, val]) => (
                      <div key={key} className={clsx(
                        'flex items-center gap-2 p-2 rounded-xl text-sm',
                        val ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/30'
                      )}>
                        <CheckCircle size={14} className={val ? 'text-emerald-400' : 'text-white/20'} />
                        <span className="capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Behavior */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnimal.behavior.map(b => (
                      <span key={b} className="px-3 py-1.5 bg-secondary-400/10 text-secondary-400 rounded-xl text-sm border border-secondary-400/20">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>📍 {selectedAnimal.location}</span>
                  <span>🏠 {selectedAnimal.shelter}</span>
                </div>

                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1" onClick={() => handleApply(selectedAnimal)}>
                    <Heart size={16} /> Apply to Adopt
                  </Button>
                  <Button variant="ghost" className="flex-1">
                    <MessageSquare size={16} /> Chat with Rescuer
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Match Form */}
      <AnimatePresence>
        {showMatchForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowMatchForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-3xl border border-white/10 p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-white">✨ Smart Match</h2>
                <button onClick={() => setShowMatchForm(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <p className="text-white/50 text-sm mb-6">Answer a few questions and we'll find your perfect companion.</p>
              <div className="space-y-4">
                <Select label="Your Living Situation">
                  <option>Apartment (no yard)</option>
                  <option>House with small yard</option>
                  <option>House with large yard</option>
                </Select>
                <Select label="Activity Level">
                  <option>Low — I prefer relaxing</option>
                  <option>Moderate — Daily walks</option>
                  <option>High — Very active lifestyle</option>
                </Select>
                <Select label="Experience with Pets">
                  <option>First-time owner</option>
                  <option>Some experience</option>
                  <option>Very experienced</option>
                </Select>
                <Select label="Children at Home">
                  <option>No children</option>
                  <option>Young children (under 8)</option>
                  <option>Older children</option>
                </Select>
                <Select label="Preferred Animal">
                  <option>No preference</option>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                </Select>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setShowMatchForm(false);
                    toast.success('✨ 3 perfect matches found for you!');
                  }}
                >
                  Find My Match
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
