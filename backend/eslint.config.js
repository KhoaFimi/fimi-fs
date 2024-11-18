import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest'
			}
		}
	},
	{
		plugins: {
			prettier: prettierPlugin,
			import: importPlugin,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
			'prettier/prettier': [
				'error',
				{
					arrowParens: 'avoid',
					useTabs: true,
					tabWidth: 2,
					printWidth: 80,
					bracketSameLine: false,
					bracketSpacing: true,
					endOfLine: 'lf',
					trailingComma: 'none',
					semi: false,
					singleAttributePerLine: true,
					singleQuote: true,
					quoteProps: 'as-needed',
					proseWrap: 'preserve'
				}
			]
		}
	}
)
