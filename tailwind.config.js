module.exports = {
  corePlugins: {
    // preflight: false,
  },
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        peach:{
          100: "#ffe2e7"
        },
        yellowgreen:{
          100: '#e0f1bc',
          200: '#cce697'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
