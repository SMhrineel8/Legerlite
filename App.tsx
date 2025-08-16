import React, { useState } from 'react';
import { motion } from 'motion/react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { InventoryScreen } from './components/InventoryScreen';
import { QuickAddScreen } from './components/QuickAddScreen';
import { InvoiceBuilderScreen } from './components/InvoiceBuilderScreen';
import { ClientsScreen } from './components/ClientsScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { SettingsDrawer } from './components/SettingsDrawer';
import { OfflineBanner } from './components/OfflineBanner';

export type Screen = 'onboarding' | 'dashboard' | 'inventory' | 'quickadd' | 'invoice' | 'clients' | 'reports' | 'profile';
export type Language = 'en' | 'hi';

export interface UserProfile {
  shopName: string;
  ownerName: string;
  whatsappPhone: string;
  city: string;
  language: Language;
  gstNumber?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const labels = {
    en: {
      appName: 'Business Manager',
      home: 'Home',
      inventory: 'Inventory',
      orders: 'Orders',
      reports: 'Reports',
      profile: 'Profile'
    },
    hi: {
      appName: 'व्यवसाय प्रबंधक',
      home: 'होम',
      inventory: 'इन्वेंटरी',
      orders: 'ऑर्डर',
      reports: 'रिपोर्ट',
      profile: 'प्रोफ़ाइल'
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setLanguage(profile.language);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    const screenProps = {
      userProfile,
      language,
      labels: labels[language],
      onNavigate: setCurrentScreen,
      onSettingsOpen: () => setIsSettingsOpen(true)
    };

    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            language={language}
            labels={labels[language]}
            onComplete={handleOnboardingComplete}
            onLanguageChange={setLanguage}
          />
        );
      case 'dashboard':
        return <DashboardScreen {...screenProps} />;
      case 'inventory':
        return <InventoryScreen {...screenProps} />;
      case 'quickadd':
        return <QuickAddScreen {...screenProps} />;
      case 'invoice':
        return <InvoiceBuilderScreen {...screenProps} />;
      case 'clients':
        return <ClientsScreen {...screenProps} />;
      case 'reports':
        return <ReportsScreen {...screenProps} />;
      case 'profile':
        return <ProfileScreen {...screenProps} />;
      default:
        return <DashboardScreen {...screenProps} />;
    }
  };

  return (
    <div className="size-full bg-background-white flex flex-col relative overflow-hidden">
      {/* Offline Banner */}
      {isOffline && <OfflineBanner language={language} />}
      
      {/* Main Content */}
      <motion.div 
        className="flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderScreen()}
      </motion.div>

      {/* Bottom Navigation - only show after onboarding */}
      {userProfile && currentScreen !== 'onboarding' && (
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          labels={labels[language]}
        />
      )}

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProfile={userProfile}
        language={language}
        labels={labels[language]}
        onProfileUpdate={setUserProfile}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}