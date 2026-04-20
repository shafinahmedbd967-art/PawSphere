'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, Bell, PenSquare, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/appStore';
import { Card, Badge, Button, Textarea, Select, SectionHeader, Avatar } from '@/components/ui';
import { mockCommunityPosts } from '@/lib/mockData';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const typeColors: Record<string, string> = {
  successStory: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  lostPet: 'bg-red-500/20 text-red-400 border-red-500/30',
  helpNeeded: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};
const typeEmojis: Record<string, string> = {
  successStory: '🎉',
  lostPet: '🚨',
  helpNeeded: '🆘',
};

export default function CommunityPage() {
  const { t } = useAppStore();
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [showPost, setShowPost] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'successStory', title: '', content: '' });
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handlePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in title and content');
      return;
    }
    const post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date(),
      liked: false,
    };
    setPosts(prev => [post, ...prev]);
    setShowPost(false);
    setNewPost({ type: 'successStory', title: '', content: '' });
    toast.success('🐾 Post shared with the community!');
  };

  const filtered = activeFilter === 'all' ? posts : posts.filter(p => p.type === activeFilter);

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader
          title={t('community.title')}
          subtitle={t('community.subtitle')}
          action={
            <Button onClick={() => setShowPost(true)} variant="primary">
              <PenSquare size={14} /> {t('community.post')}
            </Button>
          }
        />

        {/* Lost Pet Alert Banner */}
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="text-white font-semibold text-sm">Enable Lost Pet Alerts</p>
              <p className="text-white/50 text-xs">Get notified when a pet is lost near you</p>
            </div>
          </div>
          <Button size="sm" variant="danger">
            <Bell size={13} /> Enable
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { key: 'all', label: '🐾 All' },
            { key: 'successStory', label: '🎉 Success Stories' },
            { key: 'lostPet', label: '🚨 Lost Pets' },
            { key: 'helpNeeded', label: '🆘 Help Needed' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={clsx(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0',
                activeFilter === f.key
                  ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                  : 'glass text-white/60 hover:text-white border border-white/10'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="overflow-hidden">
                {/* Post Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={post.author} image={post.avatar} />
                      <div>
                        <p className="text-white font-semibold text-sm">{post.author}</p>
                        <p className="text-white/40 text-xs">{formatDistanceToNow(post.createdAt, { addSuffix: true })}</p>
                      </div>
                    </div>
                    <span className={clsx('px-2.5 py-1 rounded-xl text-xs font-semibold border', typeColors[post.type])}>
                      {typeEmojis[post.type]} {post.type === 'successStory' ? 'Success Story' : post.type === 'lostPet' ? 'Lost Pet' : 'Help Needed'}
                    </span>
                  </div>

                  <h3 className="text-white font-bold mb-2">{post.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="px-5 pb-4">
                    <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl" />
                  </div>
                )}

                {/* Actions */}
                <div className="px-5 py-4 border-t border-white/10 flex items-center gap-1">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={clsx(
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                      post.liked ? 'text-red-400 bg-red-400/10' : 'text-white/50 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Heart size={15} className={post.liked ? 'fill-red-400' : ''} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all">
                    <MessageSquare size={15} />
                    {post.comments}
                  </button>
                  <button
                    onClick={() => toast.success('Link copied!')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Share2 size={15} />
                    {post.shares}
                  </button>
                  {post.type === 'lostPet' && (
                    <button
                      onClick={() => toast.success('Shared to 48 volunteers nearby!')}
                      className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all border border-red-500/30"
                    >
                      🔔 Spread Alert
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowPost(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="glass rounded-3xl border border-white/10 p-8 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-white">Share with Community</h2>
                <button onClick={() => setShowPost(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Select
                  label="Post Type"
                  value={newPost.type}
                  onChange={e => setNewPost(p => ({ ...p, type: e.target.value }))}
                >
                  <option value="successStory">🎉 Success Story</option>
                  <option value="lostPet">🚨 Lost Pet Alert</option>
                  <option value="helpNeeded">🆘 Help Needed</option>
                </Select>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-1.5">Title</label>
                  <input
                    value={newPost.title}
                    onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                    placeholder="Give your post a title..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-primary-400 text-sm"
                  />
                </div>
                <Textarea
                  label="Your Story"
                  value={newPost.content}
                  onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                  placeholder="Share your experience, alert, or request..."
                  rows={4}
                />
                <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400/40 transition-all">
                  <p className="text-white/40 text-sm">📷 Add Photo (optional)</p>
                </div>
                <Button variant="primary" className="w-full" onClick={handlePost}>
                  Share Post
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
