import { cn } from '../../utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary:   'gov-btn-primary',
  secondary: 'gov-btn-secondary',
  danger:    'gov-btn-danger',
  success:   'gov-btn-success',
  ghost:     'bg-transparent text-[#1D0A69] hover:bg-[#F0FDFA] hover:text-[#115E59] px-4 py-2 rounded-lg text-base font-semibold transition-colors',
};

const sizeClass: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-base px-5 py-2.5',
  lg: 'text-lg px-6 py-3.5',
};

export function Button({
  variant = 'primary', size = 'md', icon, loading, children, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      className={cn(variantClass[variant], sizeClass[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {children}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </span>
      )}
    </button>
  );
}
