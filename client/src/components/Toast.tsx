import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111c2d] text-white px-4 py-3 rounded-xl shadow-warm-lg border border-white/10 animate-bounce duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
