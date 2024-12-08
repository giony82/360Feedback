const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shared',
      mode: 'development',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Modal': './src/components/Modal',
        './formatDate': './src/utils/formatDate',
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      },
    }),
  ],
  // ... other configurations ...
};