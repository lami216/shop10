/** @type {import('tailwindcss').Config} */
export default {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: {
                extend: {
                        colors: {
                                "payzone-navy": "#0f241d",
                                "payzone-white": "#f7f5ef",
                                "payzone-gold": "#c8b48a",
                                "payzone-indigo": "#7aa89f",
                        },
                },
        },
        plugins: [],
};
