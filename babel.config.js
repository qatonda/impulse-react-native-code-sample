module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins:
    process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
};
