import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  BarChart3,
  Plus,
  Store,
  Package,
  Users,
  Receipt
} from 'lucide-react';
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
  const dashboardLabels = {
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
    {
      title: t.totalRevenue,
      value: '₹2,45,000',
      change: '+10%',
      trend: 'up',
      icon: DollarSign,
      color: '#1E3A8A'
    },
    {
      title: t.outstanding,
      value: '₹45,000',
      change: '-5%',
      trend: 'down',
      icon: FileText,
      color: '#EF4444'
    },
    {
      title: t.avgInvoice,
      value: '₹8,500',
      change: '+15%',
      trend: 'up',
      icon: BarChart3,
      color: '#60A5FA'
    }
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
    { 
      title: t.createInvoice, 
      icon: FileText, 
      action: () => onNavigate('invoice'),
      color: '#1E3A8A'
    },
    { 
      title: t.viewReports, 
      icon: BarChart3, 
      action: () => onNavigate('reports'),
      color: '#60A5FA'
    },
    { 
      title: t.manageInventory, 
      icon: Package, 
      action: () => onNavigate('inventory'),
      color: '#1E3A8A'
    },
    { 
      title: t.addClient, 
      icon: Users, 
      action: () => onNavigate('clients'),
      color: '#60A5FA'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4 flex items-center justify-between"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={onSettingsOpen}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6 text-white" />
          </motion.button>
          <div>
            <h1 className="text-white text-xl">{userProfile?.shopName || 'Business'}</h1>
          </div>
        </div>
        <motion.button
          className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="w-6 h-6 text-white" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-light-blue rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Key Metrics */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex gap-4 overflow-x-auto pb-2">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              >
                <Card className="min-w-[280px] rounded-2xl border-border-color shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${metric.color}15` }}
                      >
                        <metric.icon 
                          className="w-6 h-6" 
                          style={{ color: metric.color }}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-light-blue" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span 
                          className={`text-sm ${
                            metric.trend === 'up' ? 'text-light-blue' : 'text-red-500'
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl text-text-primary mb-1">{metric.value}</h3>
                    <p className="text-text-secondary text-sm">{metric.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financial Performance */}
        <motion.div 
          className="px-6 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-deep-blue">{t.performance}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Revenue Breakdown Pie Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Revenue Bar Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar 
                      dataKey="revenue" 
                      fill="#60A5FA" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="px-6 pb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-deep-blue text-lg mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <Button
                  onClick={action.action}
                  className="w-full h-20 rounded-2xl border-2 border-light-blue/20 bg-white hover:bg-light-blue/5 text-text-primary p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200"
                  variant="outline"
                >
                  <action.icon 
                    className="w-6 h-6" 
                    style={{ color: action.color }}
                  />
                  <span className="text-sm text-center">{action.title}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-20 right-6 w-16 h-16 bg-light-blue rounded-full shadow-lg flex items-center justify-center z-10"
        onClick={() => onNavigate('quickadd')}
        whileTap={{ scale: 0.9, rotate: 45 }}
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}