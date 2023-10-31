/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"sans-montserrat": ["Montserrat", "sans-serif"],
			},
			boxShadow: {
				"3xl":
					"0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);",
			},
			backgroundImage: {
				overlay:
					"linear-gradient(180deg, rgba(185,185,185,0.20772058823529416) 10%, rgba(0,112,164,1) 100%);",
				"overlay-side":
					"linear-gradient(360deg, rgba(185,185,185,0.20772058823529416) 5%, rgba(0,112,164,1) 100%);",
			},
		},
	},
	plugins: [],
};
