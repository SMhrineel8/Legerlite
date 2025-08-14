/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-deep-blue': '#1E3A8A',
        'accent-light-blue': '#60A5FA',
        'text-primary': '#4B5563',
        'text-secondary': '#9CA3AF',
        'border-color': '#D1D5DB',
        'background-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}