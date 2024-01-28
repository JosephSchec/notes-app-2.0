/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'brand-green': '#6ee7b7',
				'brand-light': '#334155',
				'brand-dark': '#0f172a',
			},
		},
	},
	plugins: [],
};
