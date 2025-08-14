import React from 'react';
import { motion } from 'motion/react';
import { Edit, Store, User, Phone, MapPin, Globe, BarChart3, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { mockInventoryItems, mockEarningsData, businessMetrics } from '../constants/mockData';
import { profileLabels } from '../constants/labels';
import type { Screen, UserProfile, Language } from '../App';

interface ProfileScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

export function ProfileScreen({ userProfile, language, labels, onNavigate }: ProfileScreenProps) {
  const t = profileLabels[language];

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getLowStockItems = () => {
    return mockInventoryItems.filter(item => item.stock <= item.lowStockThreshold);
  };

  const getStockStatus = (item: any) => {
    if (item.stock === 0) return 'out';
    if (item.stock <= item.lowStockThreshold) return 'low';
    return 'good';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'out': return '#EF4444';
      case 'low': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const lowStockItems = getLowStockItems();
  const currentMonthEarnings = mockEarningsData[mockEarningsData.length - 1]?.thisMonth || 0;
  const previousMonthEarnings = mockEarningsData[mockEarningsData.length - 1]?.lastMonth || 0;
  const earningsGrowth = previousMonthEarnings > 0 
    ? Math.round(((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4 flex items-center justify-between"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl">{t.myProfile}</h1>
        <Button
          variant="ghost"
          size="sm"
          className="text-light-blue hover:bg-white/10 p-2"
          onClick={onSettingsOpen}
        >
          <Edit className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 pb-24 space-y-6">
        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-light-blue/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-light-blue">
                  <AvatarFallback className="bg-light-blue/10 text-deep-blue text-xl">
                    {getInitials(userProfile?.shopName || '')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl text-deep-blue mb-1">{userProfile?.shopName}</h3>
                  <p className="text-text-secondary">{userProfile?.ownerName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Store className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{userProfile?.shopName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{userProfile?.ownerName}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{userProfile?.whatsappPhone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{userProfile?.city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {language === 'hi' ? t.hindi : t.english}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border-border-color">
            <CardHeader>
              <CardTitle className="text-deep-blue flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t.earnings}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-deep-blue text-2xl">₹{currentMonthEarnings.toLocaleString()}</p>
                  <p className="text-text-secondary text-sm">{t.thisMonth}</p>
                </div>
                <div className="text-center">
                  <p className="text-light-blue text-2xl">₹{previousMonthEarnings.toLocaleString()}</p>
                  <p className="text-text-secondary text-sm">{t.lastMonth}</p>
                </div>
              </div>
              <div className="text-center mb-4">
                <span className={`text-sm ${earningsGrowth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {earningsGrowth >= 0 ? '+' : ''}{earningsGrowth}% {t.growth}
                </span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockEarningsData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar dataKey="lastMonth" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="thisMonth" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Inventory Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl border-border-color">
            <CardHeader>
              <CardTitle className="text-deep-blue flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t.lowInventory}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item, index) => {
                  const stockStatus = getStockStatus(item);
                  const stockColor = getStockColor(stockStatus);
                  const itemName = language === 'hi' ? item.nameHi : item.name;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="rounded-xl border-border-color">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-text-primary">{itemName}</h4>
                            <Badge 
                              variant="outline"
                              style={{ 
                                borderColor: stockColor,
                                color: stockColor,
                                backgroundColor: `${stockColor}10`
                              }}
                            >
                              {stockStatus === 'out' ? t.outOfStock : t.lowStock}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: stockColor }}
                                animate={{ 
                                  scale: stockStatus === 'low' ? [1, 1.2, 1] : 1 
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: stockStatus === 'low' ? Infinity : 0 
                                }}
                              />
                              <span className="text-text-secondary text-sm">
                                {item.stock} {t.pieces}
                              </span>
                            </div>
                            <span className="text-text-secondary text-sm">₹{item.price}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-deep-blue hover:bg-deep-blue/90"
                              onClick={() => onNavigate('inventory')}
                            >
                              {t.okay}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-text-secondary text-text-secondary"
                            >
                              {t.ignore}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                  <p className="text-text-secondary">All inventory levels are good!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}