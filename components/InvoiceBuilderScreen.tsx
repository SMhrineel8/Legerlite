import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Download, Share, Calendar, User, Hash } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import type { Screen, UserProfile, Language } from '../App';

interface InvoiceBuilderScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export function InvoiceBuilderScreen({ userProfile, language, labels, onNavigate }: InvoiceBuilderScreenProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      name: 'Rice Bag 10kg',
      quantity: 2,
      price: 650,
      total: 1300
    },
    {
      id: '2',
      name: 'Dal Moong 1kg',
      quantity: 5,
      price: 120,
      total: 600
    }
  ]);

  const invoiceLabels = {
    en: {
      invoiceBuilder: 'Invoice Builder',
      invoiceNumber: 'Invoice #',
      date: 'Date',
      selectClient: 'Select Client',
      addItem: 'Add Item',
      item: 'Item',
      quantity: 'Qty',
      price: 'Price',
      total: 'Total',
      subtotal: 'Subtotal',
      gst: 'GST (18%)',
      grandTotal: 'Grand Total',
      edit: 'Edit',
      send: 'Send Invoice',
      gstNote: 'GST number: ',
      dueDate: 'Due Date'
    },
    hi: {
      invoiceBuilder: 'चालान निर्माता',
      invoiceNumber: 'चालान #',
      date: 'दिनांक',
      selectClient: 'ग्राहक चुनें',
      addItem: 'आइटम जोड़ें',
      item: 'आइटम',
      quantity: 'मात्रा',
      price: 'कीमत',
      total: 'कुल',
      subtotal: 'उप कुल',
      gst: 'जीएसटी (18%)',
      grandTotal: 'कुल योग',
      edit: 'संपादित करें',
      send: 'चालान भेजें',
      gstNote: 'जीएसटी नंबर: ',
      dueDate: 'देय तिथि'
    }
  };

  const t = invoiceLabels[language];

  const clients = [
    { id: '1', name: 'Raj Kumar Store', phone: '+91 98765 43210' },
    { id: '2', name: 'Sita Mart', phone: '+91 87654 32109' },
    { id: '3', name: 'Modern Retail', phone: '+91 76543 21098' }
  ];

  const getSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };

  const getGSTAmount = () => {
    return Math.round(getSubtotal() * 0.18);
  };

  const getGrandTotal = () => {
    return getSubtotal() + getGSTAmount();
  };

  const currentDate = new Date().toLocaleDateString('en-IN');
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl">{t.invoiceBuilder}</h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-white/70" />
            <span className="text-white/90 text-sm">{invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white/70" />
            <span className="text-white/90 text-sm">{currentDate}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Client Selection */}
        <motion.div 
          className="p-6 border-b border-border-color"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label className="text-text-secondary mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            {t.selectClient}
          </Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="h-12 rounded-xl border-border-color">
              <SelectValue placeholder={t.selectClient} />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div>
                    <div className="text-text-primary">{client.name}</div>
                    <div className="text-xs text-text-secondary">{client.phone}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Invoice Items */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-deep-blue">{t.item}s</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl border-light-blue text-light-blue hover:bg-light-blue/10"
              onClick={() => onNavigate('quickadd')}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.addItem}
            </Button>
          </div>

          <div className="space-y-3">
            {invoiceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="rounded-xl border-border-color">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-text-primary">{item.name}</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">{t.quantity}: </span>
                        <span className="text-text-primary">{item.quantity}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">{t.price}: </span>
                        <span className="text-text-primary">₹{item.price}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">{t.total}: </span>
                        <span className="text-deep-blue">₹{item.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary & Actions */}
      <motion.div 
        className="bg-white border-t border-border-color p-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
      >
        {/* Summary */}
        <Card className="rounded-xl border-border-color mb-4">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t.subtotal}</span>
                <span className="text-text-primary">₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t.gst}</span>
                <span className="text-text-primary">₹{getGSTAmount()}</span>
              </div>
              <div className="border-t border-border-color pt-2">
                <div className="flex justify-between">
                  <span className="text-deep-blue">{t.grandTotal}</span>
                  <span className="text-deep-blue text-xl">₹{getGrandTotal()}</span>
                </div>
              </div>
              {userProfile?.gstNumber && (
                <div className="text-xs text-text-secondary">
                  {t.gstNote}{userProfile.gstNumber}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 h-12 rounded-xl border-text-secondary text-text-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.edit}
          </Button>
          <Button 
            className="flex-1 h-12 rounded-xl bg-deep-blue hover:bg-deep-blue/90"
            onClick={() => {
              // Here would be the actual send invoice logic
              onNavigate('dashboard');
            }}
          >
            <Share className="w-4 h-4 mr-2" />
            {t.send}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}