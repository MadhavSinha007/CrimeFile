module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            900: '#121212',
            800: '#1E1E1E',
            700: '#2A2A2A',
            600: '#363636',
          },
          primary: '#4F46E5',
        },
      },
    },
    plugins: [],
  }