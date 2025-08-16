module.exports = {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border-color)",
        primary: {
          "deep-blue": "var(--primary-deep-blue)",
        },
        accent: {
          "light-blue": "var(--accent-light-blue)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        background: {
          white: "var(--background-white)",
        },
      },
    },
  },
  plugins: [],
};
