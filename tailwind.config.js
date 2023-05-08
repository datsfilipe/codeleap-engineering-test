/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: '#DDDDDD',
        primary: '#7695EC',
        white: '#FFFFFF',
        black: '#000000',
        muted: '#777777',
        'gray-darker': '#CCCCCC',
      },
    },
  },
  plugins: [],
}
