module.exports = {
	experimental: {
		appDir: true
	},
	async redirects() {
		return [
			{
				source: "/today",
				destination: "/today/all",
				permanent: true
			}
		];
	}
};
