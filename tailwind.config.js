/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
	theme: {
		extend: {},
	},
	plugins: [require("tailwindcss-bg-patterns")],
};
