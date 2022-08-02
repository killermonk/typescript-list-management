const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: [path.join(__dirname, "/src/index.tsx")],
	watch: true,

	output: {
		// filename: '[name].[chunkhash].js',
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		
		rules: [
			{
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// {
					// 	loader: MiniCssExtractPlugin.loader
					// },
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				],
			  },
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:  path.join(__dirname, "/src/default_index.html"),
		})
	],

	devServer: {
		open: true
	},
	stats: {
		colors: true,
		children: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@models": path.resolve(__dirname, "src/models"),
			"@constants": path.resolve(__dirname, "src/constants"),
			"@enums": path.resolve(__dirname, "src/constants/enums"),
			"@pages": path.resolve(__dirname, "src/pages"),
		}
	}
};