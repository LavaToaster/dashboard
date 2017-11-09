const path = require('path');

module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
  getRoots() {
    return [path.resolve(__dirname, 'src')];
  }
}