export const mockInventoryItems = [
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

export const mockClients = [
  { id: '1', name: 'Raj Kumar Store', phone: '+91 98765 43210', city: 'Mumbai', outstanding: 15000, totalOrders: 24, lastOrder: '2 days ago' },
  { id: '2', name: 'Sita Mart', phone: '+91 87654 32109', city: 'Delhi', outstanding: 0, totalOrders: 18, lastOrder: '1 week ago' },
  { id: '3', name: 'Modern Retail', phone: '+91 76543 21098', city: 'Bangalore', outstanding: 8500, totalOrders: 31, lastOrder: '3 days ago' },
  { id: '4', name: 'City Wholesale', phone: '+91 65432 10987', city: 'Pune', outstanding: 22000, totalOrders: 45, lastOrder: '1 day ago' },
  { id: '5', name: 'Quick Shop', phone: '+91 54321 09876', city: 'Chennai', outstanding: 0, totalOrders: 12, lastOrder: '2 weeks ago' }
];

export const mockEarningsData = [
  { month: 'Jan', lastMonth: 180000, thisMonth: 220000 },
  { month: 'Feb', lastMonth: 220000, thisMonth: 245000 },
  { month: 'Mar', lastMonth: 245000, thisMonth: 280000 },
  { month: 'Apr', lastMonth: 190000, thisMonth: 245000 },
  { month: 'May', lastMonth: 280000, thisMonth: 310000 },
  { month: 'Jun', lastMonth: 245000, thisMonth: 290000 }
];

export const businessMetrics = {
  totalRevenue: 245000,
  revenueGrowth: 10,
  outstandingAmount: 45000,
  outstandingChange: -5,
  avgInvoiceValue: 8500,
  avgInvoiceGrowth: 15
};