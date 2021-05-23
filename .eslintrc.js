module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // TODO turn back on eventually
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // TODO turn back on eventually
    "@typescript-eslint/no-explicit-any": "off",
    // TODO turn back on eventually
    "@typescript-eslint/no-unused-vars": "off",
  }
}
