/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        //coolors
        // 'wa-text': '#140800',
        // 'wa-secondary-bg': '#efd595',
        // 'wa-border': '#264653',
        // 'wa-button-bg': '#2a9d8f',
        // 'wa-button-bg-hover': '#33C1B1',
        // 'wa-bg-from': '#fdf4ec',
        // 'wa-bg-to': '#ffc592',

        //duck style
        // 'wa-text': '#222222',
        // 'wa-secondary-bg': '#F7F7F7',
        // 'wa-border': '#F0F0F0',
        // 'wa-button-bg': '#F0F0F0',
        // 'wa-button-bg-hover': '#E0E0E0',
        // 'wa-bg-from': '#ffffff',
        // 'wa-bg-to': '#ffffff',

        //tailwind
        'wa-text': '#364153',
        'wa-secondary-bg': '#FAFBFD',
        'wa-border': '#FAFBFD',
        'wa-button-bg': '#4CA3E3',
        'wa-button-bg-hover': '#3B83C3',
        'wa-bg-from': '#ffffff',
        'wa-bg-to': '#ffffff',
      },
    },
  },
  plugins: [],
};
