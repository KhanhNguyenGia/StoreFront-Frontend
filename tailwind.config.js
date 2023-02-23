/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/containers/**/*.{js,jsx,ts,tsx}',
		'./src/layouts/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	// Only declare variables, but do not apply @base styles
	// Ex: [type='button'] will not be applied
	// https://tailwindcss.com/docs/preflight
	corePlugins: {
		preflight: false,
	},
	// Specificity
	important: '#__next',
	plugins: [require('@tailwindcss/line-clamp')],
};
