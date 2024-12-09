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
        
        'wa-gold':        "var(--wa-gold)",
        'wa-card-bg':     "var(--wa-card-bg)",
        'wa-border':      "var(--wa-border)",
        'wa-btn-bg':      "var(--wa-btn-bg)",
        'wa-btn-bg-hover':"var(--wa-btn-bg-hover)",
        'wa-btn-text':    "var(--wa-btn-text)",
      },
    },
  },
  plugins: [],
};
