import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Hand, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, UserProfile, Language } from '../App';

interface QuickAddScreenProps {
  userProfile: UserProfile | null;
  language: Language;
  labels: any;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
}

interface CartItem {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  quantity: number;
  image: string;
}

export function QuickAddScreen({ userProfile, language, labels, onNavigate }: QuickAddScreenProps) {
  const [mode, setMode] = useState<'tap' | 'type'>('tap');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const quickAddLabels = {
    en: {
      newOrder: 'New Order',
      tapMode: 'Tap',
      typeMode: 'Type',
      searchPlaceholder: 'Search and add items...',
      cart: 'Cart',
      items: 'items',
      total: 'Total',
      createOrder: 'Create Order',
      quantity: 'Qty',
      price: 'Price'
    },
    hi: {
      newOrder: 'नया ऑर्डर',
      tapMode: 'टैप',
      typeMode: 'टाइप',
      searchPlaceholder: 'आइटम खोजें और जोड़ें...',
      cart: 'कार्ट',
      items: 'आइटम',
      total: 'कुल',
      createOrder: 'ऑर्डर बनाएं',
      quantity: 'मात्रा',
      price: 'कीमत'
    }
  };

  const t = quickAddLabels[language];

  // Mock product data
  const products = [
    {
      id: '1',
      name: 'Rice Bag 10kg',
      nameHi: 'चावल बैग 10kg',
      price: 650,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400',
      category: 'Grains'
    },
    {
      id: '2',
      name: 'Dal Moong 1kg',
      nameHi: 'दाल मूंग 1kg',
      price: 120,
      image: 'https://images.unsplash.com/photo-1583560091784-b0e66a9a0cfc?w=400',
      category: 'Pulses'
    },
    {
      id: '3',
      name: 'Cooking Oil 1L',
      nameHi: 'खाना पकाने का तेल 1L',
      price: 140,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      category: 'Oil'
    },
    {
      id: '4',
      name: 'Sugar 1kg',
      nameHi: 'चीनी 1kg',
      price: 55,
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
      category: 'Sweeteners'
    },
    {
      id: '5',
      name: 'Tea Powder 500g',
      nameHi: 'चाय पाउडर 500g',
      price: 180,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      category: 'Beverages'
    },
    {
      id: '6',
      name: 'Wheat Flour 5kg',
      nameHi: 'गेहूं का आटा 5kg',
      price: 280,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
      category: 'Flour'
    }
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          nameHi: product.nameHi,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    const productName = language === 'hi' ? product.nameHi : product.name;
    return productName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-background-white">
      {/* Header */}
      <motion.div 
        className="bg-deep-blue px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white text-xl mb-4">{t.newOrder}</h1>
        
        {/* Mode Toggle */}
        <div className="flex bg-white/20 rounded-2xl p-1 mb-4">
          <motion.button
            className={`flex-1 py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
              mode === 'tap' 
                ? 'bg-white text-deep-blue shadow-md' 
                : 'text-white'
            }`}
            onClick={() => setMode('tap')}
            whileTap={{ scale: 0.95 }}
          >
            <Hand className="w-4 h-4" />
            {t.tapMode}
          </motion.button>
          <motion.button
            className={`flex-1 py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
              mode === 'type' 
                ? 'bg-white text-deep-blue shadow-md' 
                : 'text-white'
            }`}
            onClick={() => setMode('type')}
            whileTap={{ scale: 0.95 }}
          >
            <Type className="w-4 h-4" />
            {t.typeMode}
          </motion.button>
        </div>

        {/* Search (Type Mode) */}
        {mode === 'type' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-white rounded-2xl h-12 border-0"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Product Grid */}
      <div className="flex-1 overflow-auto p-6 pb-32">
        {mode === 'tap' ? (
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {products.map((product, index) => {
              const productName = language === 'hi' ? product.nameHi : product.name;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card 
                    className="rounded-2xl border-border-color shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-muted">
                        <ImageWithFallback
                          src={product.image}
                          alt={productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-text-primary text-sm mb-1 line-clamp-2">
                        {productName}
                      </h3>
                      <p className="text-deep-blue">₹{product.price}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredProducts.map((product, index) => {
              const productName = language === 'hi' ? product.nameHi : product.name;
              const cartItem = cart.find(item => item.id === product.id);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl border-border-color shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={product.image}
                            alt={productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-text-primary mb-1">{productName}</h3>
                          <p className="text-deep-blue">₹{product.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {cartItem ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 p-0 rounded-full"
                                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center">{cartItem.quantity}</span>
                              <Button
                                size="sm"
                                className="w-8 h-8 p-0 rounded-full bg-light-blue hover:bg-light-blue/90"
                                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-deep-blue hover:bg-deep-blue/90"
                              onClick={() => addToCart(product)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          className="fixed bottom-16 left-0 right-0 bg-white border-t border-border-color p-6 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-text-secondary text-sm">
                {getTotalItems()} {t.items}
              </p>
              <p className="text-xl text-deep-blue">
                {t.total}: ₹{getTotalAmount()}
              </p>
            </div>
            <ShoppingCart className="w-6 h-6 text-light-blue" />
          </div>
          <Button
            className="w-full h-12 bg-deep-blue hover:bg-deep-blue/90 rounded-2xl"
            onClick={() => onNavigate('invoice')}
          >
            {t.createOrder}
          </Button>
        </motion.div>
      )}
    </div>
  );
}