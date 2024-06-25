/** @type {import('tailwindcss').Config} */
export default {
  // content: [],
  theme: {
    extend: {
      colors: {
        'primary': '#3D4293',
        'secondary': '#A9CE45',
        'primarydark': '#141631',
        'primarylight': '#7D81B7',
        'secondarydark': "#384417",
        'secondarylight': '#C5DE83',
        'danger': 'red',
        'instruction': '#375079'
      }
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}

