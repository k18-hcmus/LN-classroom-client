module.export = {
  "extends": [
    "react-app",
    "airbnb-typescript"
  ],
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module"
  },
  "rules": {
    "react/jsx-filename-extension": [
      2,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "linebreak-style": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-confusing-arrow": [
      0
    ]
  }
}