/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            // Custom Font Family
    fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                space: ['Space Grotesk', 'sans-serif'],
            },
    },
  },
  plugins: [],
}

