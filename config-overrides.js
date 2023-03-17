const deepExtend = require("deep-extend");

module.exports = function override(config, env) {
	return deepExtend(config, {
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/](@emotion|@mui)[\\/]/,
						name: "vendor",
						chunks: "all"
					}
				}
			}
		}
	});
};
