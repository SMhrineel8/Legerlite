import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff, Smartphone } from 'lucide-react';
import type { Language } from '../App';

interface OfflineBannerProps {
  language: Language;
}

export function OfflineBanner({ language }: OfflineBannerProps) {
  const labels = {
    en: {
      offline: 'You are offline',
      message: 'Some features may be limited. Data will sync when connection is restored.'
    },
    hi: {
      offline: 'आप ऑफलाइन हैं',
      message: 'कुछ सुविधाएं सीमित हो सकती हैं। कनेक्शन बहाल होने पर डेटा सिंक होगा।'
    }
  };

  const t = labels[language];

  return (
    <motion.div
      className="bg-text-secondary text-white px-4 py-3 flex items-center gap-3"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <WifiOff className="w-5 h-5" />
      </motion.div>
      <div className="flex-1">
        <p className="text-sm">{t.offline}</p>
        <p className="text-xs opacity-90">{t.message}</p>
      </div>
      <motion.div
        className="w-2 h-2 bg-light-blue rounded-full"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}