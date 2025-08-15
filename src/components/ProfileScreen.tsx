import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Edit, LogOut, ReceiptText, Settings, Users, Package, BarChart3, ChevronRight, IndianRupee } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import type { Screen, UserProfile, Language } from '../App';

interface ProfileScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

export function ProfileScreen({ userProfile, language, onNavigate, onSettingsOpen }: ProfileScreenProps) {
  const profileLabels: Record<Language, any> = {
    en: {
      profile: 'Profile',
      edit: 'Edit',
      businessMetrics: 'Business Metrics',
      totalRevenue: 'Total Revenue',
      totalClients: 'Total Clients',
      totalOrders: 'Total Orders',
      totalProducts: 'Total Products',
      settings: 'Settings',
      manageAccount: 'Manage Account',
      logout: 'Logout'
    },
    hi: {
      profile: 'प्रोफ़ाइल',
      edit: 'संपादित करें',
      businessMetrics: 'व्यवसाय मेट्रिक्स',
      totalRevenue: 'कुल आय',
      totalClients: 'कुल ग्राहक',
      totalOrders: 'कुल ऑर्डर',
      totalProducts: 'कुल उत्पाद',
      settings: 'सेटिंग्स',
      manageAccount: 'खाता प्रबंधित करें',
      logout: 'लॉगआउट'
    }
  };

  const t = profileLabels[language];

  // Mock data for business metrics
  const businessMetrics = [
    { title: t.totalRevenue, value: '₹2,45,000', icon: IndianRupee },
    { title: t.totalClients, value: '5', icon: Users },
    { title: t.totalOrders, value: '130', icon: ReceiptText },
    { title: t.totalProducts, value: '50', icon: Package },
  ];

  const settingsOptions = [
    { title: t.manageAccount, icon: Settings, action: onSettingsOpen },
    { title: t.logout, icon: LogOut, action: () => console.log('Logout') },
  ];

  return (
    <div className="flex flex-col h-full bg-background-white">
      <motion.div
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl mb-4">{t.profile}</h1>
      </motion.div>

      <div className="flex-1 overflow-auto p-6 pb-24">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* User Info Card */}
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-text-primary text-xl font-bold">{userProfile?.shopName || 'Shop Name'}</h3>
                  <button onClick={() => console.log('Edit Profile')} whileTap={{ scale: 0.95 }}>
                    <Edit className="w-4 h-4 text-deep-blue" />
                  </button>
                </div>
                <p className="text-text-secondary text-sm mb-2">{userProfile?.ownerName || 'Owner Name'}</p>
                <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                  <Phone className="w-4 h-4" />
                  <span>{userProfile?.whatsappPhone || 'Phone Number'}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile?.city || 'City'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Metrics */}
          <div>
            <h2 className="text-lg font-semibold mb-4">{t.businessMetrics}</h2>
            <div className="grid grid-cols-2 gap-3">
              {businessMetrics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="rounded-2xl border-border-color shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-deep-blue" />
                        <span className="text-text-secondary text-sm">{item.title}</span>
                      </div>
                      <span className="text-text-primary text-xl font-semibold">{item.value}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Settings Options */}
          <div>
            <h2 className="text-lg font-semibold mb-4">{t.settings}</h2>
            <div className="space-y-3">
              {settingsOptions.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.action}
                  className="w-full flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-border-color shadow-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#E0E7FF' }}>
                      <item.icon className="w-6 h-6 text-deep-blue" />
                    </div>
                    <span className="text-text-primary font-medium">{item.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-secondary" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}