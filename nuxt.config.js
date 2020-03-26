export default {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || "",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		script: [
			{
				src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
				type: "text/javascript"
			},
			{
				src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
				type: "text/javascript"
			},
			{
				src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
				type: "text/javascript"
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		name: 'chasing-dots',
		color: '#375A7F',
		background: '121212',
		height: '4px'
	},
	/*
	 ** Global CSS
	 */
	css: ["~/assets/css/bootstrap.min.css"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv",
		"nuxt-purgecss",
		"@nuxtjs/toast"
	],
	router: {
		middleware: ["auth"]
	},
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		extractCSS: true,
		postcss: {
			plugins: {}
		},
		purgeCSS: {
			mode: "postcss"
		},

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	},
	toast: {
		position: 'bottom-center',
	}
};
