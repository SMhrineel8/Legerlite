import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { Screen, UserProfile, Language } from '../App';

interface ReportsScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

export function ReportsScreen({ userProfile, language, labels, onNavigate }: ReportsScreenProps) {
  const [activeTab, setActiveTab] = useState('lowstock');

  const reportsLabels = {
    en: {
      reports: 'Reports',
      lowStock: 'Low Stock',
      receivables: 'Receivables',
      salesReport: 'Sales Report',
      inventoryValue: 'Inventory Value',
      outOfStock: 'Out of Stock',
      criticalStock: 'Critical Stock',
      okay: 'Okay',
      ignore: 'Ignore',
      items: 'items',
      totalValue: 'Total Value',
      overdue: 'Overdue',
      pending: 'Pending',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      revenue: 'Revenue',
      growth: 'Growth'
    },
    hi: {
      reports: 'रिपोर्ट',
      lowStock: 'कम स्टॉक',
      receivables: 'प्राप्तियां',
      salesReport: 'बिक्री रिपोर्ट',
      inventoryValue: 'इन्वेंटरी मूल्य',
      outOfStock: 'स्टॉक खत्म',
      criticalStock: 'महत्वपूर्ण स्टॉक',
      okay: 'ठीक है',
      ignore: 'अनदेखा करें',
      items: 'आइटम',
      totalValue: 'कुल मूल्य',
      overdue: 'देर से',
      pending: 'लंबित',
      thisMonth: 'इस महीने',
      lastMonth: 'पिछला महीना',
      revenue: 'आय',
      growth: 'वृद्धि'
    }
  };

  const t = reportsLabels[language];

  // Mock data for reports
  const lowStockItems = [
    { id: '1', name: 'Dal Moong 1kg', stock: 3, threshold: 10, value: 360, urgency: 'critical' },
    { id: '2', name: 'Tea Powder 500g', stock: 5, threshold: 15, value: 900, urgency: 'low' },
    { id: '3', name: 'Cooking Oil 1L', stock: 0, threshold: 5, value: 0, urgency: 'out' },
    { id: '4', name: 'Wheat Flour 5kg', stock: 8, threshold: 20, value: 2240, urgency: 'low' }
  ];

  const receivablesData = [
    { client: 'Raj Kumar Store', amount: 15000, days: 45, status: 'overdue' },
    { client: 'City Wholesale', amount: 22000, days: 15, status: 'pending' },
    { client: 'Modern Retail', amount: 8500, days: 30, status: 'pending' }
  ];

  const salesData = [
    { month: 'Jan', sales: 180000, target: 200000 },
    { month: 'Feb', sales: 220000, target: 200000 },
    { month: 'Mar', sales: 245000, target: 200000 },
    { month: 'Apr', sales: 190000, target: 200000 },
    { month: 'May', sales: 280000, target: 200000 },
    { month: 'Jun', sales: 245000, target: 200000 }
  ];

  const inventoryValueData = [
    { category: 'Grains', value: 45, color: '#1E3A8A' },
    { category: 'Pulses', value: 25, color: '#60A5FA' },
    { category: 'Oil', value: 15, color: '#3B82F6' },
    { category: 'Others', value: 15, color: '#93C5FD' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'out': return '#EF4444';
      case 'critical': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'out': return t.outOfStock;
      case 'critical': return t.criticalStock;
      default: return t.lowStock;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl">{t.reports}</h1>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* Tab Navigation */}
          <motion.div
            className="border-b border-border-color"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TabsList className="w-full h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="lowstock" 
                className={`flex-1 py-4 text-sm data-[state=active]:bg-transparent ${
                  activeTab === 'lowstock' 
                    ? 'text-deep-blue border-b-2 border-deep-blue' 
                    : 'text-text-secondary'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                {t.lowStock}
              </TabsTrigger>
              <TabsTrigger 
                value="receivables" 
                className={`flex-1 py-4 text-sm data-[state=active]:bg-transparent ${
                  activeTab === 'receivables' 
                    ? 'text-deep-blue border-b-2 border-deep-blue' 
                    : 'text-text-secondary'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {t.receivables}
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Low Stock Tab */}
          <TabsContent value="lowstock" className="p-6 space-y-6 mt-0">
            {/* Inventory Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl border-border-color">
                <CardHeader>
                  <CardTitle className="text-deep-blue">{t.inventoryValue}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inventoryValueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {inventoryValueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {inventoryValueData.map((item) => (
                      <div key={item.category} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-text-secondary">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Low Stock Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-deep-blue mb-4">{t.lowStock} {t.items}</h3>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="rounded-xl border-border-color">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-text-primary">{item.name}</h4>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: getUrgencyColor(item.urgency),
                              color: getUrgencyColor(item.urgency),
                              backgroundColor: `${getUrgencyColor(item.urgency)}10`
                            }}
                          >
                            {getUrgencyLabel(item.urgency)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-text-secondary text-sm">Stock: </span>
                            <span 
                              className="text-sm"
                              style={{ color: getUrgencyColor(item.urgency) }}
                            >
                              {item.stock} / {item.threshold}
                            </span>
                          </div>
                          <div>
                            <span className="text-text-secondary text-sm">Value: </span>
                            <span className="text-sm text-text-primary">₹{item.value}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            className="flex-1 bg-deep-blue text-white py-2 px-4 rounded-lg text-sm"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('inventory')}
                          >
                            {t.okay}
                          </motion.button>
                          <motion.button
                            className="flex-1 bg-text-secondary/10 text-text-secondary py-2 px-4 rounded-lg text-sm"
                            whileTap={{ scale: 0.95 }}
                          >
                            {t.ignore}
                          </motion.button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Receivables Tab */}
          <TabsContent value="receivables" className="p-6 space-y-6 mt-0">
            {/* Sales Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl border-border-color">
                <CardHeader>
                  <CardTitle className="text-deep-blue">{t.salesReport}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Bar 
                          dataKey="sales" 
                          fill="#1E3A8A" 
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar 
                          dataKey="target" 
                          fill="#60A5FA" 
                          radius={[4, 4, 0, 0]}
                          opacity={0.6}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Receivables List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-deep-blue mb-4">{t.receivables}</h3>
              <div className="space-y-3">
                {receivablesData.map((item, index) => (
                  <motion.div
                    key={item.client}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="rounded-xl border-border-color">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-text-primary">{item.client}</h4>
                          <Badge 
                            variant="outline"
                            className={
                              item.status === 'overdue' 
                                ? 'border-red-500 text-red-600 bg-red-50'
                                : 'border-light-blue text-light-blue bg-light-blue/10'
                            }
                          >
                            {item.status === 'overdue' ? t.overdue : t.pending}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl text-deep-blue">₹{item.amount.toLocaleString()}</span>
                            <p className="text-text-secondary text-sm">{item.days} days</p>
                          </div>
                          <motion.button
                            className="bg-light-blue text-white px-4 py-2 rounded-lg text-sm"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('clients')}
                          >
                            Contact
                          </motion.button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}