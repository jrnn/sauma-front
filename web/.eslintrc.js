module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "eqeqeq": "error",
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": 0,
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "react/prop-types": 0,
    "semi": [
      "error",
      "never"
    ]
  }
};
