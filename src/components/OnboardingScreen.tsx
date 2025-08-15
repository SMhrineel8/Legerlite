import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import type { UserProfile, Language } from '../App';

interface OnboardingScreenProps {
  onOnboardingComplete: (userProfile: UserProfile) => void;
  language: Language;
}

export function OnboardingScreen({ onOnboardingComplete, language }: OnboardingScreenProps) {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const onboardingLabels: Record<Language, any> = {
    en: {
      welcome: 'Welcome!',
      subtitle: 'Please tell us about your business.',
      shopName: 'Shop Name',
      shopNamePlaceholder: 'e.g., Gupta Store',
      ownerName: 'Owner Name',
      ownerNamePlaceholder: 'e.g., Ramesh Gupta',
      whatsappPhone: 'WhatsApp Phone Number',
      phonePlaceholder: 'e.g., 9876543210',
      city: 'City',
      cityPlaceholder: 'e.g., Mumbai',
      onboard: 'Get Started',
      required: 'All fields are required.'
    },
    hi: {
      welcome: 'स्वागत है!',
      subtitle: 'कृपया हमें अपने व्यवसाय के बारे में बताएं।',
      shopName: 'दुकान का नाम',
      shopNamePlaceholder: 'जैसे, गुप्ता स्टोर',
      ownerName: 'मालिक का नाम',
      ownerNamePlaceholder: 'जैसे, रमेश गुप्ता',
      whatsappPhone: 'व्हाट्सएप फोन नंबर',
      phonePlaceholder: 'जैसे, 9876543210',
      city: 'शहर',
      cityPlaceholder: 'जैसे, मुंबई',
      onboard: 'शुरू करें',
      required: 'सभी फ़ील्ड अनिवार्य हैं।'
    }
  };

  const t = onboardingLabels[language];

  const handleOnboarding = () => {
    if (shopName && ownerName && whatsappPhone && city) {
      const newUserProfile: UserProfile = { shopName, ownerName, whatsappPhone, city };
      onOnboardingComplete(newUserProfile);
    } else {
      setError(t.required);
    }
  };

  return (
    <motion.div
      className="flex flex-col h-full bg-deep-blue text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-2">{t.welcome}</h1>
      <p className="text-white/80 mb-8">{t.subtitle}</p>

      <Card className="rounded-3xl p-6 bg-white shadow-xl">
        <CardContent className="p-0 space-y-4">
          <div>
            <label className="text-text-primary text-sm font-medium">{t.shopName}</label>
            <Input
              placeholder={t.shopNamePlaceholder}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-text-primary text-sm font-medium">{t.ownerName}</label>
            <Input
              placeholder={t.ownerNamePlaceholder}
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-text-primary text-sm font-medium">{t.whatsappPhone}</label>
            <Input
              placeholder={t.phonePlaceholder}
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-text-primary text-sm font-medium">{t.city}</label>
            <Input
              placeholder={t.cityPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      <motion.button
        onClick={handleOnboarding}
        className="w-full bg-white text-deep-blue font-bold py-4 rounded-xl mt-8 shadow-lg"
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
      >
        {t.onboard}
      </motion.button>
    </motion.div>
  );
}