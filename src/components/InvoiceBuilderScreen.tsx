import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, IndianRupee, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
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
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export function InvoiceBuilderScreen({ userProfile, language, labels, onNavigate }: InvoiceBuilderScreenProps) {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const invoiceLabels: Record<Language, any> = {
    en: {
      invoiceBuilder: 'Invoice Builder',
      invoiceNumber: 'Invoice Number',
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
      createInvoice: 'Create Invoice',
      dueDate: 'Due Date'
    },
    hi: {
      invoiceBuilder: 'चालान निर्माता',
      invoiceNumber: 'चालान संख्या',
      date: 'तिथि',
      selectClient: 'ग्राहक चुनें',
      addItem: 'आइटम जोड़ें',
      item: 'आइटम',
      quantity: 'मात्रा',
      price: 'मूल्य',
      total: 'कुल',
      subtotal: 'उप-योग',
      gst: 'जीएसटी (18%)',
      grandTotal: 'कुल योग',
      createInvoice: 'चालान बनाएं',
      dueDate: 'देय तिथि'
    }
  };

  const t = invoiceLabels[language];

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl mb-4">{t.invoiceBuilder}</h1>
      </motion.div>

      {/* Invoice Details */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Client Details */}
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-medium">{t.selectClient}</span>
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg font-semibold">{t.item}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {invoiceItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Input placeholder={t.item} value={item.name} />
                    <Input placeholder={t.quantity} type="number" value={item.quantity} className="w-20" />
                    <Input placeholder={t.price} type="number" value={item.price} className="w-24" />
                    <motion.button whileTap={{ scale: 0.9 }}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </motion.button>
                  </div>
                ))}
              </div>
              <motion.button
                className="flex items-center gap-2 text-deep-blue mt-4 font-medium"
                onClick={() => setInvoiceItems([...invoiceItems, { id: Date.now(), name: '', quantity: 0, price: 0 }])}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span>{t.addItem}</span>
              </motion.button>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card className="rounded-2xl border-border-color shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t.subtotal}</span>
                <span className="text-text-primary font-medium">₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t.gst}</span>
                <span className="text-text-primary font-medium">₹0</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                <span className="text-text-primary">{t.grandTotal}</span>
                <span className="text-text-primary">₹0</span>
              </div>
            </CardContent>
          </Card>

          {/* Create Invoice Button */}
          <motion.button
            className="w-full bg-deep-blue text-white py-3 rounded-xl shadow-lg font-semibold mt-6"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            {t.createInvoice}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}