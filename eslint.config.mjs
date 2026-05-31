import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'docs/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['src/**/*.{js,vue}', 'tests/**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        defineProps: 'readonly'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'off'
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-useless-assignment': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]
