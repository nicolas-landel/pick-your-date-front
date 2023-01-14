module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "no-return-assign": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
