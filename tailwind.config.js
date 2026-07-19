/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#FCEEF0',
          100: '#F7D2D8',
          400: '#C7223F',
          500: '#A81530',
          600: '#8A0F27',
          700: '#650B1C',
          900: '#3D0710'
        },
        sand: {
          50: '#FBF3E7',
          100: '#F6E7D3',
          200: '#EFD9BC'
        },
        ink: {
          900: '#241512'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};
