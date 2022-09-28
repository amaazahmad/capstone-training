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
				"green-text-color": "rgba(86, 204, 106, 1)",
			},
			backgroundImage: {
				"form-sidebar": "url(../public/assets/images/form-background.png)",
			},
			boxShadow:{
				"sidebar-box-dark-shadow" : "0px 0px 50px 5px rgba(128, 128, 128, 1)",
				"sidebar-box-light-shadow" : "0px 0px 50px 5px white",
			}
		},
	},
	plugins: [],
}
