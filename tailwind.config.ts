import type { Config } from 'tailwindcss'

const colors = {
  'magenta': '#FF00CC',
  'blue': '#333399',
  'dark': '#121212'
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors,
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > div');
      addVariant('child-hover', '& > div:hover');
    }
  ],
}
export default config
