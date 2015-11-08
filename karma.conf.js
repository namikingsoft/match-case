module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*Spec.*',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*Spec.*': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    colors: true,
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /.js$/,
            loaders: ['babel'],
            exclude: /(node_modules|bower_components)/,
          },
          {
            test: /\.ts$/,
            loaders: ['babel', 'ts'],
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },
      resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['src', 'node_modules'],
      },
    },
  });
};
