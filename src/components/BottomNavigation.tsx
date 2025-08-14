import React from 'react';
import { motion } from 'motion/react';
import { Home, Package, ShoppingCart, BarChart3, User } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  labels: any;
}

export function BottomNavigation({ currentScreen, onNavigate, labels }: BottomNavigationProps) {
  const navItems = [
    {
      screen: 'dashboard' as Screen,
      icon: Home,
      label: labels.home
    },
    {
      screen: 'inventory' as Screen,
      icon: Package,
      label: labels.inventory
    },
    {
      screen: 'quickadd' as Screen,
      icon: ShoppingCart,
      label: labels.orders
    },
    {
      screen: 'reports' as Screen,
      icon: BarChart3,
      label: labels.reports
    },
    {
      screen: 'profile' as Screen,
      icon: User,
      label: labels.profile
    }
  ];

  return (
    <motion.div 
      className="bg-background-white border-t border-border-color px-2 py-2 safe-area-pb"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => {
          const isActive = currentScreen === item.screen;
          
          return (
            <motion.button
              key={item.screen}
              className="flex flex-col items-center py-2 px-4 min-w-0 flex-1 touch-target"
              onClick={() => onNavigate(item.screen)}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <motion.div
                className={`p-2 rounded-xl mb-1 transition-all duration-200 ${
                  isActive 
                    ? 'bg-deep-blue' 
                    : 'bg-transparent'
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? '#1E3A8A' : 'transparent'
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-text-secondary'
                  }`}
                />
              </motion.div>
              
              <motion.span 
                className={`text-xs transition-colors duration-200 ${
                  isActive ? 'text-deep-blue' : 'text-text-secondary'
                }`}
                animate={{
                  color: isActive ? '#1E3A8A' : '#9CA3AF'
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}