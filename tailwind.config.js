/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
    'hover-green': "#51F302",
    'hover-blue': "#0271F3",
    'hover-purple': "#7C02F3",
    'hover-pink': "#F302AB",
    'hover-red': "#F30221",
   'hover-orange': "#F36D02",
    'hover-yellow': "#F3D202",
    'hover-teal': "#02F3B0",
    'hover-cyan': "#02E3F3",
    'hover-lime': "#77F302",
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
