import vuetify from 'eslint-config-vuetify'
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  vuetify(),
  prettierConfig,
  {
    plugins: {
      prettier: eslintPluginPrettierRecommended,
    },
    rules: {
      'prettier/prettier': 'warn', // Report Prettier issues as warnings
    },
  },
];
