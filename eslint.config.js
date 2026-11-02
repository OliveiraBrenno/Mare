export default [{
  files: ['src/**/*.js'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { window: 'readonly', document: 'readonly', IntersectionObserver: 'readonly', requestAnimationFrame: 'readonly', FormData: 'readonly', Intl: 'readonly' } },
  rules: { 'no-unused-vars': 'error', 'no-undef': 'error' }
}];
