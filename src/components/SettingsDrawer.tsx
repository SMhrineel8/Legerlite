import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Store, 
  User, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { UserProfile, Language } from '../App';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onProfileUpdate: (profile: UserProfile) => void;
  onLanguageChange: (lang: Language) => void;
}

export function SettingsDrawer({ 
  isOpen, 
  onClose, 
  userProfile, 
  language, 
  labels, 
  onProfileUpdate, 
  onLanguageChange 
}: SettingsDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userProfile || {
    shopName: '',
    ownerName: '',
    whatsappPhone: '',
    city: '',
    language: 'en' as Language,
    gstNumber: ''
  });

  const settingsLabels = {
    en: {
      settings: 'Settings',
      businessInfo: 'Business Information',
      whatsappIntegration: 'WhatsApp Integration',
      language: 'Language',
      exportData: 'Export Data',
      shopName: 'Shop Name',
      ownerName: 'Owner Name',
      whatsappPhone: 'WhatsApp Phone',
      city: 'City',
      gstNumber: 'GST Number',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      exportPdf: 'Export PDF Reports',
      exportExcel: 'Export Excel Data',
      english: 'English',
      hindi: 'हिंदी',
      enableWhatsapp: 'Enable WhatsApp notifications',
      autoBackup: 'Auto backup to cloud'
    },
    hi: {
      settings: 'सेटिंग्स',
      businessInfo: 'व्यवसाय की जानकारी',
      whatsappIntegration: 'व्हाट्सएप एकीकरण',
      language: 'भाषा',
      exportData: 'डेटा निर्यात',
      shopName: 'दुकान का नाम',
      ownerName: 'मालिक का नाम',
      whatsappPhone: 'व्हाट्सएप फोन',
      city: 'शहर',
      gstNumber: 'जीएसटी नंबर',
      edit: 'संपादित करें',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      exportPdf: 'पीडीएफ रिपोर्ट निर्यात करें',
      exportExcel: 'एक्सेल डेटा निर्यात करें',
      english: 'English',
      hindi: 'हिंदी',
      enableWhatsapp: 'व्हाट्सएप नोटिफिकेशन सक्षम करें',
      autoBackup: 'क्लाउड में ऑटो बैकअप'
    }
  };

  const t = settingsLabels[language];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(userProfile || formData);
    setEditMode(false);
  };

  const sections = [
    {
      id: 'business',
      title: t.businessInfo,
      icon: Store,
      content: (
        <div className="space-y-4">
          {editMode ? (
            <>
              <div className="space-y-2">
                <Label>{t.shopName}</Label>
                <Input
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>{t.ownerName}</Label>
                <Input
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>{t.whatsappPhone}</Label>
                <Input
                  value={formData.whatsappPhone}
                  onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>{t.city}</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>{t.gstNumber}</Label>
                <Input
                  value={formData.gstNumber || ''}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  placeholder="Enter GST number"
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1 bg-deep-blue hover:bg-deep-blue/90">
                  {t.save}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  {t.cancel}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Store className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">{formData.shopName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">{formData.ownerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">{formData.whatsappPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">{formData.city}</span>
                </div>
                {formData.gstNumber && (
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{formData.gstNumber}</span>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setEditMode(true)} 
                variant="outline" 
                className="w-full rounded-xl"
              >
                {t.edit}
              </Button>
            </>
          )}
        </div>
      )
    },
    {
      id: 'whatsapp',
      title: t.whatsappIntegration,
      icon: Phone,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-primary">{t.enableWhatsapp}</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-primary">{t.autoBackup}</span>
            <Switch />
          </div>
        </div>
      )
    },
    {
      id: 'language',
      title: t.language,
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="flex bg-muted rounded-xl p-1">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              className={`flex-1 rounded-lg ${
                language === 'en' ? 'bg-deep-blue text-white' : 'text-text-secondary'
              }`}
              onClick={() => onLanguageChange('en')}
            >
              {t.english}
            </Button>
            <Button
              variant={language === 'hi' ? 'default' : 'ghost'}
              className={`flex-1 rounded-lg ${
                language === 'hi' ? 'bg-deep-blue text-white' : 'text-text-secondary'
              }`}
              onClick={() => onLanguageChange('hi')}
            >
              {t.hindi}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'export',
      title: t.exportData,
      icon: Download,
      content: (
        <div className="space-y-3">
          <Button variant="outline" className="w-full rounded-xl justify-start">
            <FileText className="w-4 h-4 mr-2" />
            {t.exportPdf}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            <Download className="w-4 h-4 mr-2" />
            {t.exportExcel}
          </Button>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-deep-blue p-6 flex items-center justify-between">
              <h2 className="text-white text-xl">{t.settings}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10 p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {sections.map((section) => (
                <Card key={section.id} className="rounded-2xl border-border-color">
                  <CardHeader 
                    className="pb-3 cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <CardTitle className="flex items-center justify-between text-text-primary">
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-deep-blue" />
                        {section.title}
                      </div>
                      {expandedSection === section.id ? (
                        <ChevronUp className="w-5 h-5 text-text-secondary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-text-secondary" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <CardContent className="pt-0">
                          {section.content}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}