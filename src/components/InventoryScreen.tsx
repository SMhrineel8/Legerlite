import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Package, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, UserProfile, Language } from '../App';

interface InventoryScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

interface InventoryItem {
  id: string;
  name: string;
  nameHi: string;
  stock: number;
  price: number;
  image: string;
  category: string;
  lowStockThreshold: number;
}

export function InventoryScreen({ userProfile, language, labels, onNavigate, onSettingsOpen }: InventoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedSearch, setFocusedSearch] = useState(false);

  const inventoryLabels = {
    en: {
      inventory: 'Inventory',
      searchPlaceholder: 'Search products...',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      addProduct: 'Add Product',
      pieces: 'pcs',
      price: 'Price',
      stock: 'Stock'
    },
    hi: {
      inventory: 'इन्वेंटरी',
      searchPlaceholder: 'उत्पाद खोजें...',
      inStock: 'स्टॉक में',
      lowStock: 'कम स्टॉक',
      outOfStock: 'स्टॉक खत्म',
      addProduct: 'उत्पाद जोड़ें',
      pieces: 'पीस',
      price: 'कीमत',
      stock: 'स्टॉक'
    }
  };

  const t = inventoryLabels[language];

  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Rice Bag 10kg',
      nameHi: 'चावल बैग 10kg',
      stock: 45,
      price: 650,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400',
      category: 'Grains',
      lowStockThreshold: 10
    },
    {
      id: '2',
      name: 'Dal Moong 1kg',
      nameHi: 'दाल मूंग 1kg',
      stock: 8,
      price: 120,
      image: 'https://images.unsplash.com/photo-1583560091784-b0e66a9a0cfc?w=400',
      category: 'Pulses',
      lowStockThreshold: 10
    },
    {
      id: '3',
      name: 'Cooking Oil 1L',
      nameHi: 'खाना पकाने का तेल 1L',
      stock: 0,
      price: 140,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      category: 'Oil',
      lowStockThreshold: 5
    },
    {
      id: '4',
      name: 'Sugar 1kg',
      nameHi: 'चीनी 1kg',
      stock: 25,
      price: 55,
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
      category: 'Sweeteners',
      lowStockThreshold: 10
    },
    {
      id: '5',
      name: 'Tea Powder 500g',
      nameHi: 'चाय पाउडर 500g',
      stock: 3,
      price: 180,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      category: 'Beverages',
      lowStockThreshold: 5
    },
    {
      id: '6',
      name: 'Wheat Flour 5kg',
      nameHi: 'गेहूं का आटा 5kg',
      stock: 15,
      price: 280,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
      category: 'Flour',
      lowStockThreshold: 10
    }
  ];

  const getStockStatus = (item: InventoryItem) => {
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

  const getStockLabel = (status: string) => {
    switch (status) {
      case 'out': return t.outOfStock;
      case 'low': return t.lowStock;
      default: return t.inStock;
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const itemName = language === 'hi' ? item.nameHi : item.name;
    return itemName.toLowerCase().includes(searchLower);
  });

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header with Search */}
      <motion.div 
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl mb-4">{t.inventory}</h1>
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

      {/* Inventory List */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {filteredItems.map((item, index) => {
            const stockStatus = getStockStatus(item);
            const stockColor = getStockColor(stockStatus);
            const stockLabel = getStockLabel(stockStatus);
            const itemName = language === 'hi' ? item.nameHi : item.name;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="rounded-2xl border-border-color shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-text-primary mb-1 truncate">{itemName}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-text-secondary text-sm">
                            ₹{item.price}
                          </span>
                          <span className="text-text-secondary text-sm">•</span>
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
                            <span 
                              className="text-sm"
                              style={{ color: stockColor }}
                            >
                              {item.stock} {t.pieces}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: stockColor, 
                            color: stockColor,
                            backgroundColor: `${stockColor}10`
                          }}
                        >
                          {stockLabel}
                        </Badge>
                      </div>

                      {/* Quick Add Button */}
                      <motion.button
                        className="w-12 h-12 bg-deep-blue rounded-xl flex items-center justify-center touch-target"
                        onClick={() => onNavigate('quickadd')}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Plus className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Package className="w-16 h-16 text-text-secondary mb-4" />
            <p className="text-text-secondary text-center">
              {searchQuery ? 'No products found' : 'No inventory items yet'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Product FAB */}
      <motion.button
        className="fixed bottom-20 right-6 w-16 h-16 bg-deep-blue rounded-full shadow-lg flex items-center justify-center z-10"
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