module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          allowUndefined: true
        }
      ],
      [
        "module-resolver",
        {
          "root": ["./src"],
          extensions: ['.js', '.ts', '.tsx', '.jsx', '.ios.js', '.android.js', '.json'],
          alias: {
            "@assets": "./assets",
            "@src": "./src",
          },
        },
      ],
    ],
  };
};
