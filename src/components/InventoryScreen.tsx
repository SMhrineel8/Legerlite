import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, AlertCircle, ShoppingCart, IndianRupee } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Screen, UserProfile, Language } from '../App';

interface InventoryScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onSettingsOpen: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
}

export function InventoryScreen({ userProfile, language, labels, onSettingsOpen }: InventoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryLabels: Record<Language, any> = {
    en: {
      inventory: 'Inventory',
      searchPlaceholder: 'Search products...',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      addProduct: 'Add Product',
      pieces: 'pieces',
      price: 'Price',
      stock: 'Stock'
    },
    hi: {
      inventory: 'इन्वेंटरी',
      searchPlaceholder: 'उत्पाद खोजें...',
      inStock: 'स्टॉक में',
      lowStock: 'कम स्टॉक',
      outOfStock: 'स्टॉक से बाहर',
      addProduct: 'उत्पाद जोड़ें',
      pieces: 'टुकड़े',
      price: 'मूल्य',
      stock: 'स्टॉक'
    }
  };

  const t = inventoryLabels[language];

  // Mock data for products
  const products: Product[] = [
    { id: '1', name: 'Product A', price: 150, stock: 50, minStock: 10 },
    { id: '2', name: 'Product B', price: 250, stock: 5, minStock: 10 },
    { id: '3', name: 'Product C', price: 500, stock: 0, minStock: 5 },
    { id: '4', name: 'Product D', price: 100, stock: 15, minStock: 10 },
    { id: '5', name: 'Product E', price: 75, stock: 2, minStock: 5 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return t.outOfStock;
    if (stock <= minStock) return t.lowStock;
    return t.inStock;
  };

  const getStockBadgeColor = (stock: number, minStock: number) => {
    if (stock === 0) return 'border-red-500 text-red-600 bg-red-50';
    if (stock <= minStock) return 'border-yellow-500 text-yellow-600 bg-yellow-50';
    return 'border-green-500 text-green-600 bg-green-50';
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
        <h1 className="text-white text-xl mb-4">{t.inventory}</h1>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-12 h-12 bg-white rounded-2xl border-transparent"
          />
        </div>
      </motion.div>

      {/* Product List */}
      <div className="flex-1 overflow-auto p-6 pb-24">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="rounded-2xl border-border-color shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary mb-1 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={getStockBadgeColor(product.stock, product.minStock)}>
                          {getStockStatus(product.stock, product.minStock)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-text-secondary text-sm">
                          {t.price}: ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-text-primary text-lg font-semibold">{product.stock}</span>
                      <div className="text-text-secondary text-xs">
                        {t.pieces}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ShoppingCart className="w-16 h-16 text-text-secondary mb-4" />
            <p className="text-text-secondary text-center">
              {searchQuery ? 'No products found' : 'No products yet'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Product FAB */}
      <motion.button
        className="fixed bottom-20 right-6 w-16 h-16 bg-deep-blue rounded-full shadow-lg flex items-center justify-center z-10"
        onClick={() => {
          console.log('Add product');
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
