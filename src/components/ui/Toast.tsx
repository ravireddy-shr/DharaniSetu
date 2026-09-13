import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

// Global event bus for toasts
type ToastListener = (toast: ToastMessage) => void;
const listeners: ToastListener[] = [];

export function toast(type: ToastType, title: string, message?: string) {
  const newToast: ToastMessage = {
    id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    title,
    message,
  };
  listeners.forEach(listener => listener(newToast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (newToast: ToastMessage) => {
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 4000);
    };

    listeners.push(handleToast);
    return () => {
      const idx = listeners.indexOf(handleToast);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-3 rounded-lg shadow-lg border text-xs transition-all duration-200 animate-in slide-in-from-right',
            t.type === 'success' && 'bg-emerald-50 border-emerald-200 text-emerald-900',
            t.type === 'error' && 'bg-red-50 border-red-200 text-red-900',
            t.type === 'info' && 'bg-blue-50 border-blue-200 text-blue-900'
          )}
        >
          <div className="flex-shrink-0 mt-0.5">
            {t.type === 'success' && <CheckCircle2 size={16} className="text-emerald-600" />}
            {t.type === 'error' && <AlertCircle size={16} className="text-red-600" />}
            {t.type === 'info' && <Info size={16} className="text-blue-600" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{t.title}</p>
            {t.message && <p className="mt-0.5 opacity-90">{t.message}</p>}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
