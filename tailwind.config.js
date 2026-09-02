/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#082B5C', // Deep Navy
          dark: '#061F42',    // Footer Navy
        },
        primary: {
          blue: '#0B63CE',   // Primary Blue
          hover: '#0952AE',  // Darker Blue on hover
        },
        bright: {
          blue: '#1476D4',   // Bright Blue
        },
        light: {
          blue: '#EAF4FF',   // Light Blue
          bg: '#F8FAFC',     // Light Background
        },
        brand: {
          red: {
            DEFAULT: '#E3262E', // Brand Red Accent
            hover: '#C71F26',
            light: '#FDF2F2',
          },
          dark: '#172033',      // Dark Text
          muted: '#64748B',     // Secondary Text
          border: '#E2E8F0',    // Border Color
          whatsapp: '#25D366',  // WhatsApp Green
          whatsappHover: '#20BD5A',
          // Backwards compatibility for existing classes
          blue: {
            DEFAULT: '#0B63CE',
            deep: '#082B5C',
            bright: '#1476D4',
            light: '#EAF4FF',
          },
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            600: '#64748B',
            700: '#475569',
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '14px',
        'btn': '8px',
        'input': '8px',
      },
      boxShadow: {
        'subtle': '0 4px 16px rgba(15, 23, 42, 0.04)',
        'card': '0 8px 24px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 32px rgba(15, 23, 42, 0.12)',
        'nav': '0 4px 20px rgba(8, 43, 92, 0.06)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      }
    },
  },
  plugins: [],
}
