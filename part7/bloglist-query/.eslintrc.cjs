module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es2021": true,
      "node": true,
      "cypress/globals": true
    },
    "rules": {
      "no-unused-vars": "off"
    },
    "extends": "plugin:react/recommended",
    "overrides": [
      {
        "env": {
          "node": true
        },
        "files": [
          ".eslintrc.js",
          ".eslintrc.cjs"
        ],
        "parserOptions": {
          "sourceType": "script"
        }
      }
    ],
    "parser": "@babel/eslint-parser", // Added parser here
    "parserOptions": {
      "ecmaVersion": 2021
    },
    "plugins": [
      "@stylistic/js",
      "react",
      "jest",
      "cypress"
    ],
    "extends": "eslint:recommended",
    "rules": {
      "@stylistic/js/indent": [
        "error",
        2
      ],
      "@stylistic/js/linebreak-style": [
        "error",
        "unix"
      ],
      "@stylistic/js/quotes": [
        "error",
        "single"
      ],
      "@stylistic/js/semi": [
        "error",
        "never"
      ]
    }
  }
  
  
      