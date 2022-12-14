module.exports = {
  entry: {
    main: './index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
