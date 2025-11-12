import vuetify from "eslint-config-vuetify";

export default vuetify(
  {},
  {
    rules: {
      "@stylistic/space-before-function-paren": ["error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/arrow-parens": ["error", "always"],
    },
  });
