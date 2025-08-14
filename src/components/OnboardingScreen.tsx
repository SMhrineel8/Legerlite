import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, User, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Language, UserProfile } from '../App';

interface OnboardingScreenProps {
  language: Language;
  labels: any;
  onComplete: (profile: UserProfile) => void;
  onLanguageChange: (lang: Language) => void;
}

export function OnboardingScreen({ language, labels, onComplete, onLanguageChange }: OnboardingScreenProps) {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    whatsappPhone: '',
    city: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onboardingLabels = {
    en: {
      welcome: 'Welcome to Business Manager',
      subtitle: 'Set up your shop in just a few steps',
      shopName: 'Shop Name',
      shopNamePlaceholder: 'Enter your shop name',
      ownerName: 'Owner Name',
      ownerNamePlaceholder: 'Enter owner name',
      whatsappPhone: 'WhatsApp Phone',
      phonePlaceholder: '+91 XXXXX XXXXX',
      city: 'City',
      cityPlaceholder: 'Enter your city',
      language: 'Language',
      english: 'English',
      hindi: 'हिंदी',
      startTrial: 'Start Free Trial',
      required: 'This field is required'
    },
    hi: {
      welcome: 'व्यवसाय प्रबंधक में आपका स्वागत है',
      subtitle: 'कुछ ही चरणों में अपनी दुकान सेट करें',
      shopName: 'दुकान का नाम',
      shopNamePlaceholder: 'अपनी दुकान का नाम दर्ज करें',
      ownerName: 'मालिक का नाम',
      ownerNamePlaceholder: 'मालिक का नाम दर्ज करें',
      whatsappPhone: 'व्हाट्सएप फोन',
      phonePlaceholder: '+91 XXXXX XXXXX',
      city: 'शहर',
      cityPlaceholder: 'अपना शहर दर्ज करें',
      language: 'भाषा',
      english: 'English',
      hindi: 'हिंदी',
      startTrial: 'निःशुल्क परीक्षण शुरू करें',
      required: 'यह फ़ील्ड आवश्यक है'
    }
  };

  const t = onboardingLabels[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.shopName && formData.ownerName && formData.whatsappPhone && formData.city) {
      onComplete({
        ...formData,
        language
      });
    }
  };

  const isFormValid = formData.shopName && formData.ownerName && formData.whatsappPhone && formData.city;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-white to-accent-light-blue/10 flex flex-col">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue h-20 flex items-center justify-center relative"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Store className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl mb-2">{t.welcome}</h1>
            <p className="text-secondary">{t.subtitle}</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Shop Name */}
            <motion.div
              className="space-y-2"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Label htmlFor="shopName" className="text-secondary flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'shopName' ? 1.1 : 1,
                    color: focusedField === 'shopName' ? '#60A5FA' : '#9CA3AF'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Store className="w-4 h-4" />
                </motion.div>
                {t.shopName}
              </Label>
              <Input
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
                onFocus={() => setFocusedField('shopName')}
                onBlur={() => setFocusedField(null)}
                placeholder={t.shopNamePlaceholder}
                className={`h-14 rounded-2xl border-2 transition-all duration-200 ${
                  focusedField === 'shopName' 
                    ? 'border-deep-blue shadow-lg shadow-light-blue/20' 
                    : 'border-border-color'
                }`}
              />
            </motion.div>

            {/* Owner Name */}
            <motion.div
              className="space-y-2"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Label htmlFor="ownerName" className="text-secondary flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'ownerName' ? 1.1 : 1,
                    color: focusedField === 'ownerName' ? '#60A5FA' : '#9CA3AF'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="w-4 h-4" />
                </motion.div>
                {t.ownerName}
              </Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                onFocus={() => setFocusedField('ownerName')}
                onBlur={() => setFocusedField(null)}
                placeholder={t.ownerNamePlaceholder}
                className={`h-14 rounded-2xl border-2 transition-all duration-200 ${
                  focusedField === 'ownerName' 
                    ? 'border-deep-blue shadow-lg shadow-light-blue/20' 
                    : 'border-border-color'
                }`}
              />
            </motion.div>

            {/* WhatsApp Phone */}
            <motion.div
              className="space-y-2"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Label htmlFor="phone" className="text-secondary flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'phone' ? 1.1 : 1,
                    color: focusedField === 'phone' ? '#60A5FA' : '#9CA3AF'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.div>
                {t.whatsappPhone}
              </Label>
              <Input
                id="phone"
                value={formData.whatsappPhone}
                onChange={(e) => handleInputChange('whatsappPhone', e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder={t.phonePlaceholder}
                type="tel"
                className={`h-14 rounded-2xl border-2 transition-all duration-200 ${
                  focusedField === 'phone' 
                    ? 'border-deep-blue shadow-lg shadow-light-blue/20' 
                    : 'border-border-color'
                }`}
              />
            </motion.div>

            {/* City */}
            <motion.div
              className="space-y-2"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Label htmlFor="city" className="text-secondary flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'city' ? 1.1 : 1,
                    color: focusedField === 'city' ? '#60A5FA' : '#9CA3AF'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-4 h-4" />
                </motion.div>
                {t.city}
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField(null)}
                placeholder={t.cityPlaceholder}
                className={`h-14 rounded-2xl border-2 transition-all duration-200 ${
                  focusedField === 'city' 
                    ? 'border-deep-blue shadow-lg shadow-light-blue/20' 
                    : 'border-border-color'
                }`}
              />
            </motion.div>

            {/* Language Toggle */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Label className="text-secondary flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t.language}
              </Label>
              <div className="flex bg-muted rounded-2xl p-1 h-14">
                <motion.button
                  className={`flex-1 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-deep-blue text-white shadow-md' 
                      : 'text-text-secondary'
                  }`}
                  onClick={() => onLanguageChange('en')}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.english}
                </motion.button>
                <motion.button
                  className={`flex-1 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    language === 'hi' 
                      ? 'bg-deep-blue text-white shadow-md' 
                      : 'text-text-secondary'
                  }`}
                  onClick={() => onLanguageChange('hi')}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.hindi}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="p-6">
        <motion.div
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full h-14 rounded-2xl transition-all duration-300 ${
              isFormValid
                ? 'bg-deep-blue text-white shadow-lg shadow-light-blue/30 hover:shadow-xl hover:shadow-light-blue/40'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <motion.span
              animate={{ 
                scale: isFormValid ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              {t.startTrial}
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}