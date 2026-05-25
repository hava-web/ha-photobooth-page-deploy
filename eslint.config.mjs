import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '.next/**',
    'build/**',
    'cert/**',
    'config/**',
    'node_modules/**',
    'out/**',
    'scripts/**',
    'src/configs/**',
    'src/react-app-env.d.ts',
    'src/serviceWorker.ts',
    '.env',
    '.env.*',
    'next-env.d.ts',
  ]),
  ...nextCoreWebVitals,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'consistent-return': 'off',
      'no-alert': 'off',
      'no-console': 'warn',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-shadow': 'off',
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      camelcase: 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
        },
      ],
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/jsx-key': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-boolean-value': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-curly-brace-presence': 'off',
      'react/prefer-stateless-function': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/name': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['FormikInput'],
          depth: 3,
        },
      ],
      'jsx-a11y/control-has-associated-label': 'error',
    },
  },
]);
