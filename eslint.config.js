import vuePlugin from 'eslint-plugin-vue';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
	{
		files: ['*.ts', '*.tsx', '*.vue'], // Указываем файлы, для которых применяется конфигурация
		languageOptions: {
			parser: vueParser, // Используем vue-eslint-parser для парсинга Vue файлов
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		plugins: {
			vue: vuePlugin, // Плагин для Vue
			'@typescript-eslint': typescriptPlugin, // Плагин для TypeScript
		},
		rules: {
			'vue/no-unused-vars': 'warn', // Предупреждения об неиспользуемых переменных в Vue
			'@typescript-eslint/no-unused-vars': 'warn', // Предупреждения для TypeScript
			'@typescript-eslint/explicit-module-boundary-types': 'off', // Отключение явных типов для функций
			'vue/require-default-prop': 'off', // Отключение требования дефолтных значений для пропов
		},
	},
	{
		files: ['*.js', '*.ts'],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn', // Предупреждения для неиспользуемых переменных в TypeScript
			'@typescript-eslint/explicit-module-boundary-types': 'off', // Отключение явных типов для функций
		},
	},
];
