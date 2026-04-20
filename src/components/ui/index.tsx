'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';

// Badge
export function Badge({ children, variant = 'default', className }: {
  children: React.ReactNode;
  variant?: 'default' | 'emergency' | 'moderate' | 'safe' | 'pending' | 'accepted' | 'inProgress' | 'completed';
  className?: string;
}) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      variant === 'emergency' && 'bg-red-500/20 text-red-400 border border-red-500/30',
      variant === 'moderate' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      variant === 'safe' && 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      variant === 'pending' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      variant === 'accepted' && 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      variant === 'inProgress' && 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      variant === 'completed' && 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      variant === 'default' && 'bg-white/10 [color:var(--text-secondary)]',
      className
    )}>
      {children}
    </span>
  );
}

// Button
export function Button({ children, variant = 'primary', size = 'md', className, onClick, type = 'button', disabled }: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-7 py-3.5 text-base',
        variant === 'primary' && 'bg-gradient-to-r from-primary-400 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-400/30',
        variant === 'secondary' && 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white hover:shadow-lg hover:shadow-secondary-400/30',
        variant === 'ghost' && 'bg-transparent hover:bg-white/10 border border-white/10 [color:var(--text-secondary)] hover:[color:var(--text-primary)]',
        variant === 'danger' && 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30',
        variant === 'glass' && 'glass text-white hover:bg-white/15',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

// Card
export function Card({ children, className, onClick, hover }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={clsx(
        'glass rounded-2xl border border-white/10',
        hover && 'cursor-pointer transition-all duration-300 hover:border-primary-400/30 hover:shadow-lg hover:shadow-primary-400/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Stat Card
export function StatCard({ icon, label, value, trend, color = 'primary' }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'primary' | 'secondary' | 'green' | 'purple';
}) {
  return (
    <Card className="p-5">
      <div className={clsx(
        'w-12 h-12 rounded-2xl flex items-center justify-center mb-4',
        color === 'primary' && 'bg-primary-400/20 text-primary-400',
        color === 'secondary' && 'bg-secondary-400/20 text-secondary-400',
        color === 'green' && 'bg-emerald-500/20 text-emerald-400',
        color === 'purple' && 'bg-purple-500/20 text-purple-400',
      )}>
        {icon}
      </div>
      <p className="text-white/50 text-sm">{label}</p>
      <p className="text-white font-bold text-2xl mt-1">{value}</p>
      {trend && <p className="text-emerald-400 text-sm mt-1">{trend}</p>}
    </Card>
  );
}

// Input
export function Input({ label, error, ...props }: {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <input
        {...props}
        className={clsx(
          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 outline-none transition-all text-sm',
          'focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20',
          error ? 'border-red-500/50' : 'border-white/10',
          props.className
        )}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// Textarea
export function Textarea({ label, error, ...props }: {
  label?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <textarea
        {...props}
        className={clsx(
          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 outline-none transition-all text-sm resize-none',
          'focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20',
          error ? 'border-red-500/50' : 'border-white/10',
          props.className
        )}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// Select
export function Select({ label, children, ...props }: {
  label?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <select
        {...props}
        className="w-full px-4 py-3 rounded-xl bg-dark-card border border-white/10 text-white outline-none transition-all text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
      >
        {children}
      </select>
    </div>
  );
}

// Avatar
export function Avatar({ name, image, size = 'md' }: {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  return (
    <div className={clsx(
      'rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold overflow-hidden',
      sizes[size]
    )}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </div>
  );
}

// Rating Stars
export function Rating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < Math.floor(value) ? 'text-amber-400' : 'text-white/20'}>
          ★
        </span>
      ))}
      <span className="text-white/60 text-xs ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

// Section Header
export function SectionHeader({ title, subtitle, action }: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">{title}</h2>
        {subtitle && <p className="text-white/50 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// Progress Bar
export function ProgressBar({ value, max, color = 'primary' }: {
  value: number;
  max: number;
  color?: 'primary' | 'secondary' | 'green';
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={clsx(
          'h-full rounded-full',
          color === 'primary' && 'bg-gradient-to-r from-primary-400 to-primary-500',
          color === 'secondary' && 'bg-gradient-to-r from-secondary-400 to-secondary-500',
          color === 'green' && 'bg-gradient-to-r from-emerald-400 to-emerald-500',
        )}
      />
    </div>
  );
}

// Empty State
export function EmptyState({ icon, title, description, action }: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}
