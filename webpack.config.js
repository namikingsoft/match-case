module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: '[name].js',
    path: "./",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        loaders: ['babel', 'ts'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['src', 'node_modules'],
  },
};
