/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                flickeringOff: {
                    '0%': { opacity: 1 },
                    '10%': { opacity: 0.8 },
                    '20%': { opacity: 1 },
                    '30%': { opacity: 0.7 },
                    '40%': { opacity: 0.3 },
                    '50%': { opacity: 0.5 },
                    '60%': { opacity: 0.2 },
                    '70%': { opacity: 0.4 },
                    '80%': { opacity: 0 },
                    '90%': { opacity: 0.1 },
                    '100%': { opacity: 0 }
                },
                flickeringOn: {
                    '0%': { opacity: 0 },
                    '10%': { opacity: 0.2 },
                    '20%': { opacity: 0 },
                    '30%': { opacity: 0.3 },
                    '40%': { opacity: 0.7 },
                    '50%': { opacity: 0.5 },
                    '60%': { opacity: 0.8 },
                    '70%': { opacity: 0.6 },
                    '80%': { opacity: 1 },
                    '90%': { opacity: 0.9 },
                    '100%': { opacity: 1 }
                },
            },
            animation: {
                'flickering-off': 'flickeringOff 0.5s forwards',
                'flickering-on': 'flickeringOn 0.5s forwards',
            },
        },
    },
    plugins: [],
}