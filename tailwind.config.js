/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			"lexend-deca": "Lexend Deca",
			"dm-serif-display": "DM Serif Display",
		},

		extend: {
			colors: {
				"dark-gray-text-color": "rgba(39, 39, 39, 1)",
				"secondary-text-color": "rgba(165, 165, 165, 1)",
				"bottom-text-color": "rgba(39, 39, 39, 1)", // #272727
				"green-text-color": "rgba(86, 204, 106, 1)",
			},
			backgroundImage: {
				"form-sidebar": "url(../public/assets/images/form-background.png)",
			},
		},
	},
	plugins: [],
}
