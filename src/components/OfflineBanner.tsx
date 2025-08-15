import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import type { Language } from '../App';

interface OfflineBannerProps {
  language: Language;
}

export function OfflineBanner({ language }: OfflineBannerProps) {
  const offlineLabels: Record<Language, any> = {
    en: {
      offline: 'Offline',
      message: 'You are currently offline. Any changes will be synced once you are back online.'
    },
    hi: {
      offline: 'ऑफ़लाइन',
      message: 'आप वर्तमान में ऑफ़लाइन हैं। ऑनलाइन होने पर सभी बदलाव सिंक हो जाएंगे।'
    }
  };

  const t = offlineLabels[language];

  return (
    <motion.div
      className="bg-yellow-500 text-white p-3 flex items-center justify-center gap-2"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Smartphone className="w-5 h-5" />
      <span className="text-sm font-medium">{t.offline}: {t.message}</span>
    </motion.div>
  );
}
