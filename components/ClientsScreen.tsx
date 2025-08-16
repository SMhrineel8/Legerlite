import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Phone, MapPin, Users, IndianRupee } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { Screen, UserProfile, Language } from '../App';

interface ClientsScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  city: string;
  outstanding: number;
  totalOrders: number;
  lastOrder: string;
}

export function ClientsScreen({ userProfile, language, labels, onNavigate }: ClientsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedSearch, setFocusedSearch] = useState(false);

  const clientsLabels = {
    en: {
      clients: 'Clients',
      searchPlaceholder: 'Search clients...',
      addClient: 'Add Client',
      outstanding: 'Outstanding',
      orders: 'orders',
      lastOrder: 'Last order',
      paid: 'Paid',
      totalClients: 'Total Clients',
      activeClients: 'Active Clients'
    },
    hi: {
      clients: 'ग्राहक',
      searchPlaceholder: 'ग्राहक खोजें...',
      addClient: 'ग्राहक जोड़ें',
      outstanding: 'बकाया',
      orders: 'ऑर्डर',
      lastOrder: 'अंतिम ऑर्डर',
      paid: 'भुगतान',
      totalClients: 'कुल ग्राहक',
      activeClients: 'सक्रिय ग्राहक'
    }
  };

  const t = clientsLabels[language];

  // Mock clients data
  const clients: Client[] = [
    {
      id: '1',
      name: 'Raj Kumar Store',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      outstanding: 15000,
      totalOrders: 24,
      lastOrder: '2 days ago'
    },
    {
      id: '2',
      name: 'Sita Mart',
      phone: '+91 87654 32109',
      city: 'Delhi',
      outstanding: 0,
      totalOrders: 18,
      lastOrder: '1 week ago'
    },
    {
      id: '3',
      name: 'Modern Retail',
      phone: '+91 76543 21098',
      city: 'Bangalore',
      outstanding: 8500,
      totalOrders: 31,
      lastOrder: '3 days ago'
    },
    {
      id: '4',
      name: 'City Wholesale',
      phone: '+91 65432 10987',
      city: 'Pune',
      outstanding: 22000,
      totalOrders: 45,
      lastOrder: '1 day ago'
    },
    {
      id: '5',
      name: 'Quick Shop',
      phone: '+91 54321 09876',
      city: 'Chennai',
      outstanding: 0,
      totalOrders: 12,
      lastOrder: '2 weeks ago'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalOutstanding = clients.reduce((sum, client) => sum + client.outstanding, 0);
  const activeClients = clients.filter(client => client.outstanding > 0).length;

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl mb-4">{t.clients}</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white/70" />
              <span className="text-white/90 text-sm">{t.totalClients}</span>
            </div>
            <span className="text-white text-xl">{clients.length}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="w-4 h-4 text-white/70" />
              <span className="text-white/90 text-sm">{t.outstanding}</span>
            </div>
            <span className="text-white text-xl">₹{totalOutstanding.toLocaleString()}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <motion.div
            className={`relative transition-all duration-200 ${
              focusedSearch ? 'transform scale-105' : ''
            }`}
          >
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedSearch ? 'text-deep-blue' : 'text-text-secondary'
            }`} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocusedSearch(true)}
              onBlur={() => setFocusedSearch(false)}
              placeholder={t.searchPlaceholder}
              className={`pl-12 h-12 bg-white rounded-2xl border-2 transition-all duration-200 ${
                focusedSearch 
                  ? 'border-deep-blue shadow-lg shadow-light-blue/20' 
                  : 'border-transparent'
              }`}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Clients List */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="rounded-2xl border-border-color shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12 border-2 border-light-blue/20">
                      <AvatarFallback className="bg-light-blue/10 text-deep-blue">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary mb-1 truncate">{client.name}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-text-secondary" />
                          <span className="text-text-secondary text-sm">{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-text-secondary" />
                          <span className="text-text-secondary text-sm">{client.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-text-secondary text-sm">
                          {client.totalOrders} {t.orders}
                        </span>
                        <span className="text-text-secondary text-sm">
                          {t.lastOrder}: {client.lastOrder}
                        </span>
                      </div>
                    </div>

                    {/* Outstanding Badge */}
                    <div className="text-right">
                      {client.outstanding > 0 ? (
                        <Badge 
                          variant="outline"
                          className="border-light-blue text-light-blue bg-light-blue/10 mb-2"
                        >
                          ₹{client.outstanding.toLocaleString()}
                        </Badge>
                      ) : (
                        <Badge 
                          variant="outline"
                          className="border-green-500 text-green-600 bg-green-50 mb-2"
                        >
                          {t.paid}
                        </Badge>
                      )}
                      <div className="text-text-secondary text-xs">
                        {t.outstanding}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Users className="w-16 h-16 text-text-secondary mb-4" />
            <p className="text-text-secondary text-center">
              {searchQuery ? 'No clients found' : 'No clients yet'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Client FAB */}
      <motion.button
        className="fixed bottom-20 right-6 w-16 h-16 bg-deep-blue rounded-full shadow-lg flex items-center justify-center z-10"
        onClick={() => {
          // Here would be add client logic
          console.log('Add client');
        }}
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