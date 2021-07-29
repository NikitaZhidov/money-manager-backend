module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		'no-tabs': 'off',
		'class-methods-use-this': 'off',
		'no-underscore-dangle': 'off',
		indent: ['error', 'tab'],
	},
};
