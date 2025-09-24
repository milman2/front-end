module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Prettier 통합
    'prettier/prettier': 'error',
    
    // React 관련 규칙
    'react/prop-types': 'off', // 학습용 프로젝트에서는 비활성화
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // 일반적인 코드 품질 규칙
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-undef': 'off', // Jest 전역 변수 허용
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
