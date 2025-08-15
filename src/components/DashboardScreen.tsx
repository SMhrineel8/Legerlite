import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, TrendingUp, TrendingDown, DollarSign, FileText, BarChart3, Plus, Store, Package, Users, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import type { Screen, UserProfile, Language } from '../App';

interface DashboardScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

export function DashboardScreen({ userProfile, language, labels, onNavigate, onSettingsOpen }: DashboardScreenProps) {
  const dashboardLabels: Record<Language, any> = {
    en: {
      totalRevenue: 'Total Revenue',
      outstanding: 'Outstanding',
      avgInvoice: 'Avg Invoice',
      performance: 'Financial Performance',
      quickActions: 'Quick Actions',
      createInvoice: 'Create Invoice',
      viewReports: 'View Reports',
      manageInventory: 'Manage Inventory',
      addClient: 'Add Client',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      revenue: 'Revenue',
      expenses: 'Expenses',
      profit: 'Profit'
    },
    hi: {
      totalRevenue: 'कुल आय',
      outstanding: 'बकाया',
      avgInvoice: 'औसत चालान',
      performance: 'वित्तीय प्रदर्शन',
      quickActions: 'त्वरित कार्य',
      createInvoice: 'चालान बनाएं',
      viewReports: 'रिपोर्ट देखें',
      manageInventory: 'इन्वेंटरी प्रबंधित करें',
      addClient: 'ग्राहक जोड़ें',
      thisMonth: 'इस महीने',
      lastMonth: 'पिछला महीना',
      revenue: 'आय',
      expenses: 'खर्च',
      profit: 'लाभ'
    }
  };

  const t = dashboardLabels[language];

  // Mock data for demo
  const metrics = [
    { title: t.totalRevenue, value: '₹2,45,000', change: '+10%', trend: 'up', icon: DollarSign, color: '#1E3A8A' },
    { title: t.outstanding, value: '₹45,000', change: '-5%', trend: 'down', icon: FileText, color: '#EF4444' },
    { title: t.avgInvoice, value: '₹8,500', change: '+15%', trend: 'up', icon: BarChart3, color: '#60A5FA' }
  ];

  const revenueData = [
    { name: 'Products', value: 60, color: '#1E3A8A' },
    { name: 'Services', value: 30, color: '#60A5FA' },
    { name: 'Others', value: 10, color: '#3B82F6' }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 180000, target: 200000 },
    { month: 'Feb', revenue: 220000, target: 200000 },
    { month: 'Mar', revenue: 245000, target: 200000 },
    { month: 'Apr', revenue: 190000, target: 200000 },
    { month: 'May', revenue: 280000, target: 200000 },
    { month: 'Jun', revenue: 245000, target: 200000 }
  ];

  const quickActions = [
    { title: t.createInvoice, icon: FileText, action: () => onNavigate('invoice'), color: '#1E3A8A' },
    { title: t.viewReports, icon: BarChart3, action: () => onNavigate('reports'), color: '#60A5FA' },
    { title: t.manageInventory, icon: Package, action: () => onNavigate('inventory'), color: '#3B82F6' },
    { title: t.addClient, icon: Users, action: () => onNavigate('clients'), color: '#EAB308' }
  ];

  const PieChartWithCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <motion.div
        className="bg-deep-blue px-6 pt-6 pb-20 safe-area-pt"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <button onClick={onSettingsOpen} className="p-2 touch-target">
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div className="flex flex-col">
              <span className="text-white/80 text-sm">Welcome,</span>
              <span className="text-white font-semibold text-lg">{userProfile?.shopName || 'User'}</span>
            </div>
          </div>
          <button className="p-2 touch-target">
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 overflow-auto bg-background-white -mt-16 rounded-t-3xl shadow-xl px-6 pt-8 pb-24"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
            >
              <Card className="rounded-2xl border-border-color shadow-sm">
                <CardContent className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <metric.icon className="w-4 h-4 text-text-secondary" />
                      <span className="text-text-secondary text-xs">{metric.title}</span>
                    </div>
                    <span className="text-text-primary text-lg font-semibold">{metric.value}</span>
                  </div>
                  <Badge variant="outline" className={`mt-2 ${metric.trend === 'up' ? 'text-green-600 bg-green-50 border-green-500' : 'text-red-600 bg-red-50 border-red-500'}`}>
                    {metric.change}
                    {metric.trend === 'up' ? <TrendingUp className="ml-1 w-3 h-3" /> : <TrendingDown className="ml-1 w-3 h-3" />}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Financial Performance Section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">{t.performance}</h2>
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardContent className="p-6">
              {/* Charts */}
              <div className="flex justify-between items-center mb-4">
                <div className="w-1/2 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                        label={PieChartWithCustomLabel}
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span>
                    <span className="text-sm">{revenueData[0].name} ({revenueData[0].value}%)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-[#60A5FA] rounded-full"></span>
                    <span className="text-sm">{revenueData[1].name} ({revenueData[1].value}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#3B82F6] rounded-full"></span>
                    <span className="text-sm">{revenueData[2].name} ({revenueData[2].value}%)</span>
                  </div>
                </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Bar dataKey="revenue" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className="flex flex-col items-start p-4 bg-gray-50 rounded-2xl border border-border-color shadow-sm touch-target"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="p-3 rounded-xl mb-3" style={{ backgroundColor: `${action.color}1A` }}>
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <span className="text-text-primary text-sm font-medium">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
