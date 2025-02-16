module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Ensure `src/` is included if using Next.js 13+
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
