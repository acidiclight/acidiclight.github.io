/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./node_modules/flowbite/**/*.js",
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [
		require('flowbite/plugin')
	],
}
